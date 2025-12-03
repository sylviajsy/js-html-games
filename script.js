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

// Load Dictionary
async function loadDictionary(){
    try{
        const response = await fetch('./dictionary-yawl.txt');
        const text = await response.text();
        const words = text.split('\n').map(w => w.trim().toUpperCase());
        GameState.dictionary = new Set(words);
        console.log("Dictionary successfully loaded with ${GameState.dictionary.size} words");
    }catch(error){
    console.error("Dictionary fail to load", error);
    }
}

let totalGameTime = 180;
// State Object
const GameState = {
    timeLeft: totalGameTime,
    score: 0,
    isTimerActive: false,
    timerInterval: null,
    board: [],
    selectedPath: [],
    foundWords: new Set(),
    dictionary: new Set(),
    highestScore: localStorage.getItem('boggleHighestScore') || 0
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
            const isNewRecord = isHighestScore();
            document.getElementById("submitBtn").disabled = true;
            document.querySelectorAll("#board button").forEach(btn => btn.disabled = true);
            
            // async function: After timeLeft = 0 + 100ms, pop up playAgain screen
            setTimeout(() => {
                let msg = `Time's up!\n\nYour Final Score: ${GameState.score}\n`

                if (isNewRecord){
                    msg += "\nNew High Score! 🎉";
                }

                const playAgain = confirm(`${msg}\n\nPlay again?`);

                if (playAgain) resetGame();

            }, 100);
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
                        showMessage("error", "Only the last selected letter can be unselected");
                    }
                    return;
                }

                // Check if selected letter is adjecent to last letter
                if (GameState.selectedPath.length > 0) {
                    const lastDie = GameState.selectedPath[GameState.selectedPath.length - 1];
                    if (!isNeighbor(lastDie.r, lastDie.c, r, c)) {
                        showMessage("error", "Not adjacent!");
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

  loadDictionary();
  document.getElementById("highestScoreValue").innerText = GameState.highestScore;

  document.getElementById("submitBtn").addEventListener("click", ()=>{
    // A valid word must contain at least 3 letters
    if (GameState.selectedPath.length<3){
        showMessage("error", "A valid word must contain at least 3 letters");
        return;
    } 

    const word = GameState.selectedPath.map(p => p.letter).join("");
    // Check if the word in dictionary
    if (!GameState.dictionary.has(word)){
        showMessage("error", "This is not an English word!");

        resetSelection();
        return;
    }
    // Check for repeated word
    if (GameState.foundWords.has(word)) {
        showMessage("error", "You already found this word!");

        resetSelection();
        return;
    }

    // Add word to Word List
    const wordList = document.getElementById("wordList");
    const newListItem = document.createElement("li");
    newListItem.innerText = word;
    wordList.appendChild(newListItem);
    GameState.foundWords.add(word);

    // Reset selected letters
    resetSelection();

    // Get score
    const score = getScore(word);
    GameState.score += score;
    document.getElementById("scoreValue").innerText = GameState.score;
  });

  // Reset Button 
  document.getElementById("resetBtn").addEventListener("click",()=>{
    resetSelection();
  })

  showCurrentTime();
});

// Reset Button logic
function resetSelection(){
    GameState.selectedPath = [];
    document.querySelectorAll(".clicked").forEach(btn => btn.classList.remove("clicked"));
}

// Reset Game
function resetGame(){
    GameState.timeLeft = totalGameTime;
    GameState.score = 0;
    GameState.isTimerActive = false;
    GameState.selectedPath = [];
    GameState.foundWords.clear();

    if (GameState.timerInterval) clearInterval(GameState.timerInterval);

    document.getElementById("timeValue").innerText = "3:00";
    document.getElementById("scoreValue").innerText = "0";
    document.getElementById("wordList").innerHTML = "";

    document.getElementById("submitBtn").disabled = false;

    const board = generateBoard();
    renderBoard(board);
}

function showMessage(type, text){
    const msgBox = document.getElementById("message-box");

    msgBox.innerText = text;

    msgBox.className = "message-box";

    if (type ==="success"){
        msgBox.classList.add("success");
    } else {
        msgBox.classList.add("error");
    }

    setTimeout(() => {
        msgBox.className = "message-box";
        msgBox.innerText = "";
    }, 2000);
}

function showCurrentTime(){
    setInterval(() => {
        const timeNow = Date.now();

        const nowDate = new Date();
        nowDate.setTime(timeNow);

        const year = nowDate.getFullYear();
        const month = nowDate.getMonth();
        const day = nowDate.getDate();
        const hours = nowDate.getHours();
        const minutes = nowDate.getMinutes();
        const seconds = nowDate.getSeconds();

        const displayDate = new Date(year, month, day, hours, minutes, seconds);

        document.getElementById("clockDisplay").innerText = displayDate.toLocaleTimeString();
    }, 1000);
}

function isHighestScore(){
    if (GameState.score > GameState.highestScore){
        GameState.highestScore = GameState.score;
        document.getElementById("highestScoreValue").innerText = GameState.highestScore;
        // Local Storage (in the browser) the highest value
        localStorage.setItem('boggleHighestScore', GameState.highestScore);
        
        return true;
    }

    return false;
}