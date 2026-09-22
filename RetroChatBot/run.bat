@echo off
cd /d "%~dp0"

echo ===================================================
echo             RetroChatBot 2000 Baslatiliyor
echo ===================================================
echo.

REM 1. Sanal ortam (.venv) kontrolu - Yoksa otomatik olustur
if not exist ".venv\Scripts\python.exe" (
    echo [.venv bulunamadi, otomatik olusturuluyor...]
    python -m venv .venv
    if errorlevel 1 (
        echo [HATA] Python sanal ortami olusturulamadi!
        echo Lutfen bilgisayarinizda Python'in kurulu oldugundan emin olun.
        pause
        exit /b 1
    )
    echo [.venv basariyla olusturuldu.]
)

REM 2. .env kontrolu
if not exist ".env" (
    if exist "..\.env" (
        copy /y "..\.env" ".env" >nul
    )
)

if not exist ".env" (
    echo [UYARI] .env dosyasi bulunamadi!
    echo Lutfen .env dosyasina GEMINI_API_KEY anahtarinizi ekleyin.
    pause
    exit /b 1
)

REM 3. Paketleri kontrol et ve yukle
echo Gerekli paketler kontrol ediliyor / kuruluyor...
".venv\Scripts\python.exe" -m pip install -q -r requirements.txt

REM 4. Tarayiciyi otomatik ac ve sunucuyu baslat
echo.
echo Sunucu aciliyor ve tarayiciniz baslatiliyor...
echo Adres: http://127.0.0.1:8000
echo.
echo Sunucuyu durdurmak icin bu pencereyi kapatabilir veya CTRL+C yapabilirsiniz.
echo.

start "" cmd /c "timeout /t 2 /nobreak >nul & start http://127.0.0.1:8000"

".venv\Scripts\python.exe" -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000

pause
