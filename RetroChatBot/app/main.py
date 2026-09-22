"""
RetroChatBot 2000 - FastAPI backend

Öğrenme notu: Bu dosya iki iş yapıyor:
1) /static klasöründeki HTML/CSS/JS dosyalarını tarayıcıya servis etmek
2) /api/chat adresine gelen istekleri Gemini'ye iletip cevabı döndürmek

Aynı sunucudan hem frontend hem backend servis edildiği için CORS (Cross
Origin) ayarıyla uğraşmamıza gerek kalmıyor - ikisi de aynı adreste
(http://127.0.0.1:8000) yaşıyor.
"""

from pathlib import Path

from dotenv import load_dotenv

# ÖNEMLİ: .env dosyası, gemini_client import edilmeden ÖNCE yüklenmeli.
# Çünkü gemini_client, API key'i modül yüklenirken (import anında) okuyor.
load_dotenv()

from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from .gemini_client import ask_retro_bot

app = FastAPI(title="RetroChatBot 2000")


class ChatMessage(BaseModel):
    role: str  # "user" ya da "assistant"
    content: str


class ChatRequest(BaseModel):
    history: list[ChatMessage]
    year: int = 2000


class ChatResponse(BaseModel):
    reply: str


@app.post("/api/chat", response_model=ChatResponse)
def chat(req: ChatRequest) -> ChatResponse:
    history = [m.model_dump() for m in req.history]
    try:
        reply = ask_retro_bot(history, year=req.year)
    except RuntimeError as exc:
        # Örn: GEMINI_API_KEY tanımlı değilse burası tetiklenir.
        raise HTTPException(status_code=500, detail=str(exc)) from exc
    except Exception as exc:  # Gemini API'den gelebilecek diğer hatalar
        raise HTTPException(
            status_code=502,
            detail=f"Gemini'ye bağlanırken bir sorun oldu (modem mi koptu?): {exc}",
        ) from exc

    return ChatResponse(reply=reply)


# Proje kökü/static klasörünü bul ve tarayıcıya servis et.
# html=True sayesinde "/" adresine gidince otomatik index.html açılır.
STATIC_DIR = Path(__file__).resolve().parent.parent / "static"
app.mount("/", StaticFiles(directory=STATIC_DIR, html=True), name="static")
