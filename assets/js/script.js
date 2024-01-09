/*jshint esversion: 6 */

//Wait for the DOM to finish loading and add event listeners to button elements
document.addEventListener("DOMContentLoaded", function () {
  //Event listener for the instructions button.
  //Opens the modal, when the modal content does have a class of hidden
  //and closes the modal when it doesn't.
  openModalBtn.addEventListener("click", function () {
    if (modalContent.classList.contains("hidden")) {
      openModal();
    } else {
      closeModal();
    }
  });
  //Event listener for the close button inside of the instructions button
  closeModalBtn.addEventListener("click", closeModal);
  //Event listener for the Start Game button so the nameInput function runs
  startGameBtn.addEventListener("click", nameInput);
  //Event listener for the modal close with the escape key(for better UX)
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !modalContent.classList.contains("hidden")) {
      closeModal();
    }
  });
  //UX: set cursor in the name input as soon as page is loaded,
  document.getElementById("name-input").focus();
  //Add event listener to name input box, so when the key "enter" is pressed down, the startGame function runs (UX)
  document
    .getElementById("name-input")
    .addEventListener("keydown", function (event) {
      //check a property of that event object, which is the key property
      if (event.key === "Enter") {
        nameInput(); // if enter key was pressed, the nameInput function runs
      }
    });
});

// Variables for modal and game start
const modalContent = document.querySelector(".modal-content");
const openModalBtn = document.querySelector(".btn-rules");
const closeModalBtn = document.querySelector(".btn-close");
const startGameBtn = document.querySelector(".btn-start");

/*
Create the modal for the instructions, 
so that the rules are only visible, when the button is clicked.
The modal should overlay the content and
close, when the x-button is clicked.
I used a tutorial by Victor Eke from freeCodeCamp
*/
let openModal = function () {
  //Open the modal by removing the hidden class from the modal content
  modalContent.classList.remove("hidden");
};

//Close the instructions modal by adding the hidden class to the modal content
let closeModal = function () {
  modalContent.classList.add("hidden");
};

/** startGame function hides the welcome panel,
 * displays the game area and starts the game
 * it runs again when restart game button is clicked */
function startGame() {
  let start = document.getElementById("start");
  let game = document.getElementById("game");
  start.classList.add("hidden"); //hide the first panel
  game.classList.remove("hidden"); //display the game area
  letterInput(); //Add the letters to the letter cards
  timer(); //Set the timer
  closeModal(); //Close the modal, if its still open.
}

/** Gets the name from the name input field and
 * checks the name for displaying a warning or starting the game,
 * depending on whether the entered name contains numbers, spaces or is empty.
 * It runs again when restart game button is clicked */
function nameInput() {
  //Get the childs name from the name input field in the first panel
  let name = document.getElementById("name-input").value.trim();
  let nameError = document.getElementById("nameCheck");

  // Check if the name contains numbers
  if (/\d/.test(name)) {
    nameError.innerText = "The name should not contain numbers";
    return; //Stop further execution
  }
  if (name) {
    //Display the name of the child inside the game rhyme
    document.getElementById("childName").innerHTML = name;
  } else {
    //Display a placeholder, if no name was entered
    document.getElementById("childName").innerHTML = "Abecedarian";
  }
  //Continue with starting the game
  startGame();
}

/** Create an array of five random letters.
 * If one letter is already set to the array,
 * it will push another random letter into the array.
 * @returns {string} An array with five random letters.
 */
function getLetters() {
  let letters = [];
  while (letters.length < 5) {
    let letter = getRandomLetter(); //get random letter from the alphabet

    //if the letter is already in the letters, don't add it, loop again
    if (letters.includes(letter)) {
      continue;
    } else {
      letters.push(letter);
    }
  }
  return letters;
}

/** Generate a random uppercase letter from the alphabet
 * @return {string} A randomly selected uppercase letter from the alphabet.
 */
function getRandomLetter() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let randomIndexAlphabet = Math.floor(Math.random() * alphabet.length);
  return alphabet[randomIndexAlphabet];
}

/** Pick one random letter from a given set of letters and
 * return it for matching in the question of the rhyme
 * @param {string} letters - Set of letters from which to randomly pick the letter.
 * @return {string} A randomly selected letter from the provided set. */
function getQuestionLetter(letters) {
  let randomIndexLetter = Math.floor(Math.random() * letters.length);
  return letters[randomIndexLetter];
}

/** Add the created letters to the letter row and set the letter to the game question.
 * Styles the game question letter with the standard background color.
 */
function letterInput() {
  let letters = getLetters();
  let questionLetter = getQuestionLetter(letters);
  document.getElementById("letterZero").innerText = questionLetter;
  document.getElementById("letterOne").innerText = letters[0];
  document.getElementById("letterTwo").innerText = letters[1];
  document.getElementById("letterThree").innerText = letters[2];
  document.getElementById("letterFour").innerText = letters[3];
  document.getElementById("letterFive").innerText = letters[4];
  document.getElementById("letterZero").style.backgroundColor =
    "rgba(145, 213, 234, 0.5)";
}

