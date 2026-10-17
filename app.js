// Exercise 1: Build a shuffled board

// The fruits used in the game
const fruits = [
  { name: "apple", symbol: "🍎" },
  { name: "banana", symbol: "🍌" },
  { name: "cherry", symbol: "🍒" },
  { name: "coconut", symbol: "🥥" },
  { name: "grapes", symbol: "🍇" },
  { name: "mango", symbol: "🥭" },
  { name: "pineapple", symbol: "🍍" },
  { name: "watermelon", symbol: "🍉" },
];

// Shuffle the cards
function shuffle(array) {

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  
}

  return array;
}

// Keep track of the cards and moves
let deck = [];
const flippedCards = [];
let moveCount = 0;
let isWaiting = false;

// Create the game board
function buildBoard() {
  deck = shuffle([...fruits, ...fruits]);

  const board = document.querySelector("#board");

  // Add each card to the board
  deck.forEach((fruit, i) => {

    const card = document.createElement("button");

    card.type = "button";
    card.classList.add("card");
    card.setAttribute("aria-label", `Card ${i + 1}, face down`);
    card.dataset.index = i;

    board.appendChild(card);

  });

}

// Exercise 2: Turn a card over

const board = document.querySelector("#board");
const movesDisplay = document.querySelector("#moves");
const statusMessage = document.querySelector("#status");

// Exercise 5: Finish the game

// Check whether all cards have been matched
function checkWin() {

  const matchedCards = board.querySelectorAll(".matched");

  if (matchedCards.length === 16) {

    statusMessage.textContent = `You found all the pairs in ${moveCount} moves!`;
    statusMessage.classList.add("you-won");

  }

}

// Turn mismatched cards face down
function turnCardsBack() {

  flippedCards.forEach((card) => {

    card.textContent = "";
    card.classList.remove("flipped");

    card.setAttribute(
      "aria-label",
      `Card ${Number(card.dataset.index) + 1}, face down`

    );

  });

  // Clear the selected cards
  flippedCards.length = 0;
  isWaiting = false;

}

// Handle clicks on the board
board.addEventListener("click", (event) => {
  const card = event.target;

  // Ignore clicks while waiting
  if (isWaiting) {
    return;

  }

  // Only respond to card clicks
  if (!card.classList.contains("card")) {
    return;

  }

  // Ignore cards that are already face up
  if (card.classList.contains("flipped")) {
    return;

  }

  // Find and show the fruit
  const fruit = deck[card.dataset.index];
  card.textContent = fruit.symbol;
  card.classList.add("flipped");

  // Remember the selected card
  flippedCards.push(card);

  // Update the card's accessibility label
  card.setAttribute(
    "aria-label",
    `Card ${Number(card.dataset.index) + 1}, ${fruit.name}`

  );

  // Check when two cards have been selected
  if (flippedCards.length === 2) {

    moveCount++;
    movesDisplay.textContent = moveCount;

    const firstFruit = deck[flippedCards[0].dataset.index];
    const secondFruit = deck[flippedCards[1].dataset.index];

    // Check whether the cards match
    if (firstFruit.name === secondFruit.name) {

      flippedCards[0].classList.add("matched");
      flippedCards[1].classList.add("matched");

      flippedCards[0].disabled = true;
      flippedCards[1].disabled = true;

      statusMessage.textContent = "That's a pair!";

      // Check whether all pairs have been found
	checkWin();

      // Clear the selected cards
      flippedCards.length = 0;

    } else {

      // Give the player time to see the cards
      statusMessage.textContent = "Not a pair. Try again.";
      isWaiting = true;

      // Turn the cards back after one second
      setTimeout(turnCardsBack, 1000);

    }

  }

});


buildBoard();


