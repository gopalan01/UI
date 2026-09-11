"""
THAMILI Audio Generator - Large Language Model (LLM) Service
Handles AI conversational reasoning, language enforcement, dialect/slang adaptation,
and tone/speed-based prompt construction via Groq Llama models.
"""

import logging
from typing import Dict, Any, Optional
import httpx
from groq import AsyncGroq, GroqError, AuthenticationError, RateLimitError, BadRequestError

from config import (
    get_groq_api_key,
    get_openai_api_key,
    get_gemini_api_key,
    LLM_PROVIDER,
    GROQ_PRIMARY_LLM_MODEL,
    GROQ_FALLBACK_LLM_MODEL,
    SUPPORTED_LANGUAGES,
    TONE_INSTRUCTIONS
)

logger = logging.getLogger("thamili.llm")

# Regional dialect styling hints to inject into LLM system prompt
SLANG_PROMPT_GUIDELINES = {
    # Tamil dialects
    "kongu_tamil": "Use warm, respectful Kongu Tamil style with '-nga', '-nna' suffixes (e.g., 'சொல்லுங்கண்ணா', 'சரிங்கண்ணா', 'நல்லா இருக்கீங்களாண்ணா').",
    "chennai_tamil": "Use lively Madras / Chennai Tamil slang with natural urban colloquialisms like 'பா', 'கெத்து', 'செம்ம', 'சொல்லு பாப்போம்'.",
    "madurai_tamil": "Use bold, warm, hospitable Madurai dialect with traditional southern inflections like 'யா', 'லே', 'கம்பீரம்'.",
    "nellai_tamil": "Use affectionate Tirunelveli style with 'ஏலே', 'அடடே', 'அல்வா', 'பா'.",
    "standard_tamil": "Use clear, polite, standard grammatical Tamil (பொதுத் தமிழ்).",

    # English dialects
    "american_standard": "Use clear, friendly, standard American English with concise conversational phrasing.",
    "british_rp": "Use polite, polished British English vocabulary with graceful etiquette.",
    "indian_english": "Use warm, expressive, polite Indian English phrasing.",

    # Hindi dialects
    "delhi_hindi": "Use energetic, casual Delhi Hindi style with colloquial warmth ('अरे भाई', 'बढ़िया', 'बताओ').",
    "mumbai_hindi": "Use Mumbai Hindi style with vibrant conversational touches ('बिंदास', 'एकदम फर्स्ट क्लास').",
    "standard_hindi": "Use respectful, standard Hindi (शुद्ध हिन्दी) with polite 'आप' phrasing.",

    # Telugu dialects
    "telangana_telugu": "Use friendly Telangana Telugu dialect style ('ఏంది భయ్యా', 'బాగున్నారా').",
    "andhra_telugu": "Use coastal Andhra Telugu style ('చెప్పండి బాబు', 'బాగున్నారా').",
    "standard_telugu": "Use polite, standard grammatical Telugu.",

    # Malayalam dialects
    "valluvanadan_malayalam": "Use gentle, sweet Valluvanadan Malayalam phrasing.",
    "kozhikode_malayalam": "Use warm Malabar / Kozhikode hospitality style ('എന്തൊക്കെയുണ്ട് വിശേഷം').",
    "standard_malayalam": "Use polite standard Malayalam.",

    # Kannada dialects
    "bengaluru_kannada": "Use lively Bengaluru Kannada conversational style ('హౌదా గురు', 'చెన్నాగಿದ್ದೀರಾ').",
    "standard_kannada": "Use respectful, standard literary Kannada.",

    # Other languages
    "standard_bengali": "Use graceful, polite standard Bengali ('কেমন আছেন', 'বলুন').",
    "standard_marathi": "Use warm, respectful standard Marathi ('कसे आहात', 'सांगा').",
    "standard_gujarati": "Use friendly, entrepreneurial Gujarati style ('કેમ છો', 'મજામાં').",
    "standard_spanish": "Use friendly, natural conversational Spanish.",
    "parisian_french": "Use natural, polite conversational French.",
    "german_standard": "Use articulate, polite conversational German.",
    "standard_german": "Use articulate, polite conversational German.",
    "standard_japanese": "Use polite conversational Japanese (Desu/Masu form).",
    "standard_arabic": "Use clear Modern Standard Arabic with polite conversational phrasing."
}

