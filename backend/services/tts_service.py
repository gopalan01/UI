"""
THAMILI Audio Generator - Text to Speech (TTS) Service
Synthesizes speech audio adhering strictly to language, voice type (Male / Female / Own Voice),
tone pitch adjustments, and speed rates.
Supports Microsoft Edge Neural Voices, Google Neural/gTTS fallback, and OpenAI TTS.
"""

import base64
import io
import logging
from typing import Dict, Any, Tuple, Optional
import httpx
import edge_tts
from gtts import gTTS

from config import (
    TTS_API_KEY,
    OPENAI_API_KEY,
    TTS_PROVIDER,
    SUPPORTED_LANGUAGES,
    SPEED_RATE_MAPPING,
    SPEED_FLOAT_MAPPING,
    TONE_PITCH_MAPPING
)

logger = logging.getLogger("thamili.tts")

class TTSService:
    def __init__(self):
        self.provider = TTS_PROVIDER.lower()
        logger.info(f"TTS Service initialized with default provider: {self.provider}")

    def resolve_voice(self, language: str, voice_type: str) -> Tuple[str, Optional[str]]:
        """
        Resolves the best compatible voice for language and voice_type (male/female/user).
        Returns (voice_id, error_message).
        """
        lang_key = language.lower().strip()
        lang_info = SUPPORTED_LANGUAGES.get(lang_key)
        if not lang_info:
            return "", f"Language '{language}' is not supported by TTS service."

        v_type = voice_type.lower().strip()

        # Handle Own Voice (User Clone)
        if v_type == "user":
            # Strict safety & modular rule: Own voice requires approved cloning workflow
            return "", "Own Voice cloning requires an approved voice profile, authorized sample, and specialized cloning provider."

        # Handle Male / Female
        if v_type not in ["male", "female"]:
            v_type = "female"  # default to female if invalid

        edge_voice = lang_info["edge_voices"].get(v_type)
        if not edge_voice:
            return "", f"Voice type '{v_type}' is not currently available for {lang_info['name']}."

        return edge_voice, None

    async def synthesize(
        self,
        text: str,
        language: str,
        voice_type: str = "female",
        tone: str = "default",
        speech_speed: str = "normal"
    ) -> Dict[str, Any]:
        """
        Converts text to speech audio.
        Returns dictionary with audio_base64, audio_format, voice_id, etc.
        """
        logger.info(
            f"TTS processing started. Text length: {len(text)}, Language: {language}, "
            f"Voice Type: {voice_type}, Tone: {tone}, Speed: {speech_speed}"
        )

        if not text or not text.strip():
            raise ValueError("TTS Error: Empty text provided for synthesis.")

        # Check Own Voice special handling
        if voice_type.lower() == "user":
            logger.warning("Own Voice cloning requested without authorized cloning pipeline.")
            raise ValueError(
                "Personal Voice Cloning is not yet configured on this backend instance. "
                "It requires user voice enrollment, explicit authorization, and an approved neural cloning provider."
            )

        # Resolve voice
        resolved_voice, err_msg = self.resolve_voice(language, voice_type)
        if err_msg:
            logger.error(f"TTS Voice Resolution Error: {err_msg}")
            raise ValueError(err_msg)

        # Calculate speed rate
        rate_str = SPEED_RATE_MAPPING.get(speech_speed.lower(), "+0%")
        pitch_str = TONE_PITCH_MAPPING.get(tone.lower(), "+0Hz")

        # Choose provider
        active_provider = self.provider

        if active_provider == "openai" and (TTS_API_KEY or OPENAI_API_KEY):
            api_key = TTS_API_KEY or OPENAI_API_KEY
            return await self._synthesize_openai(text, language, voice_type, speech_speed, api_key)
        else:
            # Try Edge-TTS first, with seamless high-reliability fallback to gTTS
            try:
                return await self._synthesize_edge_tts(text, resolved_voice, rate_str, pitch_str)
            except Exception as edge_err:
                logger.warning(f"Edge-TTS notice: {edge_err}. Seamlessly falling back to Google TTS engine...")
                return self._synthesize_gtts(text, language, voice_type, speech_speed)

    async def _synthesize_edge_tts(
        self,
        text: str,
        voice_name: str,
        rate_str: str,
        pitch_str: str
    ) -> Dict[str, Any]:
        """
        Synthesize audio using Edge-TTS (Microsoft Neural Voices)
        """
        logger.info(f"Synthesizing with Edge-TTS voice: {voice_name} (Rate: {rate_str}, Pitch: {pitch_str})")
        communicate = edge_tts.Communicate(
            text=text,
            voice=voice_name,
            rate=rate_str,
            pitch=pitch_str
        )

        audio_data = bytearray()
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                audio_data.extend(chunk["data"])

        if len(audio_data) == 0:
            raise RuntimeError("Edge-TTS generated empty audio stream.")

        # Encode as base64 data URI
        base64_audio = base64.b64encode(audio_data).decode("utf-8")
        data_uri = f"data:audio/mp3;base64,{base64_audio}"

        logger.info(f"TTS processing completed successfully via Edge-TTS. Audio size: {len(audio_data)} bytes.")
        return {
            "audio_base64": data_uri,
            "audio_format": "audio/mp3",
            "voice_used": voice_name,
            "size_bytes": len(audio_data),
            "provider": "edge-tts"
        }

    def _synthesize_gtts(
        self,
        text: str,
        language: str,
        voice_type: str,
        speech_speed: str
    ) -> Dict[str, Any]:
        """
        High-reliability fallback TTS using Google TTS engine (gTTS).
        Works natively for all 14 languages without API key.
        """
        lang_info = SUPPORTED_LANGUAGES.get(language.lower(), SUPPORTED_LANGUAGES["tamil"])
        iso_lang = lang_info["bcp47"].split("-")[0]  # 'ta', 'hi', 'en', etc.

        slow = (speech_speed.lower() == "slow")

        buffer = io.BytesIO()
        tts = gTTS(text=text, lang=iso_lang, slow=slow)
        tts.write_to_fp(buffer)
        audio_bytes = buffer.getvalue()

        base64_audio = base64.b64encode(audio_bytes).decode("utf-8")
        data_uri = f"data:audio/mp3;base64,{base64_audio}"

        logger.info(f"TTS processing completed successfully via gTTS fallback ({len(audio_bytes)} bytes).")
        return {
            "audio_base64": data_uri,
            "audio_format": "audio/mp3",
            "voice_used": f"{iso_lang}-{voice_type}",
            "size_bytes": len(audio_bytes),
            "provider": "gtts"
        }

    async def _synthesize_openai(
        self,
        text: str,
        language: str,
        voice_type: str,
        speech_speed: str,
        api_key: str
    ) -> Dict[str, Any]:
        """
        Synthesize audio using OpenAI TTS API
        """
        lang_info = SUPPORTED_LANGUAGES.get(language.lower(), SUPPORTED_LANGUAGES["tamil"])
        openai_voice = lang_info["openai_voices"].get(voice_type.lower(), "nova")
        speed_float = SPEED_FLOAT_MAPPING.get(speech_speed.lower(), 1.0)

        url = "https://api.openai.com/v1/audio/speech"
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
        payload = {
            "model": "tts-1",
            "input": text,
            "voice": openai_voice,
            "speed": speed_float,
            "response_format": "mp3"
        }

        async with httpx.AsyncClient(timeout=30.0) as client:
            try:
                response = await client.post(url, headers=headers, json=payload)
                if response.status_code != 200:
                    logger.error(f"OpenAI TTS error {response.status_code}: {response.text}")
                    raise RuntimeError(f"OpenAI TTS failed: {response.text}")

                audio_bytes = response.content
                base64_audio = base64.b64encode(audio_bytes).decode("utf-8")
                data_uri = f"data:audio/mp3;base64,{base64_audio}"

                logger.info(f"TTS processing completed successfully via OpenAI ({len(audio_bytes)} bytes).")
                return {
                    "audio_base64": data_uri,
                    "audio_format": "audio/mp3",
                    "voice_used": openai_voice,
                    "size_bytes": len(audio_bytes),
                    "provider": "openai"
                }
            except httpx.RequestError as exc:
                logger.error(f"Network error communicating with OpenAI TTS: {exc}")
                raise RuntimeError("Network error communicating with text-to-speech provider.")

# Singleton instance
tts_service = TTSService()
