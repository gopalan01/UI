# THAMILI Audio Generator - Backend Service

FastAPI Python backend providing voice conversation orchestration: Speech-to-Text (STT), Large Language Model dialect reasoning (LLM), and Neural Text-to-Speech (TTS) for the THAMILI Audio Platform.

---

## 1. Backend Folder Structure

```
backend/
│
├── main.py                     # FastAPI application, CORS setup, and API routes (/health, /conversation)
├── requirements.txt            # Python dependencies (FastAPI, Uvicorn, edge-tts, httpx, etc.)
├── .env                        # Local environment variables and API keys
├── .env.example                # Template configuration file without credentials
│
├── services/                   # Modular service layer
│   ├── stt_service.py          # Speech-to-Text service (Groq Whisper, OpenAI Whisper, validation)
│   ├── llm_service.py          # Large Language Model service (Prompt styling for language, slang, tone)
│   └── tts_service.py          # Text-to-Speech service (Edge-TTS Neural voices, OpenAI TTS, speed/pitch)
│
├── config.py                   # Central configuration, language tables, voice mappings, and CORS
└── README.md                   # Complete backend documentation and guide
```

---

## 2. What Each File Does

- **`main.py`**:
  Initializes the FastAPI application, mounts CORS middleware for the React frontend, configures structured logging, and exposes the `GET /health` and `POST /conversation` endpoints with full error handling.
- **`config.py`**:
  Reads `.env` variables, configures allowed CORS origins, and defines comprehensive language mappings for all 14 supported languages (Tamil, English, Hindi, Telugu, Malayalam, Kannada, Bengali, Marathi, Gujarati, Spanish, French, German, Japanese, Arabic) with corresponding Male and Female neural voices.
- **`services/stt_service.py`**:
  Validates incoming microphone audio formats (`webm`, `wav`, `mp3`, `ogg`, etc.) and transcribes audio to text via Groq Whisper (`whisper-large-v3`) or OpenAI Whisper (`whisper-1`).
- **`services/llm_service.py`**:
  Constructs system prompts enforcing the user's chosen language, dialect/slang styling (e.g., Kongu Tamil `-nga`/`-nna`, Chennai Tamil `pa`/`ba`, Delhi Hindi, etc.), and emotional tone (Happy, Sad, Husky, Excitement, Calm, Romantic, Bold). Invokes Groq, OpenAI, or Gemini.
- **`services/tts_service.py`**:
  Converts AI text into natural spoken audio in the selected language with compatible Male or Female voices. Supports Microsoft Edge Neural TTS out of the box with zero external API key requirements.
- **`requirements.txt`**:
  Specifies the Python libraries needed to run the server.

---

## 3. Required Packages

- `fastapi`: Modern, fast web framework for building APIs with Python.
- `uvicorn[standard]`: Lightning-fast ASGI web server implementation.
- `python-multipart`: Handles multipart form data (audio file uploads).
- `python-dotenv`: Loads environment variables from `.env`.
- `pydantic`: Data validation and settings management.
- `httpx`: High-performance asynchronous HTTP client for calling AI provider APIs.
- `edge-tts`: Microsoft Edge Neural Text-to-Speech library (high quality, 100+ languages, free).

---

## 4. How to Install Packages

Open a terminal or PowerShell in the `backend/` directory:

```bash
cd backend
pip install -r requirements.txt
```

---

## 5. How to Configure `.env`

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Open `.env` in an editor and add your preferred provider API keys:
   ```env
   # Server Settings
   HOST=0.0.0.0
   PORT=8000

   # Active Providers
   STT_PROVIDER=groq
   LLM_PROVIDER=groq
   TTS_PROVIDER=edge-tts

   # Optional API Keys
   GROQ_API_KEY=your_groq_api_key_here
   OPENAI_API_KEY=your_openai_api_key_here
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

---

## 6. How to Start FastAPI Backend

From the `backend` directory:

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

The backend server will run at:
`http://localhost:8000`

Interactive API Docs:
`http://localhost:8000/docs`

---

## 7. How to Start the React Frontend

From the root project directory (`audio/`):

```bash
npm run dev
```

The React frontend will run at:
`http://localhost:5173`

---

## 8. Complete Voice Conversation Request Flow

```
User
  ↓
Select Settings (Language, Country, Slang, Voice Gender, Tone, Speed)
  ↓
Tap to Speak (Central Microphone Button in React)
  ↓
Record Audio via MediaRecorder (State: 'listening')
  ↓
Stop Recording (User taps Stop, State: 'thinking' to prevent duplicate requests)
  ↓
POST /conversation (Sends audio blob + form parameters)
  ↓
STT Service (Validates audio format → Transcribes to user text)
  ↓
LLM Service (Applies Language + Country + Slang + Tone prompt constraints)
  ↓
TTS Service (Maps Language + Male/Female voice + Speed rate → Generates MP3 audio)
  ↓
FastAPI returns JSON { user_text, ai_text, audio_base64, audio_format, metadata }
  ↓
React Frontend appends user & AI messages to conversation UI
  ↓
React Frontend plays audio reply (State: 'speaking' → 'idle')
```

---

## 9. Feature Readiness & API Requirements

| Feature | Provider | Status | Requires External API Key? |
| :--- | :--- | :--- | :--- |
| **Backend API & Routing** | FastAPI / Uvicorn | **Fully Working** | No |
| **CORS Integration** | FastAPI Middleware | **Fully Working** | No |
| **Health Check (`GET /health`)** | FastAPI | **Fully Working** | No |
| **Audio Format Handling** | STT Validator | **Fully Working** (webm, wav, mp3, ogg, m4a) | No |
| **Neural TTS (14 Languages)** | Microsoft Edge TTS | **Fully Working** | **No API key needed** |
| **Voice Selection (Male/Female)** | TTS Voice Mapping | **Fully Working** | No |
| **Speech Speed (Slow/Normal/Fast)**| TTS Rate Control | **Fully Working** | No |
| **Voice Tone Pitch Tuning** | TTS Pitch Control | **Fully Working** | No |
| **Duplicate Request Guard** | Frontend State Machine | **Fully Working** | No |
| **Speech-to-Text (STT)** | Groq / OpenAI Whisper | Ready (requires key) | Yes (`GROQ_API_KEY` or `OPENAI_API_KEY`) |
| **LLM Reasoning & Dialects** | Groq / OpenAI / Gemini | Ready (requires key / fallback included) | Yes (`GROQ_API_KEY`, `OPENAI_API_KEY`, or `GEMINI_API_KEY`) |
| **Own Voice Cloning** | Modular placeholder | Requires verified sample & cloning pipeline | Yes (Specialized cloning provider) |
