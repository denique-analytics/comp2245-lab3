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



 // ********************** Exercise 2 · Turn a card over ***********************


// Listen for clicks on the board


const board = document.querySelector("#board");

board.addEventListener("click", (event) => {
  const card = event.target;




  // Only respond when a card is clicked

  if (!card.classList.contains("card")) {
    return;
  }





  // Ignore cards that are already face up

  if (card.classList.contains("flipped")) {
    return;
  }




// Find the fruit belonging to this card


const fruit = deck[card.dataset.index];



// Display the fruit symbol

card.textContent = fruit.symbol;


// Turn the card face up

card.classList.add("flipped");


// Remember this face-up card

flippedCards.push(card);


// Update the screen-reader label


card.setAttribute(
  "aria-label",
  `Card ${Number(card.dataset.index) + 1}, ${fruit.name}`
);

});

// Calling the function again 

BuildBoard();

