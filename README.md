# RetroChatBot

=== ENGLISH ===

RetroChatBot is a chatbot featuring a retro interface design, powered by the Google Gemini API. The application is designed to respond to users as if it were 1998, reflecting the technological spirit of that era.

## Installation and Execution (Windows)

Follow the steps below to run the project in your local environment:

### 1. Download the Project
Clone the project to your computer or download it via the "Code" > "Download ZIP" option on GitHub and extract it to a folder:

```bash
git clone [https://github.com/onertahir/retrochatbot.git](https://github.com/onertahir/retrochatbot.git)
```
*(Note: If you downloaded it as a ZIP, make sure to extract the files from the ZIP archive before running.)*

### 2. Configuration (.env Settings)
The application needs an API key to communicate with the Gemini API. Create a file named `.env` in the main directory of the project (where the files are located) and paste the following code into it:

```env
# Copy this file as ".env" and paste your own Gemini API key.
# The .env file is never pushed to git because it is in .gitignore.

GEMINI_API_KEY=****

# You can change the model if you want (according to Google's current model names):
GEMINI_MODEL=gemini-3.6-flash
```
Enter your own Google Gemini API key in the starred area in the `GEMINI_API_KEY=****` line and save the file.

### 3. Start the Application
- Run the `run.bat` file in the project folder by double-clicking it.
- A black command screen (terminal) will open, perform the necessary operations, and start the server. **Do not close this black screen** as long as you want to use the application.

### 4. View in Browser
While the server is running, open any internet browser, type the following link in the address bar, and press Enter:

```text
http://localhost:8000
```

---

=== TÜRKÇE ===

RetroChatBot, Google Gemini API altyapısını kullanan, retro arayüz tasarımına sahip bir sohbet botudur. Uygulama, kullanıcılara sanki 1998 yılındaymış gibi yanıt vermek üzere tasarlanmıştır ve o dönemin teknolojik ruhunu yansıtır.

## Kurulum ve Çalıştırma (Windows)

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin:

### 1. Projeyi İndirin
Projeyi bilgisayarınıza klonlayın veya GitHub üzerinden "Code" > "Download ZIP" seçeneğiyle indirip bir klasöre çıkartın:

```bash
git clone [https://github.com/onertahir/retrochatbot.git](https://github.com/onertahir/retrochatbot.git)
```
*(Not: Eğer ZIP olarak indirdiyseniz, çalıştırmadan önce dosyaları mutlaka ZIP arşivinden dışarı çıkartın.)*

### 2. Yapılandırma (.env Ayarları)
Uygulamanın Gemini API ile iletişim kurabilmesi için bir API anahtarına ihtiyacı vardır. Projenin ana dizininde (dosyaların bulunduğu yerde) `.env` adında bir dosya oluşturun ve aşağıdaki kodları içine yapıştırın:

```env
# Bu dosyayı ".env" olarak kopyala ve kendi Gemini API key'ini yapıştır.
# .env dosyası .gitignore içinde olduğu için git'e asla gönderilmez.

GEMINI_API_KEY=****

# İstersen modeli değiştirebilirsin (Google'ın güncel model isimlerine göre):
GEMINI_MODEL=gemini-3.6-flash
```
`GEMINI_API_KEY=****` satırındaki yıldızlı alana kendi Google Gemini API anahtarınızı girip dosyayı kaydedin.

### 3. Uygulamayı Başlatın
- Proje klasörünün içerisindeki `run.bat` dosyasına çift tıklayarak çalıştırın.
- Siyah bir komut ekranı (terminal) açılacak ve gerekli işlemleri yapıp sunucuyu başlatacaktır. Uygulamayı kullanmak istediğiniz süre boyunca **bu siyah ekranı kapatmayın**.

### 4. Tarayıcıda Görüntüleyin
Sunucu çalışır durumdayken herhangi bir internet tarayıcısını açın ve adres çubuğuna aşağıdaki bağlantıyı yazarak uygulamaya giriş yapın:

```text
http://localhost:8000
```
