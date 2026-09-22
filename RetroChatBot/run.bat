@echo off
cd /d "%~dp0"

if not exist ".venv\Scripts\python.exe" (
    echo [HATA] .venv bulunamadi. Once PyCharm'da ya da "python -m venv .venv" ile
    echo bir sanal ortam olusturmalisin.
    pause
    exit /b 1
)

if not exist ".env" (
    echo [UYARI] .env dosyasi bulunamadi.
    echo .env.example dosyasini kopyalayip .env olarak kaydet ve
    echo GEMINI_API_KEY degerini gir.
    pause
    exit /b 1
)

echo Paketler kontrol ediliyor / kuruluyor...
".venv\Scripts\python.exe" -m pip install -q -r requirements.txt

echo.
echo RetroChatBot 2000 baslatiliyor...
echo Tarayicida su adresi ac: http://127.0.0.1:8000
echo Durdurmak icin CTRL+C, sonra bu pencereyi kapatabilirsin.
echo.

".venv\Scripts\python.exe" -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000

pause
