const words = ["Experience", "Adventure", "Coming soon"];
const textElement = document.querySelector(".coming-soon__text");
let wordIndex = 0;

function changeText() {
    textElement.textContent = words[wordIndex]; 
    wordIndex = (wordIndex + 1) % words.length; 
}

setInterval(changeText, 3000); 
changeText(); 
