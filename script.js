const letters = [
  { char: "ا", name: "Elif" },
  { char: "ب", name: "Be" },
  { char: "ت", name: "Te" },
  { char: "ث", name: "Se" },
  { char: "ج", name: "Cim" },
  { char: "ح", name: "Ha" },
  { char: "خ", name: "Hı" },
  { char: "د", name: "Dal" },
  { char: "ذ", name: "Zel" },
  { char: "ر", name: "Ra" },
  { char: "ز", name: "Ze" },
  { char: "س", name: "Sin" },
  { char: "ش", name: "Şın" },
  { char: "ص", name: "Sad" },
  { char: "ض", name: "Dad" },
  { char: "ط", name: "Tı" },
  { char: "ظ", name: "Zı" },
  { char: "ع", name: "Ayn" },
  { char: "غ", name: "Ğayın" },
  { char: "ف", name: "Fe" },
  { char: "ق", name: "Kaf" },
  { char: "ك", name: "Kef" },
  { char: "ل", name: "Lam" },
  { char: "م", name: "Mim" },
  { char: "ن", name: "Nun" },
  { char: "و", name: "Vav" },
  { char: "ه", name: "He" },
  { char: "لا", name: "Lamelif" },
  { char: "ي", name: "Ye" }
];

let currentIndex = 0;

const letterEl = document.getElementById("letter");
const answerEl = document.getElementById("answer");
const answerBox = document.getElementById("answerBox");
const answerBtn = document.getElementById("answerBtn");
const currentNumberEl = document.getElementById("currentNumber");
const totalNumberEl = document.getElementById("totalNumber");
const progressBar = document.getElementById("progressBar");

totalNumberEl.textContent = letters.length;

function hideAnswer() {
  answerBox.hidden = true;
  answerBtn.textContent = "Cevabı Göster";
  answerBtn.setAttribute("aria-expanded", "false");
}

function renderLetter() {
  const item = letters[currentIndex];

  letterEl.textContent = item.char;
  answerEl.textContent = item.name;
  currentNumberEl.textContent = currentIndex + 1;
  progressBar.style.width = `${((currentIndex + 1) / letters.length) * 100}%`;

  hideAnswer();
}

function nextLetter() {
  currentIndex = (currentIndex + 1) % letters.length;
  renderLetter();
}

function previousLetter() {
  currentIndex = (currentIndex - 1 + letters.length) % letters.length;
  renderLetter();
}

function randomLetter() {
  if (letters.length <= 1) return;

  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * letters.length);
  } while (newIndex === currentIndex);

  currentIndex = newIndex;
  renderLetter();
}

document.getElementById("nextBtn").addEventListener("click", nextLetter);
document.getElementById("prevBtn").addEventListener("click", previousLetter);
document.getElementById("randomBtn").addEventListener("click", randomLetter);

answerBtn.addEventListener("click", () => {
  const willOpen = answerBox.hidden;
  answerBox.hidden = !willOpen;
  answerBtn.textContent = willOpen ? "Cevabı Gizle" : "Cevabı Göster";
  answerBtn.setAttribute("aria-expanded", String(willOpen));
});

document.getElementById("fullscreenBtn").addEventListener("click", async () => {
  try {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  } catch (error) {
    console.error("Tam ekran açılamadı:", error);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") nextLetter();
  if (event.key === "ArrowLeft") previousLetter();
  if (event.key === " ") {
    event.preventDefault();
    randomLetter();
  }
  if (event.key.toLowerCase() === "c") {
    answerBtn.click();
  }
});

renderLetter();
