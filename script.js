// Design Boggle Dice
const BOGGLE_DICE = [
  "AAEEGN",
  "ABBJOO",
  "ACHOPS",
  "AFFKPS",
  "AOOTTW",
  "CIMOTU",
  "DEILRX",
  "DELRVY",
  "DISTTY",
  "EEGHNW",
  "EEINSU",
  "EHRTVW",
  "EIOSST",
  "ELRTTY",
  "HIMNQU",
  "HLNNRZ"
];

// Shuffle the order of 16 dices (Fisher-Yates Shuffle)
    // Iterate from last index, swap with random previous index
function shuffle(arr){
    for (let i=arr.length-1; i>0; i--){
        // Random index generated
        const j = Math.floor(Math.random() * (i + 1));
        // Swap i and j element
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Roll each dice to get its top face
function generateBoard(){
    // Shallow copy of Boggle dice
    const dice = [...BOGGLE_DICE];
    shuffle(dice);

    const rolledLetters = dice.map(die => {
        const randomIndex= Math.floor(Math.random() * die.length);
        return die[randomIndex];
    })

    // put rolled Letter to 4*4 Board
    const board = [];
    let index = 0;

    for (let r=0; r<4; r++){
        const row = [];
        for (let c=0; c<4; c++){
            row.push(rolledLetters[index]);
            index ++;
        }
        board.push(row);
    }

    return board;
}

// Render Board
function renderBoard(board){
    const boardContainer = document.getElementById("board");
    boardContainer.innerHTML = "";

    for (let r=0; r<4; r++){
        for (let c=0; c<4; c++){
            const letter = board[r][c];

            const button = document.createElement("button");
            button.innerText = letter;

            // Use toggle, color changed back if has bg color
            button.addEventListener('click', (e) => {
                button.classList.toggle("clicked");
            })

            boardContainer.appendChild(button);
        }
    }
}

// Board appers when page loads
document.addEventListener("DOMContentLoaded", () => {
  board = generateBoard();
  renderBoard(board);
});