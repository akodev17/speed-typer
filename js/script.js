const API_URL = "https://quotes-api-self.vercel.app/quote";
const quoteElement = document.getElementById("quoteDisplay");
const quoteInput = document.getElementById("quoteInput");
const timer = document.getElementById("timer");
let startTime;

quoteInput.addEventListener("input", () => {
  const arrayQuote = quoteElement.querySelectorAll("span");
  const arrayValue = quoteInput.value.split("");
  let correct = true;
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index];
    if (character == null) {
      characterSpan.classList.remove("incorrect", "correct");
      correct = false;
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add("correct");
      characterSpan.classList.remove("incorrect");
    } else {
      characterSpan.classList.add("incorrect");
      characterSpan.classList.remove("correct");
      correct = false;
    }
  });
  
  if (correct && arrayValue.length === arrayQuote.length) {
    renderNextQuote();
  }
});

async function getRandomQuote() {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data.quote;
}

async function renderNextQuote() {
  const quote = await getRandomQuote();
  quoteElement.innerHTML = "";
  quoteInput.value = "";
  quote.split("").forEach((character) => {
    const characterSpan = document.createElement("span");
    characterSpan.innerText = character;
    quoteElement.appendChild(characterSpan);
  });
  startTimer();
}

function startTimer() {
  startTime = new Date();
  setInterval(() => {
    timer.innerText = getTimerTime();
  }, 1000);
}

function getTimerTime() {
  const currentTime = new Date();
  const seconds = Math.floor((currentTime - startTime) / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}

renderNextQuote();