// Game state: these variables keep track of the current game.
let gameStarted = false;
let wins = 0;
let losses = 0;
let draws = 0;
let results = [];

// Start the game after checking that the player entered a name.
function startGame() {
    let name = document.getElementById("playerName").value.trim();

    if (name === "") {
        alert("Please enter your name.");
        return;
    }

    gameStarted = true;
    document.getElementById("welcome").innerHTML = "Welcome, " + name + "!";
    document.getElementById("startTime").innerHTML =
        "Game started on: " + new Date();

    document.getElementById("result").innerHTML =
        "Choose Rock, Paper or Scissors to play.";
    document.getElementById("result").style.color = "#263746";
    document.getElementById("summary").innerHTML = "";
}

// Choose one of the three options randomly for the computer.
function getComputerChoice() {
    let choices = ["rock", "paper", "scissors"];
    let randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

// Play one round, decide the winner, update the page and save the round.
function playRound(playerChoice) {
    if (gameStarted === false) {
        alert("Click Start Game first.");
        return;
    }

    let computerChoice = getComputerChoice();
    let roundResult;

    // Decide whether the player wins, loses or draws.
    if (playerChoice === computerChoice) {
        roundResult = "Draw";
        draws++;
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "scissors" && computerChoice === "paper") ||
        (playerChoice === "paper" && computerChoice === "rock")
    ) {
        roundResult = "Win";
        wins++;
    } else {
        roundResult = "Lose";
        losses++;
    }

    // Change the images to match both choices.
    document.getElementById("playerImg").src = playerChoice + ".png";
    document.getElementById("playerImg").alt = "Your choice: " + playerChoice;

    document.getElementById("computerImg").src = computerChoice + ".png";
    document.getElementById("computerImg").alt = "Computer choice: " + computerChoice;

    // Display the result and use a different colour for each outcome.
    let resultElement = document.getElementById("result");
    resultElement.innerHTML =
        "You chose " + playerChoice + ". Computer chose " +
        computerChoice + ". Result: " + roundResult + "!";

    if (roundResult === "Win") {
        resultElement.style.color = "green";
    } else if (roundResult === "Lose") {
        resultElement.style.color = "red";
    } else {
        resultElement.style.color = "grey";
    }

    // Update the scoreboard.
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("draws").innerHTML = draws;

    // Store the result so that the summary can count it later.
    results.push(roundResult);

    // Add this round to the history table.
    let roundNumber = results.length;
    document.getElementById("historyBody").innerHTML +=
        "<tr><td>" + roundNumber + "</td><td>" + playerChoice +
        "</td><td>" + computerChoice + "</td><td>" + roundResult +
        "</td></tr>";

    // Clear an old summary when a new round is played.
    document.getElementById("summary").innerHTML = "";
}

// Count the wins with a for loop and calculate the win percentage.
function showSummary() {
    if (gameStarted === false) {
        alert("Click Start Game first.");
        return;
    }

    let totalWins = 0;

    for (let i = 0; i < results.length; i++) {
        if (results[i] === "Win") {
            totalWins++;
        }
    }

    let totalRounds = results.length;
    let winPercentage = 0;

    if (totalRounds > 0) {
        winPercentage = Math.round((totalWins / totalRounds) * 100);
    }

    document.getElementById("summary").innerHTML =
        "You played " + totalRounds + " rounds and won " +
        winPercentage + "%.";
}

// Reset the game scores, history, images and messages.
function resetGame() {
    gameStarted = false;
    wins = 0;
    losses = 0;
    draws = 0;
    results = [];

    document.getElementById("wins").innerHTML = 0;
    document.getElementById("losses").innerHTML = 0;
    document.getElementById("draws").innerHTML = 0;

    document.getElementById("historyBody").innerHTML = "";
    document.getElementById("result").innerHTML =
        "Game has been reset. Enter your name and start again.";
    document.getElementById("result").style.color = "#263746";
    document.getElementById("summary").innerHTML = "";
    document.getElementById("welcome").innerHTML = "";
    document.getElementById("startTime").innerHTML = "Game has not started yet.";

    document.getElementById("playerImg").src = "rock.png";
    document.getElementById("computerImg").src = "rock.png";
    document.getElementById("playerImg").alt = "Your choice: rock";
    document.getElementById("computerImg").alt = "Computer choice: rock";
    document.getElementById("playerName").value = "";
}
