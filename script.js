// api https://quotes-api-self.vercel.app/quote
const API_URL = "https://quotes-api-self.vercel.app/quote";
const quoteElement = document.getElementById("quoteDisplay");
const quoteInput = document.getElementById("quoteInput");

quoteInput.addEventListener("input", () => {
  const arrayQuote = quoteElement.querySelectorAll("span");
  const arrayValue = quoteInput.value.split("");
  arrayValue.forEach((character, index) => {
    const characterSpan = arrayQuote[index];
    if (character == null) {
      characterSpan.classList.remove("incorrect");
      characterSpan.classList.remove("correct");
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add("correct");
      characterSpan.classList.remove("incorrect");
    } else {
      characterSpan.classList.remove("correct");
      characterSpan.classList.add("incorrect");
    }
  });
});

function getRandomQuote() {
  return fetch(API_URL)
    .then((response) => response.json())
    .then((data) => data.quote);
}

async function renderNextQuote() {
  const quote = await getRandomQuote();
  quoteElement.innerHTML = "";
  quote.split("").forEach((character) => {
    const characterSpan = document.createElement("span");
    characterSpan.innerText = character;
    quoteElement.appendChild(characterSpan);
  });
  quoteElement.value = null;
}

renderNextQuote(); // "The only way to do great work is to love what you do." - Steve Jobs
