## Yapılandırma (.env Kurulumu)

Uygulamanın Google Gemini API ile iletişim kurabilmesi için ortam değişkenlerini (environment variables) ayarlamanız gerekmektedir. Güvenlik prensipleri gereği API anahtarları asla uzak depoya (repository) gönderilmemelidir.

1. Projenin ana dizininde (root directory) `.env` adında boş bir dosya oluşturun.
2. Aşağıdaki yapılandırma şablonunu kopyalayarak oluşturduğunuz `.env` dosyasının içerisine yapıştırın:

```env
# Bu dosyayı ".env" olarak kopyala ve kendi Gemini API key'ini yapıştır.
# .env dosyası .gitignore içinde olduğu için git'e asla gönderilmez.

GEMINI_API_KEY=****

# İstersen modeli değiştirebilirsin (Google'ın güncel model isimlerine göre):
GEMINI_MODEL=gemini-3.6-flash
