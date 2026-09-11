"""
THAMILI Audio Generator - Backend Configuration & Provider Mappings
Handles environment variables, language support tables, voice mappings, and CORS settings.
"""

import os
from pathlib import Path
from typing import Optional
from dotenv import load_dotenv, dotenv_values

# Load .env from backend directory
BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / ".env", override=False)

def clean_key(val: Optional[str]) -> str:
    """Safely sanitizes API keys by trimming whitespace and quotation marks."""
    if not val:
        return ""
    v = str(val).strip()
    if (v.startswith('"') and v.endswith('"')) or (v.startswith("'") and v.endswith("'")):
        v = v[1:-1].strip()
    return v

# ==============================================================================
# SERVER CONFIGURATION
# ==============================================================================
HOST = os.getenv("HOST", "0.0.0.0")
PORT = int(os.getenv("PORT", "8000"))

# Allowed CORS Origins for React Frontend
CORS_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:4173",
    "http://127.0.0.1:4173",
    "http://localhost:8080",
    "http://127.0.0.1:8080",
]
CORS_ORIGIN_REGEX = r"^https?://(localhost|127\.0\.0\.1)(:[0-9]+)?$"

# ==============================================================================
# API KEYS & PROVIDER SELECTION
# Secure handling: Never exposed to frontend or logged
# ==============================================================================
def get_groq_api_key() -> str:
    """Dynamically reads and returns GROQ_API_KEY from environment or .env file."""
    # Check directly from .env file first
    env_path = BASE_DIR / ".env"
    if env_path.exists():
        vals = dotenv_values(env_path)
        k = clean_key(vals.get("GROQ_API_KEY") or vals.get("STT_API_KEY") or vals.get("LLM_API_KEY"))
        if k:
            return k

    # Check os environment
    return clean_key(os.getenv("GROQ_API_KEY", "") or os.getenv("STT_API_KEY", "") or os.getenv("LLM_API_KEY", ""))

def get_openai_api_key() -> str:
    env_path = BASE_DIR / ".env"
    if env_path.exists():
        vals = dotenv_values(env_path)
        k = clean_key(vals.get("OPENAI_API_KEY"))
        if k:
            return k
    return clean_key(os.getenv("OPENAI_API_KEY", ""))

def get_gemini_api_key() -> str:
    env_path = BASE_DIR / ".env"
    if env_path.exists():
        vals = dotenv_values(env_path)
        k = clean_key(vals.get("GEMINI_API_KEY"))
        if k:
            return k
    return clean_key(os.getenv("GEMINI_API_KEY", ""))

GROQ_API_KEY = get_groq_api_key()
OPENAI_API_KEY = get_openai_api_key()
GEMINI_API_KEY = get_gemini_api_key()

STT_API_KEY = clean_key(os.getenv("STT_API_KEY", "")) or GROQ_API_KEY or OPENAI_API_KEY
LLM_API_KEY = clean_key(os.getenv("LLM_API_KEY", "")) or GROQ_API_KEY or OPENAI_API_KEY or GEMINI_API_KEY
TTS_API_KEY = clean_key(os.getenv("TTS_API_KEY", "")) or OPENAI_API_KEY

# Default providers
STT_PROVIDER = os.getenv("STT_PROVIDER", "groq").lower()
LLM_PROVIDER = os.getenv("LLM_PROVIDER", "groq").lower()
TTS_PROVIDER = os.getenv("TTS_PROVIDER", "edge-tts").lower()

# Groq LLM Model Configuration
GROQ_PRIMARY_LLM_MODEL = os.getenv("GROQ_PRIMARY_LLM_MODEL", "openai/gpt-oss-20b")
GROQ_FALLBACK_LLM_MODEL = os.getenv("GROQ_FALLBACK_LLM_MODEL", "openai/gpt-oss-120b")