/** Get current score from the DOM and increment it by 1 */
function incrementScore() {
  //Get the old score from the dom
  let oldScore = parseInt(document.getElementById("answers").innerText);
  //increase the correct answers by adding one
  document.getElementById("answers").innerText = ++oldScore;
}

//Add eventlisteners for the letterCards.
//I tried to create a loop for these event listeners, but then a warning in jshint was displayed(Readme => Features in the future)
document.getElementById("letterOne").addEventListener("click", function () {
  checkAnswer("letterOne");
});
document.getElementById("letterTwo").addEventListener("click", function () {
  checkAnswer("letterTwo");
});
document.getElementById("letterThree").addEventListener("click", function () {
  checkAnswer("letterThree");
});
document.getElementById("letterFour").addEventListener("click", function () {
  checkAnswer("letterFour");
});
document.getElementById("letterFive").addEventListener("click", function () {
  checkAnswer("letterFive");
});

/** Checks what the correct answer is based on which letter was clicked.
 * Depending on the answer a message is shown and the background color changes for a brief moment.
 * If the answer was correct, the letters are mixed again and the score increases.
 * @param {string} clickedLetter - The letter clicked by the user.
 */
function correctAnswer(clickedLetter) {
  const correct = document.getElementById("correct");
  const wrong = document.getElementById("wrong");

  //Check if the clicked letter matches the letter in the rhyme
  let questionLetter = document.getElementById("letterZero");
  if (clickedLetter === questionLetter.textContent) {
    //if the answer was correct, display the well done box for 750 milliseconds,
    //set backgroundcolor of lettercard to green
    //increase score by one and shuffle the letters again
    correct.classList.remove("hidden");
    questionLetter.style.backgroundColor = "rgba(5,165,80, 0.5)";
    //to add the class after 750 milliseconds I used the instruction by Caren Bautista from ITSourceCode.com
    setTimeout(function () {
      correct.classList.add("hidden");
      questionLetter.style.backgroundColor = "rgba(145, 213, 234, 0.5)";
      letterInput();
    }, 750);
    incrementScore();
  } else {
    //if the answer was wrong,
    //diplay wrong answer box for 1.5 seconds
    //set background color of lettercard to red
    wrong.classList.remove("hidden");
    questionLetter.style.backgroundColor = "rgba(225,37,51, 0.5)";
    setTimeout(function () {
      wrong.classList.add("hidden");
      questionLetter.style.backgroundColor = "rgba(145, 213, 234, 0.5)";
    }, 1000);
  }
}

/** Checks which letter was clicked based on its letter id.
 * Uses this id to retrieve the corresponding letter's text content
 * and pass it to the correctAnswer function
 * @param {string} clickedLetterID - The id of the clicked letter
 */
function checkAnswer(clickedLetterID) {
  //Get clicked letter by its id
  const clickedLetter = document.getElementById(clickedLetterID).textContent;
  correctAnswer(clickedLetter);
}

/** Starts a countdown of 45 seconds inside of the game
 * as soon as button to start the game is clicked.
 * When time is up, the restartGame function runs and the timer is reset */
function timer() {
  //Used the instruction by James McDowell on Stack Overflow
  let timeleft = 45;
  let countdownTimer = setInterval(function () {
    if (timeleft <= 0) {
      clearInterval(countdownTimer);
      restartGame();
      document.getElementById("time").innerHTML = "Go!";
    } else {
      document.getElementById("time").innerHTML = timeleft;
    }
    timeleft -= 1; //counts the timer down by one
  }, 1000); //between 1 second are 1000 milliseconds
}

/**  Displays the final score and the (re-)start game button, to run the game again
 * Depending on the score a congratulation text is displayed.
 * If the (re-)start game button is clicked, the startGame function runs and the score is reset
 */
function restartGame() {
  //hide the game panel and display the restart panel
  let restart = document.getElementById("restart");
  let endgame = document.getElementById("game");
  restart.classList.remove("hidden");
  endgame.classList.add("hidden");

  // Add final score to restart game panel and depending on the score show congratulations
  let score = document.getElementById("score");
  let congratulations = document.getElementById("congrats");
  score.innerText = document.getElementById("answers").innerText;

  if (score.innerText == 0) {
    congratulations.innerText =
      "Did you click the letters in the row? Just try again!";
  } else if (score.innerText < 5) {
    congratulations.innerText =
      "Great start, try again to improve your skills.";
  } else if (score.innerText < 10) {
    congratulations.innerText = "Well done, you're on a good way.";
  } else if (score.innerText < 15) {
    congratulations.innerText = "Amazing, you're working hard on this.";
  } else if (score.innerText < 20) {
    congratulations.innerText = "Fantastic work. You make it look easy.";
  } else if (score.innerText < 25) {
    congratulations.innerText = "Excellent job. Be proud of yourself!";
  } else if (score.innerText < 30) {
    congratulations.innerText = "Incredible! You've just mastered that.";
  } else {
    congratulations.innerText = "Great job";
  }

  //restart the game by clicking the button
  document.querySelector(".btn-restart").addEventListener("click", (e) => {
    restart.classList.add("hidden");
    startGame();
    document.getElementById("answers").innerText = 0; //Set the score back to 0
  });
}
