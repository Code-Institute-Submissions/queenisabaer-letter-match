//Wait for the DOM to finish loading and add event listeners to button elements
document.addEventListener("DOMContentLoaded", function(){
    //Event listener for the instructions button
    openModalBtn.addEventListener("click", openModal);
    //Event listener for the close button inside of the instructions button
    closeModalBtn.addEventListener("click", closeModal);
    //Event listener for the Start Game button so the nameInput function runs
    startGameBtn.addEventListener("click", nameInput);
    //UX: set cursor in the name input as soon as page is loaded,
    document.getElementById("name-input").focus();
    //Add event listener to name input box, so when the key "enter" is pressed down, the startGame function runs (UX)
    document.getElementById('name-input').addEventListener("keydown", function(event){
    //check a property of that event object, which is the key property
    if (event.key === "Enter") {  
        nameInput();     // if enter key was pressed, the nameInput function runs
        }
    })
})

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

//Open the modal by removing the hidden class from the modal content
let openModal = function () {
    modalContent.classList.remove("hidden");
  };

//Close the instructions modal by adding the hidden class to the modal content
let closeModal = function () {
    modalContent.classList.add("hidden");
  };

//Close the modal with the escape button(for better UX)
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !modalContent.classList.contains("hidden")) {
      closeModal();
    }
  });

/** startGame function should hide the welcome panel,
 * display the game area and start the game 
 * it should run again when restart game button is clicked */
function startGame () {
    let start = document.getElementById("start");
    let game = document.getElementById("game");
    start.classList.add("hidden"); //hide the first panel
    game.classList.remove("hidden"); //display the game area
    letterInput();
    timer();
}

function nameInput () {
    //Get the childs name from the name input field in the first panel
    let name = document.getElementById("name-input").value;
    let nameError = document.getElementById("nameCheck");

     // Check if the name contains numbers
     if (/\d/.test(name)) {
        nameError.innerText= "The name should not contain numbers";
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

/** Create array of letters */
function getLetters (){
    let letters = [];
    while (letters.length < 5) {
        let letter = getRandomLetter ();
        
        //if the letter is already in the letters, don't add it, loop again
        if (letters.includes(letter)) {
            continue;
        } else {
            letters.push(letter);
        }
    }
    return letters
}

/** Create random letters for the getLetters function */
function getRandomLetter (){
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let randomIndexAlphabet = Math.floor(Math.random() * alphabet.length);
    return alphabet[randomIndexAlphabet];
}

/** Pick one random letter from the letter array and return it for matching in the question */
function getQuestionLetter (letters) {
    let randomIndexLetter = Math.floor(Math.random() * letters.length);
    return letters[randomIndexLetter];
}

function letterInput () {
 //Create the letters in the letter row and in the game question
  let letters = getLetters();
  let questionLetter = getQuestionLetter (letters);
  document.getElementById("letterZero").innerText = questionLetter;
  document.getElementById("letterOne").innerText = letters[0];
  document.getElementById("letterTwo").innerText = letters[1];
  document.getElementById("letterThree").innerText = letters[2];
  document.getElementById("letterFour").innerText = letters[3];
  document.getElementById("letterFive").innerText = letters[4];
}

/** Get current score from the DOM and increment it by 1 */
function incrementScore() {
    //Get the old score from the dom
    let oldScore = parseInt(document.getElementById("answers").innerText);
    //increase the correct answers by adding one
    document.getElementById("answers").innerText = ++oldScore;
}

//Add eventlisteners for the letterCards
document.getElementById("letterOne").addEventListener("click", function() { checkAnswer("letterOne"); });
document.getElementById("letterTwo").addEventListener("click", function() { checkAnswer("letterTwo"); });
document.getElementById("letterThree").addEventListener("click", function() { checkAnswer("letterThree"); });
document.getElementById("letterFour").addEventListener("click", function() { checkAnswer("letterFour"); });
document.getElementById("letterFive").addEventListener("click", function() { checkAnswer("letterFive"); });
   
/** Checks what the correct answer is based on which letter was clicked */
function correctAnswer(clickedLetter) {
    var correct = document.getElementById("correct");
    var wrong = document.getElementById("wrong");

    //Check if the clicked letter matches the letter in the rhyme
    let questionLetter = document.getElementById("letterZero").textContent;

    if (clickedLetter === questionLetter) { 
        //if the answer was correct, display the well done box for 1.5 seconds, 
        //increase score by one and shuffle the letters again
        correct.classList.remove("hidden");
        //to add the class after 1.5 seconds I used the instruction by Caren Bautista from ITSourceCode.com
        setTimeout(function() {
            correct.classList.add("hidden");
            }, 1500);
        incrementScore();
        letterInput();
    } else { 
        //if the answer was wrong, 
        //diplay wrong answer box for 1.5 seconds and shuffle the letters again
        wrong.classList.remove("hidden");
        setTimeout(function() {
            wrong.classList.add("hidden");
            }, 1500);
        letterRow();
    }
}

/** Check which letter was clicked */
function checkAnswer (clickedLetterID){
    //Get clicked letter by its id
    var clickedLetter = document.getElementById(clickedLetterID).textContent;
    correctAnswer(clickedLetter);
}

/** Starts the games countdown as soon as button to start the game is clicked */
function timer (){
    //Used the instruction by James McDowell on Stack Overflow
    let timeleft = 45;
    let countdownTimer = setInterval(function(){
        if(timeleft <= 0){
            clearInterval(countdownTimer);
            restartGame();
            document.getElementById("time").innerHTML = "Go!";
        } else {
            document.getElementById("time").innerHTML = timeleft;
        }
        timeleft -= 1; //counts the timer down by one
    }, 1000); //between 1 second are 1000 milliseconds
}

/** Should display the score and the start game button */
function restartGame () {
    //hide the game panel and display the restart panel
    let restart = document.getElementById("restart");
    let endgame = document.getElementById("game");
    restart.classList.remove("hidden"); 
    endgame.classList.add("hidden"); 

    // Add final score to restart game panel
    document.getElementById("score").innerText = document.getElementById("answers").innerText;

    //restart the game by clicking the button
    document.querySelector(".btn-restart").addEventListener("click", e => {
        restart.classList.add("hidden"); 
        startGame();
        document.getElementById("answers").innerText = 0; //Set the score back to 0
    });
}