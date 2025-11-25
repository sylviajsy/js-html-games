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
    // Shallow copy of Boggle dice
const dice = [...BOGGLE_DICE];
shuffle(dice);

const rolledLetters = dice.map(die => {
    const randomIndex= Math.floor(Math.random() * dice.length);
    return die[randomIndex];
})