class LLMService:
    def __init__(self):
        self.provider = LLM_PROVIDER.lower()
        logger.info(f"LLM Service initialized with default provider: {self.provider}")

    def build_system_prompt(
        self,
        language: str,
        country: str,
        slang: str,
        voice_type: str = "female",
        tone: str = "default",
        speech_speed: str = "normal"
    ) -> str:
        """
        Builds strict instructions for language adherence, dialect styling,
        persona gender, tone, and speech pacing.
        """
        lang_info = SUPPORTED_LANGUAGES.get(language.lower(), SUPPORTED_LANGUAGES["tamil"])
        lang_name = lang_info["name"]
        native_lang = lang_info["native_name"]

        tone_guidance = TONE_INSTRUCTIONS.get(tone.lower(), TONE_INSTRUCTIONS["default"])
        slang_guidance = SLANG_PROMPT_GUIDELINES.get(
            slang.lower(),
            f"Adapt your vocabulary and phrasing to reflect the {slang.replace('_', ' ')} dialect naturally."
        )

        # Persona gender guidance
        gender_guidance = "Use natural, polite conversational gender forms."
        if voice_type.lower() == "male":
            gender_guidance = "Adopt a dignified, natural male conversational persona with appropriate first-person grammatical gender forms when applicable in this language."
        elif voice_type.lower() == "female":
            gender_guidance = "Adopt an expressive, warm female conversational persona with appropriate first-person grammatical gender forms when applicable in this language."

        # Speech speed guidance
        speed_guidance = "Keep sentences balanced and rhythmic."
        if speech_speed.lower() == "slow":
            speed_guidance = "Use calm, unhurried, measured sentences that are easy to absorb when spoken slowly."
        elif speech_speed.lower() == "fast":
            speed_guidance = "Use crisp, compact, snappy sentences suitable for quick spoken delivery."

        system_prompt = f"""You are THAMILI AI, an intelligent, empathetic voice AI assistant.

CRITICAL LANGUAGE REQUIREMENT:
- The user has selected the language: {lang_name} ({native_lang}).
- You MUST generate your entire response ONLY in {lang_name}, written in its native script ({native_lang}).
- Do NOT reply in English unless the selected language is English.
- Even if the user asks a question in another language or with mixed script, ALWAYS reply in {lang_name}.

REGIONAL & DIALECT STYLING:
- Region / Country: {country.replace('_', ' ').title()}
- Dialect / Slang: {slang.replace('_', ' ').title()}
- Dialect Styling Instructions: {slang_guidance}
(Note: Slang influences your choice of vocabulary and conversational phrasing).

VOICE PERSONA & TONE:
- Voice Persona: {voice_type.capitalize()} ({gender_guidance})
- Desired Tone: {tone.capitalize()}
- Tone Instruction: {tone_guidance}
- Speech Pacing: {speed_guidance}

SPEECH-OPTIMIZED FORMATTING:
- Your output will be spoken aloud by a Text-to-Speech engine.
- Keep responses concise (1 to 3 natural spoken sentences), clear, and engaging.
- Do NOT use markdown symbols like asterisks (**bold**), hashtags (#), bullet points, or emojis, as they sound awkward when read aloud by voice engines.
- Write natural conversational sentences with proper punctuation for natural pauses."""

        return system_prompt

    async def generate_response(
        self,
        user_text: str,
        language: str,
        country: str,
        slang: str,
        voice_type: str = "female",
        tone: str = "default",
        speech_speed: str = "normal"
    ) -> str:
        """
        Generates AI response using Groq LLM (llama-3.3-70b-versatile with llama-3.1-8b fallback).
        """
        logger.info(
            f"LLM processing started. Query: '{user_text[:50]}...', Language: {language}, "
            f"Slang: {slang}, Voice: {voice_type}, Tone: {tone}, Speed: {speech_speed}"
        )

        system_prompt = self.build_system_prompt(
            language=language,
            country=country,
            slang=slang,
            voice_type=voice_type,
            tone=tone,
            speech_speed=speech_speed
        )

        active_provider = self.provider
        api_key = get_groq_api_key() if active_provider == "groq" else (get_openai_api_key() or get_gemini_api_key())

        # If no key configured, raise clear error
        if not api_key:
            logger.error("No LLM API key configured. GROQ_API_KEY is empty or missing in backend/.env")
            raise ValueError(
                "GROQ_API_KEY is missing or empty in backend/.env. "
                "Please add your Groq API key in backend/.env and save the file."
            )

        if active_provider == "groq":
            return await self._generate_groq(user_text, system_prompt, api_key)
        elif active_provider == "openai":
            return await self._generate_openai(user_text, system_prompt, api_key)
        elif active_provider == "gemini":
            return await self._generate_gemini(user_text, system_prompt, api_key)
        else:
            return await self._generate_groq(user_text, system_prompt, api_key)

    async def _generate_groq(self, user_text: str, system_prompt: str, api_key: str) -> str:
        """
        Query Groq LLM API using AsyncGroq (openai/gpt-oss-20b with openai/gpt-oss-120b fallback)
        """
        client = AsyncGroq(api_key=api_key)

        models_to_try = [
            GROQ_PRIMARY_LLM_MODEL,  # "openai/gpt-oss-20b"
            GROQ_FALLBACK_LLM_MODEL   # "openai/gpt-oss-120b"
        ]

        for model_name in models_to_try:
            try:
                logger.info(f"Generating Groq LLM response using model '{model_name}'...")
                completion = await client.chat.completions.create(
                    model=model_name,
                    messages=[
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": user_text}
                    ],
                    temperature=0.7,
                    max_tokens=600
                )
                if completion.choices and len(completion.choices) > 0:
                    ai_text = completion.choices[0].message.content or ""
                    ai_text = ai_text.strip()
                    if ai_text:
                        logger.info(f"LLM response successfully generated with {model_name} (Length: {len(ai_text)})")
                        return ai_text
            except AuthenticationError as auth_err:
                logger.error(f"Groq Authentication Error: {auth_err}")
                raise ValueError("Invalid GROQ_API_KEY. Please verify your API key in backend/.env.")
            except RateLimitError as rate_err:
                logger.warning(f"Groq Rate Limit on {model_name}: {rate_err}. Retrying with next model...")
                continue
            except BadRequestError as bad_req:
                logger.error(f"Groq Bad Request Error: {bad_req}")
                raise ValueError(f"Groq LLM error: {bad_req.message}")
            except GroqError as groq_err:
                logger.warning(f"Groq error with {model_name}: {groq_err}. Trying fallback...")
                continue
            except Exception as exc:
                logger.error(f"Unexpected error calling Groq LLM with {model_name}: {exc}")
                continue

        # Fallback to direct HTTP post if SDK client encounters network issue
        return await self._generate_groq_http_fallback(user_text, system_prompt, api_key)

    async def _generate_groq_http_fallback(self, user_text: str, system_prompt: str, api_key: str) -> str:
        """
        Direct HTTP post to Groq API endpoint via httpx as network fallback.
        """
        logger.info("Executing Groq LLM direct HTTP fallback...")
        url = "https://api.groq.com/openai/v1/chat/completions"
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
        payload = {
            "model": GROQ_PRIMARY_LLM_MODEL,
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_text}
            ],
            "temperature": 0.7,
            "max_tokens": 600
        }

        async with httpx.AsyncClient(timeout=30.0) as client:
            try:
                response = await client.post(url, headers=headers, json=payload)
                if response.status_code == 401:
                    raise ValueError("Invalid GROQ_API_KEY. Please verify your backend/.env configuration.")
                if response.status_code != 200:
                    raise RuntimeError(f"Groq LLM failed with status {response.status_code}: {response.text}")

                data = response.json()
                ai_text = data["choices"][0]["message"]["content"].strip()
                return ai_text
            except httpx.RequestError as exc:
                logger.error(f"Network error communicating with Groq LLM: {exc}")
                raise RuntimeError("Network error communicating with AI language model.")

    async def _generate_openai(self, user_text: str, system_prompt: str, api_key: str) -> str:
        """
        Query OpenAI Chat API (gpt-4o-mini)
        """
        url = "https://api.openai.com/v1/chat/completions"
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
        payload = {
            "model": "gpt-4o-mini",
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_text}
            ],
            "temperature": 0.7,
            "max_tokens": 250
        }

        async with httpx.AsyncClient(timeout=25.0) as client:
            try:
                response = await client.post(url, headers=headers, json=payload)
                if response.status_code != 200:
                    logger.error(f"OpenAI LLM error {response.status_code}: {response.text}")
                    raise RuntimeError(f"OpenAI LLM failed ({response.status_code}): {response.text}")

                data = response.json()
                ai_text = data["choices"][0]["message"]["content"].strip()
                return ai_text
            except httpx.RequestError as exc:
                logger.error(f"Network error communicating with OpenAI LLM: {exc}")
                raise RuntimeError("Network error communicating with AI language model.")

    async def _generate_gemini(self, user_text: str, system_prompt: str, api_key: str) -> str:
        """
        Query Google Gemini API (gemini-2.0-flash)
        """
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={api_key}"
        headers = {"Content-Type": "application/json"}
        payload = {
            "contents": [
                {
                    "parts": [
                        {"text": f"{system_prompt}\n\nUser Question: {user_text}"}
                    ]
                }
            ],
            "generationConfig": {
                "temperature": 0.7,
                "maxOutputTokens": 250
            }
        }

        async with httpx.AsyncClient(timeout=25.0) as client:
            try:
                response = await client.post(url, headers=headers, json=payload)
                if response.status_code != 200:
                    logger.error(f"Gemini LLM error {response.status_code}: {response.text}")
                    raise RuntimeError(f"Gemini LLM failed ({response.status_code}): {response.text}")

                data = response.json()
                ai_text = data["candidates"][0]["content"]["parts"][0]["text"].strip()
                return ai_text
            except httpx.RequestError as exc:
                logger.error(f"Network error communicating with Gemini LLM: {exc}")
                raise RuntimeError("Network error communicating with AI language model.")

# Singleton instance
llm_service = LLMService()
