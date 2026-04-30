const options = ["Rock", "Paper", "Scissors"];

// Global Score Variables
let playerScore = 0;
let computerScore = 0;

// DOM Elements
const playerScoreSpanElement = document.getElementById("player-score");
const computerScoreSpanElement = document.getElementById("computer-score");
const roundResultsMsg = document.getElementById("results-msg");
const winnerMsgElement = document.getElementById("winner-msg");
const optionsContainer = document.querySelector(".options-container");
const resetGameBtn = document.getElementById("reset-game-btn");
const playerHand = document.getElementById("player-hand");
const computerHand = document.getElementById("computer-hand");

// Buttons
const rockBtn = document.getElementById("rock-btn");
const paperBtn = document.getElementById("paper-btn");
const scissorsBtn = document.getElementById("scissors-btn");

function getRandomComputerResult() {
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

function hasPlayerWonTheRound(playerChoice, computerChoice) {
  return (
    (playerChoice === "Rock" && computerChoice === "Scissors") ||
    (playerChoice === "Scissors" && computerChoice === "Paper") ||
    (playerChoice === "Paper" && computerChoice === "Rock")
  );
}

function getRoundResults(userOption, computerResult) {
  if (hasPlayerWonTheRound(userOption, computerResult)) {
    playerScore++;
    return `Player wins! ${userOption} beats ${computerResult}`;
  } else if (computerResult === userOption) {
    return `It's a tie! Both chose ${userOption}`;
  } else {
    computerScore++;
    return `Computer wins! ${computerResult} beats ${userOption}`;
  }
}

function showResults(userOption) {
  // 1. Guard Clause: If the game is already over, STOP everything immediately
  if (playerScore === 3 || computerScore === 3) {
    return; 
  }

  // 2. Lock in the computer choice
  const computerResult = getRandomComputerResult();

  // 3. Start Animation
  playerHand.textContent = "✊";
  computerHand.textContent = "✊";
  playerHand.classList.add("shaking");
  computerHand.classList.add("shaking");

  // 4. Wait for animation (1.2 seconds)
  setTimeout(() => {
    playerHand.classList.remove("shaking");
    computerHand.classList.remove("shaking");

    const emojiMap = {
      "Rock": "✊",
      "Paper": "✋",
      "Scissors": "✌️"
    };

    // Show the final emojis
    playerHand.textContent = emojiMap[userOption];
    computerHand.textContent = emojiMap[computerResult];

    // Update Logic & Text (This increments the scores)
    roundResultsMsg.innerText = getRoundResults(userOption, computerResult);
    playerScoreSpanElement.innerText = playerScore;
    computerScoreSpanElement.innerText = computerScore;

    // 5. Final Win Check: Run this ONLY after the scores update
    if (playerScore === 3 || computerScore === 3) {
      if (playerScore === 3) {
        winnerMsgElement.innerHTML = "<strong>Congratulations! You win! 🥳</strong>";
      } else {
        winnerMsgElement.innerHTML = "<strong>Better luck next time... 😢</strong>";
      }

      resetGameBtn.style.display = "block";
      optionsContainer.style.display = "none";
    }
  }, 1200);
}

function resetGame() {
  // Reset Scores
  playerScore = 0;
  computerScore = 0;
  playerScoreSpanElement.innerText = "0";
  computerScoreSpanElement.innerText = "0";

  // Reset Hands
  playerHand.textContent = "✊";
  computerHand.textContent = "✊";

  // Reset UI Layout
  resetGameBtn.style.display = "none";
  optionsContainer.style.display = "block";
  winnerMsgElement.innerText = "";
  roundResultsMsg.innerText = "";
}

// Event Listeners
rockBtn.addEventListener("click", () => showResults("Rock"));
paperBtn.addEventListener("click", () => showResults("Paper"));
scissorsBtn.addEventListener("click", () => showResults("Scissors"));
resetGameBtn.addEventListener("click", resetGame);