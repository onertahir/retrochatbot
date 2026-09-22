# RetroBot 2000 🖥️📼

Kendini 1990'larda yaşıyor sanan, Gemini API destekli eğitim amaçlı bir chatbot.
Backend Python + FastAPI, frontend düz HTML/CSS/JS, görünüm ise bilerek
90'ların Geocities/BBS estetiğinde.

## Nasıl çalışıyor?

```
Tarayıcı (static/index.html + script.js)
        │  fetch("/api/chat", {history: [...]})
        ▼
FastAPI (app/main.py) ──► Gemini API (app/gemini_client.py)
```

- `static/` klasöründeki dosyalar düz HTML/CSS/JS'dir; hiçbir framework yok.
- `app/main.py` hem bu statik dosyaları tarayıcıya servis eder hem de
  `/api/chat` adresinde bir API endpoint'i açar.
- `app/gemini_client.py`, konuşma geçmişini Gemini'ye gönderir. Botun
  "1990'larda yaşıyorum" karakteri burada bir **system prompt** ile
  tanımlanır — kullanıcı ne yazarsa yazsın bu karakter değişmez.
- Konuşma "hafızası" sunucuda saklanmaz; tarayıcı her istekte o ana kadarki
  tüm mesaj geçmişini gönderir (`script.js` içindeki `history` dizisi).

## Kurulum (Windows)

1. Proje klasöründe zaten bir `.venv` var (PyCharm oluşturmuş). Yoksa:
   ```
   python -m venv .venv
   ```
2. `.env.example` dosyasını kopyala, adını `.env` yap, içine kendi Gemini
   API key'ini yaz:
   ```
   GEMINI_API_KEY=xxxxxxxx
   ```
3. `run.bat` dosyasına çift tıkla. Bu script:
   - Gerekli paketleri (`fastapi`, `uvicorn`, `google-genai`, `python-dotenv`)
     kurar,
   - Sunucuyu `http://127.0.0.1:8000` adresinde başlatır.
4. Tarayıcıda `http://127.0.0.1:8000` adresini aç.

## Elle çalıştırmak istersen

```
.venv\Scripts\activate
pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

## Fikirler / sonraki adımlar

- Botun karakterini `app/gemini_client.py` içindeki `_SYSTEM_PROMPT`
  metnini değiştirerek özelleştirebilirsin (ör. daha spesifik bir yıl,
  Türkiye'ye özgü 90'lar referansları, farklı bir ton).
- Şu an konuşma geçmişi sadece tarayıcı hafızasında (sayfa yenilenince
  silinir). İstersen `localStorage`'a kaydedip kalıcı hale getirebiliriz.
- Ziyaretçi sayacı şu an sahte/kozmetik — gerçek bir sayaç istersen basit
  bir dosya ya da SQLite ile sayabiliriz.
