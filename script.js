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

let totalGameTime = 180;
// State Object
const GameState = {
    timeLeft: totalGameTime,
    score: 0,
    isTimerActive: false,
    timerInterval: null,
    board: [],
    selectedPath: [],
    foundWords: new Set()
};

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
    // Update state
    GameState.board = board;
    return board;
}

// Set timer
function startTimer() { 

    GameState.isTimerActive = true;

    GameState.timerInterval = setInterval(()=>{
        GameState.timeLeft--;

        const minutes = Math.floor(GameState.timeLeft / 60);
        let seconds = GameState.timeLeft % 60;
        if (seconds < 10) seconds = "0" + seconds;

        document.getElementById("timeValue").innerText = `${minutes}:${seconds}`;

        if (GameState.timeLeft <=0){
            clearInterval(GameState.timerInterval);
            document.getElementById("submitBtn").disabled = true;
            document.querySelectorAll("#board button").forEach(btn => btn.disabled = true);
            alert("Time is up!");
        }
    }, 1000);

}

// Check if two clicks are neighbors
function isNeighbor(r1, c1, r2, c2) {
    const rowDiff = Math.abs(r1 - r2);
    const colDiff = Math.abs(c1 - c2);
    return rowDiff <= 1 && colDiff <= 1;
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
                if (!GameState.isTimerActive){
                    startTimer();
                }
                
                // Only last selected letter could be cancelled
                if (button.classList.contains("clicked")){
                    const lastSelected = GameState.selectedPath[GameState.selectedPath.length-1];

                    if (lastSelected.r==r && lastSelected.c==c){
                        GameState.selectedPath.pop();
                        button.classList.remove("clicked");
                    } else {
                        alert("Only the last selected letter can be unselected")
                    }
                    return;
                }

                // Check if selected letter is adjecent to last letter
                if (GameState.selectedPath.length > 0) {
                    const lastDie = GameState.selectedPath[GameState.selectedPath.length - 1];
                    if (!isNeighbor(lastDie.r, lastDie.c, r, c)) {
                        alert("Not adjacent!");
                        return;
                    }
                }
                GameState.selectedPath.push({ r: r, c: c, letter: letter });
                button.classList.toggle("clicked");
            })

            boardContainer.appendChild(button);
        }
    }
}


// calculate score
function getScore(word){
    let score = 0;
    if (word.length <=4){
        score = 1;
    } else if (word.length == 5){
        score = 2;
    } else if (word.length == 6){
        score = 3;
    } else if (word.length ==7){
        score = 5;
    } else {
        score = 11;
    }
    return score;
}

// Board appers when page loads
document.addEventListener("DOMContentLoaded", () => {
  const board = generateBoard();
  renderBoard(board);

  document.getElementById("submitBtn").addEventListener("click", ()=>{
    // A valid word must contain at least 3 letters
    if (GameState.selectedPath.length<3){
        alert("A valid word must contain at least 3 letters");
        return;
    } 

    const word = GameState.selectedPath.map(p => p.letter).join("");
    // Check for repeated word
    if (GameState.foundWords.has(word)) {
        alert("You already found this word!");

        GameState.selectedPath = [];
        document.querySelectorAll(".clicked").forEach(btn => btn.classList.remove("clicked"));
        return;
    }

    // Add word to Word List
    const wordList = document.getElementById("wordList");
    const newListItem = document.createElement("li");
    newListItem.innerText = word;
    wordList.appendChild(newListItem);
    GameState.foundWords.add(word);

    // Reset selected letters
    GameState.selectedPath = [];
    document.querySelectorAll(".clicked").forEach(btn => {
        btn.classList.remove("clicked");
    });

    // Get score
    const score = getScore(word);
    GameState.score += score;
    document.getElementById("scoreValue").innerText = GameState.score;
  });
});


