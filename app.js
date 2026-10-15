 // ********************** Exercise 1 · Build a shuffled board ***********************

// List of fruits used in the memory game

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




// Randomly shuffles the cards


function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}




// Store the deck and the cards turned face up


let deck = [];
const flippedCards = [];




// Build the game board



function BuildBoard() {


  // Create and shuffle a deck containing 16 cards


  deck = shuffle([...fruits, ...fruits]);




// Find the space where the cards will go


  const board = document.querySelector("#board");




  // Create one button for each card in the deck


  deck.forEach((fruit, i) => {
    const card = document.createElement("button");

    card.type = "button";
    card.classList.add("card");
    card.setAttribute("aria-label", `Card ${i + 1}, face down`);
    card.dataset.index = i;

    board.appendChild(card);
  });

}




// Calling the function again 

BuildBoard();