# ==============================================================================
# SUPPORTED LANGUAGES & VOICE CONFIGURATION (14 Languages)
# Mapped to compatible TTS neural voices (Male & Female)
# ==============================================================================
SUPPORTED_LANGUAGES = {
    "tamil": {
        "id": "tamil",
        "name": "Tamil",
        "native_name": "தமிழ்",
        "bcp47": "ta-IN",
        "edge_voices": {
            "male": "ta-IN-ValluvarNeural",
            "female": "ta-IN-PallaviNeural"
        },
        "openai_voices": {
            "male": "onyx",
            "female": "nova"
        }
    },
    "english": {
        "id": "english",
        "name": "English",
        "native_name": "English",
        "bcp47": "en-US",
        "edge_voices": {
            "male": "en-US-GuyNeural",
            "female": "en-US-JennyNeural"
        },
        "openai_voices": {
            "male": "echo",
            "female": "alloy"
        }
    },
    "hindi": {
        "id": "hindi",
        "name": "Hindi",
        "native_name": "हिन्दी",
        "bcp47": "hi-IN",
        "edge_voices": {
            "male": "hi-IN-MadhurNeural",
            "female": "hi-IN-SwaraNeural"
        },
        "openai_voices": {
            "male": "fable",
            "female": "shimmer"
        }
    },
    "telugu": {
        "id": "telugu",
        "name": "Telugu",
        "native_name": "తెలుగు",
        "bcp47": "te-IN",
        "edge_voices": {
            "male": "te-IN-MohanNeural",
            "female": "te-IN-ShrutiNeural"
        },
        "openai_voices": {
            "male": "onyx",
            "female": "nova"
        }
    },
    "malayalam": {
        "id": "malayalam",
        "name": "Malayalam",
        "native_name": "മലയാളം",
        "bcp47": "ml-IN",
        "edge_voices": {
            "male": "ml-IN-MidhunNeural",
            "female": "ml-IN-SobhanaNeural"
        },
        "openai_voices": {
            "male": "echo",
            "female": "alloy"
        }
    },
    "kannada": {
        "id": "kannada",
        "name": "Kannada",
        "native_name": "ಕನ್ನಡ",
        "bcp47": "kn-IN",
        "edge_voices": {
            "male": "kn-IN-GaganNeural",
            "female": "kn-IN-SapnaNeural"
        },
        "openai_voices": {
            "male": "fable",
            "female": "nova"
        }
    },
    "bengali": {
        "id": "bengali",
        "name": "Bengali",
        "native_name": "বাংলা",
        "bcp47": "bn-IN",
        "edge_voices": {
            "male": "bn-IN-BashkarNeural",
            "female": "bn-IN-TanishaaNeural"
        },
        "openai_voices": {
            "male": "echo",
            "female": "shimmer"
        }
    },
    "marathi": {
        "id": "marathi",
        "name": "Marathi",
        "native_name": "मराठी",
        "bcp47": "mr-IN",
        "edge_voices": {
            "male": "mr-IN-ManoharNeural",
            "female": "mr-IN-AarohiNeural"
        },
        "openai_voices": {
            "male": "onyx",
            "female": "alloy"
        }
    },
    "gujarati": {
        "id": "gujarati",
        "name": "Gujarati",
        "native_name": "ગુજરાતી",
        "bcp47": "gu-IN",
        "edge_voices": {
            "male": "gu-IN-NiranjanNeural",
            "female": "gu-IN-DhwaniNeural"
        },
        "openai_voices": {
            "male": "echo",
            "female": "nova"
        }
    },
    "spanish": {
        "id": "spanish",
        "name": "Spanish",
        "native_name": "Español",
        "bcp47": "es-ES",
        "edge_voices": {
            "male": "es-ES-AlvaroNeural",
            "female": "es-ES-ElviraNeural"
        },
        "openai_voices": {
            "male": "fable",
            "female": "alloy"
        }
    },
    "french": {
        "id": "french",
        "name": "French",
        "native_name": "Français",
        "bcp47": "fr-FR",
        "edge_voices": {
            "male": "fr-FR-HenriNeural",
            "female": "fr-FR-DeniseNeural"
        },
        "openai_voices": {
            "male": "echo",
            "female": "shimmer"
        }
    },
    "german": {
        "id": "german",
        "name": "German",
        "native_name": "Deutsch",
        "bcp47": "de-DE",
        "edge_voices": {
            "male": "de-DE-ConradNeural",
            "female": "de-DE-KatjaNeural"
        },
        "openai_voices": {
            "male": "onyx",
            "female": "alloy"
        }
    },
    "japanese": {
        "id": "japanese",
        "name": "Japanese",
        "native_name": "日本語",
        "bcp47": "ja-JP",
        "edge_voices": {
            "male": "ja-JP-KeitaNeural",
            "female": "ja-JP-NanamiNeural"
        },
        "openai_voices": {
            "male": "echo",
            "female": "nova"
        }
    },
    "arabic": {
        "id": "arabic",
        "name": "Arabic",
        "native_name": "العربية",
        "bcp47": "ar-SA",
        "edge_voices": {
            "male": "ar-SA-HamedNeural",
            "female": "ar-SA-ZariyahNeural"
        },
        "openai_voices": {
            "male": "onyx",
            "female": "shimmer"
        }
    }
}

# ==============================================================================
# SPEECH SPEED MAPPINGS
# Maps frontend speeds ('slow', 'normal', 'fast') to TTS rate adjustments
# ==============================================================================
SPEED_RATE_MAPPING = {
    "slow": "-25%",
    "normal": "+0%",
    "fast": "+35%"
}

# Speed float multipliers for OpenAI / general
SPEED_FLOAT_MAPPING = {
    "slow": 0.75,
    "normal": 1.0,
    "fast": 1.35
}

# ==============================================================================
# TONE & EMOTION STYLES
# Used for prompt guidance and pitch tuning
# ==============================================================================
TONE_INSTRUCTIONS = {
    "default": "Speak in a calm, helpful, natural conversational tone.",
    "happy": "Speak with joy, warmth, cheerful enthusiasm, and smiling friendliness.",
    "sad": "Speak with a soft, gentle, empathetic, comforting, and compassionate demeanor.",
    "husky": "Speak with deep resonance, majestic composure, and grounded warmth.",
    "excitement": "Speak with high energy, dynamic excitement, and spirited zeal.",
    "calm": "Speak peacefully, serenely, with measured pauses and steady tranquility.",
    "romantic": "Speak gently, melodiously, with endearing affection and soft grace.",
    "bold": "Speak with sharp confidence, firm authority, courage, and strong conviction."
}

# Edge-TTS pitch adjustments for emotions
TONE_PITCH_MAPPING = {
    "default": "+0Hz",
    "happy": "+15Hz",
    "sad": "-12Hz",
    "husky": "-24Hz",
    "excitement": "+22Hz",
    "calm": "-5Hz",
    "romantic": "-8Hz",
    "bold": "-15Hz"
}

# Supported Audio Mime Types from browser
SUPPORTED_AUDIO_TYPES = {
    "audio/webm",
    "audio/webm;codecs=opus",
    "audio/wav",
    "audio/x-wav",
    "audio/mp3",
    "audio/mpeg",
    "audio/ogg",
    "audio/m4a",
    "audio/x-m4a",
    "audio/flac"
}
