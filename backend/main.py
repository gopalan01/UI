"""
THAMILI Audio Generator - FastAPI Backend Server
Provides RESTful APIs for Voice Conversation, STT (Groq Whisper), LLM (Groq LLM),
and TTS (Edge-TTS) orchestration.
"""

import logging
import sys
import time
from typing import Optional
from fastapi import FastAPI, File, Form, UploadFile, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from config import (
    HOST,
    PORT,
    CORS_ORIGINS,
    CORS_ORIGIN_REGEX,
    SUPPORTED_LANGUAGES,
    STT_PROVIDER,
    LLM_PROVIDER,
    TTS_PROVIDER,
    get_groq_api_key,
    get_openai_api_key,
    get_gemini_api_key
)
from services.stt_service import stt_service
from services.llm_service import llm_service
from services.tts_service import tts_service

# ==============================================================================
# STRUCTURED LOGGING SETUP
# Clean, readable, and strictly redacts any secrets or credentials
# ==============================================================================
# Ensure UTF-8 output on Windows consoles for multilingual logging
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] [%(name)s]: %(message)s",
    handlers=[
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger("thamili.backend")

# Initialize FastAPI App
app = FastAPI(
    title="THAMILI Audio Generator API",
    description="Multilingual voice AI backend integrating Groq STT, Groq LLM dialect reasoning, and Edge-TTS.",
    version="1.0.0"
)

# Configure CORS Middleware for React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_origin_regex=CORS_ORIGIN_REGEX,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logger.info("==================================================")
logger.info("THAMILI Audio Generator Backend Initialized")
logger.info(f"Configured Providers -> STT: {STT_PROVIDER}, LLM: {LLM_PROVIDER}, TTS: {TTS_PROVIDER}")
logger.info(f"Allowed CORS Origins: {CORS_ORIGINS}")
logger.info(f"Allowed CORS Regex: {CORS_ORIGIN_REGEX}")
logger.info("==================================================")

# ==============================================================================
# GLOBAL EXCEPTION HANDLERS
# ==============================================================================
@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    logger.error(f"HTTP Error {exc.status_code}: {exc.detail}")
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "status": "error",
            "error_code": exc.status_code,
            "message": exc.detail
        }
    )

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled Server Exception: {str(exc)}", exc_info=True)
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "status": "error",
            "error_code": 500,
            "message": f"Backend processing error: {str(exc)}"
        }
    )

# ==============================================================================
# ENDPOINT: GET /health
# ==============================================================================
@app.get("/health", tags=["System"])
async def health_check():
    """
    Health check endpoint returning backend status and provider readiness.
    Safely verifies whether GROQ_API_KEY is configured without exposing it.
    """
    has_groq = bool(get_groq_api_key())
    has_openai = bool(get_openai_api_key())
    has_gemini = bool(get_gemini_api_key())

    stt_ready = has_groq if STT_PROVIDER == "groq" else has_openai
    llm_ready = has_groq if LLM_PROVIDER == "groq" else (has_openai or has_gemini)

    return {
        "status": "healthy",
        "service": "THAMILI Audio Generator API",
        "version": "1.0.0",
        "timestamp": time.time(),
        "providers": {
            "stt": {
                "active_provider": STT_PROVIDER,
                "ready": stt_ready,
                "api_key_configured": has_groq if STT_PROVIDER == "groq" else has_openai
            },
            "llm": {
                "active_provider": LLM_PROVIDER,
                "ready": llm_ready,
                "api_key_configured": has_groq if LLM_PROVIDER == "groq" else (has_openai or has_gemini)
            },
            "tts": {
                "active_provider": TTS_PROVIDER,
                "ready": True,  # Edge-TTS is immediately operational without API key
                "api_key_configured": True
            }
        },
        "supported_languages": list(SUPPORTED_LANGUAGES.keys())
    }

