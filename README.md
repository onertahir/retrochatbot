# RetroChatBot

Google Gemini API ile çalışan, retro arayüzlü Türkçe sohbet botu. Sol paneldeki
takometreden 2000, 2010, 2020 veya 2030 dönemini seçerek botun konuşma tarzını
değiştirebilirsiniz.

## Kurulum (Windows)

1. Python 3.10 veya daha yeni bir sürüm kurulu olmalı.
2. `.env.example` dosyasını `.env` adıyla kopyalayın.
3. `.env` içindeki `GEMINI_API_KEY` değerine kendi Gemini API anahtarınızı yazın.
4. Proje kökündeki `run.bat` dosyasına çift tıklayın.
5. Tarayıcıda `http://127.0.0.1:8000` adresini açın.

`run.bat`, `RetroChatBot` klasörüne geçer, sanal ortamı oluşturur, gerekli
paketleri kurar ve uygulamayı başlatır. API anahtarınızı içeren `.env` dosyası
`.gitignore` tarafından dışlandığı için GitHub'a gönderilmez.

## Elle çalıştırma

```powershell
cd RetroChatBot
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

## Proje yapısı

- `RetroChatBot/app`: FastAPI backend ve Gemini istemcisi
- `RetroChatBot/static`: HTML, CSS ve JavaScript arayüzü
- `RetroChatBot/requirements.txt`: Python bağımlılıkları
- `.env.example`: API anahtarı için örnek yapılandırma
