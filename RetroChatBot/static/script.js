// RetroChatBot 2000 - frontend mantığı
//
// Öğrenme notu: Konuşma geçmişini (history) tarayıcı tarafında bir dizi
// olarak tutuyoruz ve her istekte TÜMÜNÜ backend'e gönderiyoruz. Backend
// (ve dolayısıyla Gemini) hafızasızdır; "hafıza" aslında bizim her seferinde
// gönderdiğimiz bu geçmiş listesidir.

const chatLog = document.getElementById("chat-log");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const terminalTitle = document.getElementById("terminal-title");

const tachometerDisplay = document.getElementById("tachometer-year");
const tachometerStatus = document.getElementById("tacho-status");
const tachoButtons = document.querySelectorAll(".tacho-btn");

/** @type {{role: "user"|"assistant", content: string}[]} */
const history = [];

let currentYear = 2000;

const ERA_CONFIG = {
  2000: {
    status: "DÖNEM: Milenyum & 56k",
    thinking: "RetroBot yazıyor... (56k modem üzerinden düşünüyor)",
    jumpMsg: ">>> [TAKOMETRE]: 2000 yılına ışınlandınız! Milenyum heyecanı, Galatasaray UEFA zaferi ve 56k modem sesleri yükseliyor... <<<"
  },
  2010: {
    status: "DÖNEM: MSN & Facebook",
    thinking: "RetroBot yazıyor... (MSN'de çevrimiçi, yanıt yazıyor)",
    jumpMsg: ">>> [TAKOMETRE]: 2010 yılına ışınlandınız! MSN titreşimleri, Facebook dürtmeleri ve 12 Dev Adam marşları devri... <<<"
  },
  2020: {
    status: "DÖNEM: Pandemi & Karantina",
    thinking: "RetroBot yazıyor... (Zoom bağlantısı kuruluyor)",
    jumpMsg: ">>> [TAKOMETRE]: 2020 yılına ışınlandınız! Maske-mesafe, Zoom toplantıları ve evde ekmek yapma günleri başladı... <<<"
  },
  2030: {
    status: "DÖNEM: Siberpunk & TOGG 3.0",
    thinking: "RetroBot yazıyor... (Kuantum nöro-ağdan veri çekiliyor)",
    jumpMsg: ">>> [TAKOMETRE]: 2030 yılına ışınlandınız! Uçan TOGG'lar, nöral çipler ve fütüristik Türkiye sokakları aktif... <<<"
  }
};

function addLine(text, cssClass) {
  const div = document.createElement("div");
  div.className = "line " + cssClass;
  div.textContent = text;
  chatLog.appendChild(div);
  chatLog.scrollTop = chatLog.scrollHeight;
  return div;
}

// Takometre butonları etkileşimi
tachoButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const year = parseInt(btn.getAttribute("data-year"), 10);
    if (year === currentYear) return;

    currentYear = year;

    // Aktif buton görselini güncelle
    tachoButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    // Gösterge ve durum metnini güncelle
    if (tachometerDisplay) tachometerDisplay.textContent = currentYear;
    const config = ERA_CONFIG[currentYear] || ERA_CONFIG[2000];
    if (tachometerStatus) tachometerStatus.textContent = config.status;

    // Terminal başlığını güncelle
    if (terminalTitle) {
      terminalTitle.textContent = `C:\\RETROBOT\\CHAT.EXE - [YIL: ${currentYear}]`;
    }

    // Terminale zaman yolculuğu mesajı bas
    addLine(config.jumpMsg, "system");
    chatInput.focus();
  });
});

async function sendMessage(message) {
  history.push({ role: "user", content: message });
  addLine(message, "user");

  const eraConfig = ERA_CONFIG[currentYear] || ERA_CONFIG[2000];
  const thinkingLine = addLine(eraConfig.thinking, "system");

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ history, year: currentYear }),
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
    addLine("Bağlantı koptu! Frekansı kontrol et. (" + err + ")", "error");
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

// Ziyaretçi sayacı
const counterEl = document.getElementById("visitor-counter");
if (counterEl) {
  const base = 417;
  const bump = Math.floor(Math.random() * 5);
  counterEl.textContent = String(base + bump).padStart(6, "0");
}