# ==============================================================================
# ENDPOINT: POST /conversation
# Complete Audio -> STT -> LLM -> TTS pipeline
# ==============================================================================
@app.post("/conversation", tags=["Voice Conversation"])
async def handle_conversation(
    audio: UploadFile = File(..., description="User recorded audio file from frontend microphone"),
    language: str = Form("tamil", description="Selected language (e.g., tamil, english, hindi)"),
    country: str = Form("tamil_nadu", description="Selected country or region"),
    slang: str = Form("kongu_tamil", description="Selected regional slang or dialect"),
    voice_type: str = Form("female", description="Voice selection: 'male', 'female', or 'user'"),
    tone: str = Form("default", description="Voice tone / emotion"),
    speech_speed: str = Form("normal", description="Speech speed: 'slow', 'normal', or 'fast'")
):
    """
    Orchestrates complete voice conversation:
    1. Audio validation
    2. Groq Speech-to-Text (STT) -> Recognized User Text
    3. Groq Large Language Model (LLM) -> Contextual AI Response Text
    4. Edge-TTS Text-to-Speech (TTS) -> Synthesized Voice Audio
    """
    request_start = time.time()
    logger.info(f"Request on /conversation: Language='{language}', Slang='{slang}', Voice='{voice_type}', Tone='{tone}', Speed='{speech_speed}'")

    # 1. Validate Language
    clean_lang = language.lower().strip()
    if clean_lang not in SUPPORTED_LANGUAGES:
        logger.warning(f"Unsupported language requested: '{language}'")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Language '{language}' is not supported. Supported languages: {', '.join(SUPPORTED_LANGUAGES.keys())}"
        )

    # 2. Validate Audio file existence and read content
    if not audio:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Missing audio payload. Please provide a recorded audio file."
        )

    try:
        audio_bytes = await audio.read()
    except Exception as exc:
        logger.error(f"Failed to read audio upload: {exc}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Could not read uploaded audio file."
        )

    if len(audio_bytes) == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Uploaded audio file is empty (0 bytes). Please record your voice before sending."
        )

    # 3. Speech-to-Text (STT) Service via Groq Whisper
    try:
        user_transcript = await stt_service.transcribe(
            audio_bytes=audio_bytes,
            filename=audio.filename or "recording.webm",
            content_type=audio.content_type or "audio/webm",
            language=clean_lang
        )
    except ValueError as val_err:
        logger.warning(f"STT Validation/Config Notice: {val_err}")
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(val_err))
    except Exception as exc:
        logger.error(f"STT Stage Failure: {exc}")
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Speech recognition service error: {str(exc)}"
        )

    # 4. Large Language Model (LLM) Service via Groq Llama
    try:
        ai_response_text = await llm_service.generate_response(
            user_text=user_transcript,
            language=clean_lang,
            country=country,
            slang=slang,
            voice_type=voice_type,
            tone=tone,
            speech_speed=speech_speed
        )
    except ValueError as val_err:
        logger.warning(f"LLM Config Notice: {val_err}")
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(val_err))
    except Exception as exc:
        logger.error(f"LLM Stage Failure: {exc}")
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"AI language model service error: {str(exc)}"
        )

    # 5. Text-to-Speech (TTS) Service via Edge-TTS
    try:
        tts_result = await tts_service.synthesize(
            text=ai_response_text,
            language=clean_lang,
            voice_type=voice_type,
            tone=tone,
            speech_speed=speech_speed
        )
    except ValueError as val_err:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(val_err))
    except Exception as exc:
        logger.error(f"TTS Stage Failure: {exc}")
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Voice synthesis service error: {str(exc)}"
        )

    total_duration = round(time.time() - request_start, 2)
    logger.info(f"Conversation cycle successfully executed in {total_duration}s.")

    # 6. Return standard structured response to React frontend
    return {
        "status": "success",
        "user_text": user_transcript,
        "ai_text": ai_response_text,
        "audio_base64": tts_result["audio_base64"],
        "audio_format": tts_result.get("audio_format", "audio/mp3"),
        "duration_seconds": total_duration,
        "metadata": {
            "language": clean_lang,
            "country": country,
            "slang": slang,
            "voice_type": voice_type,
            "tone": tone,
            "speech_speed": speech_speed,
            "voice_used": tts_result.get("voice_used", ""),
            "stt_provider": STT_PROVIDER,
            "llm_provider": LLM_PROVIDER,
            "tts_provider": tts_result.get("provider", "edge-tts")
        }
    }

# ==============================================================================
# ENDPOINT: POST /transcribe
# Standalone STT endpoint using Groq Whisper (supports 'auto' language detection)
# ==============================================================================
@app.post("/transcribe", tags=["Speech to Text"])
async def handle_transcribe(
    audio: UploadFile = File(..., description="User recorded audio file from microphone"),
    language: str = Form("auto", description="Selected language code or 'auto' for multi-language detection")
):
    if not audio:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Missing audio payload. Please record audio before sending."
        )

    try:
        audio_bytes = await audio.read()
    except Exception as exc:
        logger.error(f"Failed to read audio upload: {exc}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Could not read uploaded audio file."
        )

    if len(audio_bytes) == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Uploaded audio file is empty (0 bytes)."
        )

    try:
        user_transcript = await stt_service.transcribe(
            audio_bytes=audio_bytes,
            filename=audio.filename or "recording.webm",
            content_type=audio.content_type or "audio/webm",
            language=language
        )
        return {
            "status": "success",
            "text": user_transcript
        }
    except ValueError as val_err:
        logger.warning(f"STT Validation Notice: {val_err}")
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(val_err))
    except Exception as exc:
        logger.error(f"STT Failure: {exc}")
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Speech recognition service error: {str(exc)}"
        )

# ==============================================================================
# ENDPOINT: POST /synthesize
# Standalone TTS endpoint using Edge-TTS in the chosen language & voice
# ==============================================================================
@app.post("/synthesize", tags=["Text to Speech"])
async def handle_synthesize(
    text: str = Form(..., description="Text to synthesize into voice audio"),
    language: str = Form("tamil", description="Selected language"),
    voice_type: str = Form("female", description="Voice selection: 'male' or 'female'"),
    tone: str = Form("default", description="Voice tone / emotion"),
    speech_speed: str = Form("normal", description="Speech speed: 'slow', 'normal', or 'fast'")
):
    if not text or not text.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Missing text payload to synthesize."
        )

    clean_lang = language.lower().strip()
    try:
        tts_result = await tts_service.synthesize(
            text=text,
            language=clean_lang,
            voice_type=voice_type,
            tone=tone,
            speech_speed=speech_speed
        )
        return {
            "status": "success",
            "audio_base64": tts_result["audio_base64"],
            "audio_format": tts_result.get("audio_format", "audio/mp3"),
            "voice_used": tts_result.get("voice_used", "")
        }
    except ValueError as val_err:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(val_err))
    except Exception as exc:
        logger.error(f"TTS Stage Failure: {exc}")
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Voice synthesis service error: {str(exc)}"
        )

# Runner for direct execution
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host=HOST, port=PORT, reload=True)
