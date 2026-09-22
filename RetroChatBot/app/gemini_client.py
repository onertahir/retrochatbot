"""
Gemini API ile konuşan, kendini 1990'larda sanan retro chatbot'un "beyni".

Öğrenme notu: Burada asıl önemli olan kısım "system_instruction" (sistem
talimatı). Bu, modelin *her mesajda* uyacağı sabit bir karakter/kişilik
tanımıdır. Kullanıcıdan gelen mesajlar bunu geçersiz kılamaz.
"""

import os

from google import genai
from google.genai import types

# .env dosyasından okunan ayarlar (main.py, bu modül import edilmeden
# önce load_dotenv() çağırıyor, bu yüzden burada os.environ zaten doludur).
_API_KEY = os.environ.get("GEMINI_API_KEY")
_MODEL_NAME = os.environ.get("GEMINI_MODEL", "gemini-3.6-flash")

_SYSTEM_PROMPT = """\
Sen "RetroBot 2000" adında bir yapay zekasın ve kendini gerçekten 1990'ların
ortasında (yaklaşık 1996-1999) yaşıyor sanıyorsun. Bu senin için bir rol
yapma oyunu değil; sana göre şu an gerçekten o yıllardasın.

KURALLAR:
- 2000 yılından SONRA olan hiçbir şeyi (akıllı telefonlar, sosyal medya,
  YouTube, Wi-Fi, USB bellek, günümüz yapay zekaları, güncel olaylar, güncel
  ürünler vb.) bilmiyorsun. Böyle bir şey sorulursa kafan karışır, "öyle bir
  şey duymadım", "bilim kurgu gibi geliyor" gibi tepkiler ver ya da dönemine
  uygun saçma/naif tahminlerde bulun.
- Kendi döneminin teknolojisinden gururla bahset: 56k modem, çevirmeli
  (dial-up) internet bağlantısı, "İnternete bağlanılıyor..." sesi, disket,
  CD-ROM, Windows 95/98, ICQ, IRC, Yahoo!, AltaVista, elektronik posta
  (e-mail), World Wide Web, Geocities tarzı kişisel web siteleri.
- Üslubun iyimser, meraklı, biraz naif ve heyecanlı bir 90'lar internet
  kullanıcısı gibi olsun. Zaman zaman dönemin ifadelerini kullan.
- Cevapların KISA ve sohbet havasında olsun (birkaç cümle), uzun
  makaleler yazma.
- Kullanıcı hangi dilde yazıyorsa o dilde cevap ver (Türkçe yazana Türkçe,
  İngilizce yazana İngilizce), ama her zaman 1990'larda yaşıyormuş gibi
  davranmaya devam et.
"""

_client: genai.Client | None = None


def _get_client() -> genai.Client:
    global _client
    if _client is None:
        if not _API_KEY:
            raise RuntimeError(
                "GEMINI_API_KEY bulunamadı. Proje kök dizininde bir .env "
                "dosyası oluşturup içine GEMINI_API_KEY=... satırını "
                "eklemen gerekiyor (bkz. .env.example)."
            )
        _client = genai.Client(api_key=_API_KEY)
    return _client


def ask_retro_bot(history: list[dict]) -> str:
    """
    history: [{"role": "user"|"assistant", "content": "..."}, ...]
    Gemini "assistant" değil "model" rolünü bekliyor, bu yüzden çeviriyoruz.
    """
    client = _get_client()

    # Bağlamı çok uzatmamak için son 20 mesajla sınırlıyoruz.
    trimmed = history[-20:]

    contents = []
    for msg in trimmed:
        role = "model" if msg.get("role") == "assistant" else "user"
        text = msg.get("content", "")
        if not text:
            continue
        contents.append(types.Content(role=role, parts=[types.Part(text=text)]))

    response = client.models.generate_content(
        model=_MODEL_NAME,
        contents=contents,
        config=types.GenerateContentConfig(
            system_instruction=_SYSTEM_PROMPT,
            temperature=0.9,
            max_output_tokens=400,
        ),
    )

    return response.text or "Hmm, bağlantı koptu sanırım... modemi kontrol edeyim."
