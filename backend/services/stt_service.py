"""
THAMILI Audio Generator - Speech to Text (STT) Service
Handles incoming microphone audio validation and transcription via Groq Whisper API.
"""

import io
import logging
from typing import Optional, Tuple
import httpx
from groq import AsyncGroq, GroqError, AuthenticationError, RateLimitError, BadRequestError

from config import (
    get_groq_api_key,
    get_openai_api_key,
    STT_PROVIDER,
    SUPPORTED_LANGUAGES,
    SUPPORTED_AUDIO_TYPES
)

logger = logging.getLogger("thamili.stt")

class STTService:
    def __init__(self):
        self.provider = STT_PROVIDER.lower()
        logger.info(f"STT Service initialized with default provider: {self.provider}")

    def validate_audio(self, content_type: Optional[str], filename: Optional[str], file_bytes: bytes) -> Tuple[bool, str]:
        """
        Validates audio content type, file extension, and non-empty byte payload.
        """
        if not file_bytes or len(file_bytes) == 0:
            return False, "Audio data is empty. Please record audio before sending."

        # Check content type if present
        clean_type = (content_type or "").split(";")[0].strip().lower()
        valid_type = clean_type in [t.split(";")[0] for t in SUPPORTED_AUDIO_TYPES]

        # Check file extension
        ext = ""
        if filename and "." in filename:
            ext = filename.rsplit(".", 1)[-1].lower()
        valid_ext = ext in ["webm", "wav", "mp3", "ogg", "m4a", "flac", "aac"]

        if not valid_type and not valid_ext:
            return False, f"Unsupported audio format: '{content_type or ext}'. Supported: webm, wav, mp3, ogg, m4a."

        return True, ""

    async def transcribe(self, audio_bytes: bytes, filename: str, content_type: str, language: str) -> str:
        """
        Transcribes audio bytes into text using Groq Whisper.
        Respects target language code when supported.
        """
        logger.info(f"STT processing started. Audio size: {len(audio_bytes)} bytes, language: {language}")

        # 1. Validate audio payload
        is_valid, err_msg = self.validate_audio(content_type, filename, audio_bytes)
        if not is_valid:
            logger.error(f"STT Audio Validation Failed: {err_msg}")
            raise ValueError(err_msg)

        # 2. Lookup language ISO-639-1 code (e.g. 'ta', 'en', 'hi', etc.)
        iso_lang = None
        clean_lang = (language or "").lower().strip()
        if clean_lang and clean_lang not in ["auto", "none", "detect", "all"]:
            lang_info = SUPPORTED_LANGUAGES.get(clean_lang, SUPPORTED_LANGUAGES.get("tamil"))
            if lang_info and "bcp47" in lang_info:
                iso_lang = lang_info["bcp47"].split("-")[0]
            elif len(clean_lang) == 2:
                iso_lang = clean_lang

        # 3. Resolve API Key
        active_provider = self.provider
        api_key = get_groq_api_key() if active_provider == "groq" else get_openai_api_key()

        if not api_key:
            logger.error("No STT API key configured. GROQ_API_KEY is empty or missing in backend/.env")
            raise ValueError(
                "GROQ_API_KEY is missing or empty in backend/.env. "
                "Please open backend/.env and save your GROQ_API_KEY."
            )

        # 4. Transcribe using active provider
        if active_provider == "groq":
            return await self._transcribe_groq(audio_bytes, filename, content_type, iso_lang, api_key)
        elif active_provider == "openai":
            return await self._transcribe_openai(audio_bytes, filename, content_type, iso_lang, api_key)
        else:
            # Default to Groq if unrecognized
            return await self._transcribe_groq(audio_bytes, filename, content_type, iso_lang, api_key)

    async def _transcribe_groq(self, audio_bytes: bytes, filename: str, content_type: str, iso_lang: Optional[str], api_key: str) -> str:
        """
        Transcribe via Groq Whisper API (whisper-large-v3 with whisper-large-v3-turbo fallback)
        """
        logger.info(f"Executing Groq Whisper transcription (language={iso_lang})...")
        safe_filename = filename if filename and "." in filename else "recording.webm"
        safe_mime = content_type or "audio/webm"

        client = AsyncGroq(api_key=api_key)

        for model_name in ["whisper-large-v3", "whisper-large-v3-turbo"]:
            try:
                transcription = await client.audio.transcriptions.create(
                    file=(safe_filename, audio_bytes, safe_mime),
                    model=model_name,
                    language=iso_lang,
                    response_format="json",
                    temperature=0.0
                )
                raw_text = getattr(transcription, "text", "") or ""
                transcript = raw_text.strip()
                if transcript:
                    logger.info(f"STT processing completed via Groq ({model_name}). Transcript: '{transcript[:60]}...'")
                    return transcript
                else:
                    logger.warning(f"Groq Whisper returned empty transcription with model {model_name}.")
            except AuthenticationError as auth_err:
                logger.error(f"Groq Authentication Error: {auth_err}")
                raise ValueError("Invalid GROQ_API_KEY. Please verify the API key in backend/.env.")
            except RateLimitError as rate_err:
                logger.warning(f"Groq Rate Limit on {model_name}: {rate_err}. Retrying next model...")
                continue
            except BadRequestError as bad_req:
                logger.error(f"Groq Bad Request Error: {bad_req}")
                raise ValueError(f"Groq could not process the audio file: {bad_req.message}")
            except GroqError as groq_err:
                logger.warning(f"Groq error with {model_name}: {groq_err}. Trying fallback...")
                continue
            except Exception as exc:
                logger.error(f"Unexpected error during Groq STT with {model_name}: {exc}")
                continue

        # If AsyncGroq had network or library issues, try direct HTTP fallback as safety net
        return await self._transcribe_groq_http_fallback(audio_bytes, safe_filename, safe_mime, iso_lang, api_key)

    async def _transcribe_groq_http_fallback(self, audio_bytes: bytes, safe_filename: str, safe_mime: str, iso_lang: Optional[str], api_key: str) -> str:
        """
        Direct HTTP fallback using httpx in case SDK client encounters connection errors.
        """
        logger.info("Executing Groq Whisper HTTP fallback...")
        url = "https://api.groq.com/openai/v1/audio/transcriptions"
        headers = {"Authorization": f"Bearer {api_key}"}
        files = {"file": (safe_filename, io.BytesIO(audio_bytes), safe_mime)}
        data = {"model": "whisper-large-v3"}
        if iso_lang:
            data["language"] = iso_lang

        async with httpx.AsyncClient(timeout=35.0) as client:
            try:
                response = await client.post(url, headers=headers, files=files, data=data)
                if response.status_code == 401:
                    raise ValueError("Invalid GROQ_API_KEY. Please check your backend/.env configuration.")
                if response.status_code != 200:
                    raise RuntimeError(f"Groq STT failed with status {response.status_code}: {response.text}")

                result = response.json()
                transcript = result.get("text", "").strip()
                if not transcript:
                    raise ValueError("No speech could be recognized from the recorded audio. Please speak clearly into your microphone.")
                return transcript
            except httpx.RequestError as exc:
                logger.error(f"Network error communicating with Groq STT: {exc}")
                raise RuntimeError("Network error communicating with speech recognition provider.")

    async def _transcribe_openai(self, audio_bytes: bytes, filename: str, content_type: str, iso_lang: Optional[str], api_key: str) -> str:
        """
        Transcribe via OpenAI Whisper API (whisper-1)
        """
        logger.info("Executing OpenAI Whisper transcription...")
        safe_filename = filename if filename and "." in filename else "recording.webm"
        safe_mime = content_type or "audio/webm"

        url = "https://api.openai.com/v1/audio/transcriptions"
        headers = {"Authorization": f"Bearer {api_key}"}
        files = {"file": (safe_filename, io.BytesIO(audio_bytes), safe_mime)}
        data = {"model": "whisper-1"}
        if iso_lang:
            data["language"] = iso_lang

        async with httpx.AsyncClient(timeout=30.0) as client:
            try:
                response = await client.post(url, headers=headers, files=files, data=data)
                if response.status_code != 200:
                    logger.error(f"OpenAI STT error {response.status_code}: {response.text}")
                    raise RuntimeError(f"OpenAI STT failed ({response.status_code}): {response.text}")

                result = response.json()
                transcript = result.get("text", "").strip()
                return transcript
            except httpx.RequestError as exc:
                logger.error(f"Network error communicating with OpenAI STT: {exc}")
                raise RuntimeError("Network error communicating with speech recognition provider.")

# Singleton instance
stt_service = STTService()
