// vars
let cards = document.querySelectorAll<HTMLElement>('div.card');

const cardsValues = ['HTML', 'HTML', 'CSS', 'CSS', 'TS', 'TS'];

let moves = 0;
const movesText = document.querySelector<HTMLElement>('span.moves');

let wins = 0;
const winsText = document.querySelector<HTMLElement>('span.wins');

let openedCards: any = [];

// restart button
const restartButton = document.querySelector<HTMLElement>('button.restart-button');
restartButton.addEventListener('click', function() {
    initializeGame();
})

// timer
let timerInterval: number;
let secondsElapsed: number = 0;
function resetTimer() {
    clearInterval(timerInterval);
    secondsElapsed = 0;
    updateTimerDisplay();
  
    timerInterval = window.setInterval(() => {
      secondsElapsed++;
      updateTimerDisplay();
    }, 1000);
}
function updateTimerDisplay() {
    const timerElement = document.querySelector<HTMLElement>('span.time');
    if (timerElement) {
      timerElement.textContent = `${secondsElapsed}`;
    }
}

// shuffle by randomly swapping any two elements for 100 times
function shuffleCards() {
    for (var i = 0; i < 100; i++) {
      const card1 = Math.floor(Math.random() * cardsValues.length);
      const card2 = Math.floor(Math.random() * cardsValues.length);
      const temp = cardsValues[card1];
      cardsValues[card1] = cardsValues[card2];
      cardsValues[card2] = temp;
    }
}

// game init
function initializeGame() {
    for (var i = 0; i < cards.length; i++) {
        cards[i].classList.remove("open")
        cards[i].innerHTML = ""
    }
    shuffleCards();
    resetTimer();
    moves = 0;
    movesText.innerHTML = moves.toString();
}

// event listeners for all card divs and add ID
for (var i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', handleCardClick);
    cards[i].id = i.toString();
}

// handle clicks
function handleCardClick() {
    if (!this.classList.contains("open")) {
        if (openedCards.length <= 1) {
            this.classList.toggle("open");
            openedCards.push(this.id);
            this.innerHTML = cardsValues[Number(this.id)];
            moves++;
            movesText.innerHTML = moves.toString();
            if (openedCards.length == 2) {
                let card1 = openedCards[0];
                let card2 = openedCards[1];
                if (cardsValues[card1] == cardsValues[card2]) {
                    // CORRECT
                    openedCards = [];
                    const elementsWithClass = Array.from(cards).filter(element => element.classList.contains("open"));
                    if (elementsWithClass.length === 6) {
                        // WIN
                        alert("You win!")
                        initializeGame()
                        wins++;
                        winsText.innerHTML = wins.toString();
                    }
                } else {
                    // WRONG
                    setTimeout(function() {
                        cards[Number(card1)].classList.toggle("open");
                        cards[Number(card1)].innerHTML = ""
                        cards[Number(card2)].classList.toggle("open");
                        cards[Number(card2)].innerHTML = ""
                        openedCards = [];
                    }, 1000);
                }
            }
        }
    }
}

// initial init :DD
initializeGame();
