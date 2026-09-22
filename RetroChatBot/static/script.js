// RetroChatBot 2000 - frontend mantığı
//
// Öğrenme notu: Konuşma geçmişini (history) tarayıcı tarafında bir dizi
// olarak tutuyoruz ve her istekte TÜMÜNÜ backend'e gönderiyoruz. Backend
// (ve dolayısıyla Gemini) hafızasızdır; "hafıza" aslında bizim her seferinde
// gönderdiğimiz bu geçmiş listesidir.

const chatLog = document.getElementById("chat-log");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");

/** @type {{role: "user"|"assistant", content: string}[]} */
const history = [];

function addLine(text, cssClass) {
  const div = document.createElement("div");
  div.className = "line " + cssClass;
  div.textContent = text;
  chatLog.appendChild(div);
  chatLog.scrollTop = chatLog.scrollHeight;
  return div;
}

async function sendMessage(message) {
  history.push({ role: "user", content: message });
  addLine(message, "user");

  const thinkingLine = addLine("RetroBot yazıyor... (56k modem üzerinden düşünüyor)", "system");

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ history }),
    });

    const data = await res.json();

    thinkingLine.remove();

    if (!res.ok) {
      addLine("HATA: " + (data.detail || "bilinmeyen bir sorun oluştu"), "error");
      return;
    }

    history.push({ role: "assistant", content: data.reply });
    addLine(data.reply, "bot");
  } catch (err) {
    thinkingLine.remove();
    addLine("Bağlantı koptu! Modem kablosunu kontrol et. (" + err + ")", "error");
  }
}

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = chatInput.value.trim();
  if (!message) return;
  chatInput.value = "";
  sendMessage(message);
});

// Sayfa ilk açıldığında input'a otomatik odaklan.
chatInput.focus();

// Ziyaretçi sayacını her sayfa yenilemede biraz artırıyormuş gibi yapalım
// (tamamen kozmetik, gerçek bir sayaç değil - tıpkı 90'ların çoğu sitesindeki gibi!).
const counterEl = document.getElementById("visitor-counter");
if (counterEl) {
  const base = 417;
  const bump = Math.floor(Math.random() * 5);
  counterEl.textContent = String(base + bump).padStart(6, "0");
}
