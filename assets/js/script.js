//Wait for the DOM to finish loading and add event listeners to button elements
document.addEventListener("DOMContentLoaded", function(){
    //Event listener for the instructions button
    openModalBtn.addEventListener("click", openModal);
    //Event listener for the close button inside of the instructions button
    closeModalBtn.addEventListener("click", closeModal);
    //Event listener for the Start Game button so the startGame function runs
    startGameBtn.addEventListener("click", startGame);
    //UX: set cursor in the name input as soon as page is loaded,
    document.getElementById("name-input").focus();

    //Add event listener to name input box, so when the key "enter" is pressed down, the startGame function runs (UX)
    document.getElementById('name-input').addEventListener("keydown", function(event){
        //check a property of that event object, which is the key property
        if (event.key === "Enter") {
            startGame();     // if enter key was pressed, the startGame function runs
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
    
    nameInput();
    timer();
    letter();
    letterRow();
}

function nameInput () {
    //Get the childs name from the name input field in the first panel
    let name = document.getElementById("name-input").value;
    if (name) {
        //Display the name of the child inside the game rhyme
        document.getElementById("childName").innerHTML = name;
    } else {
     //Display a placeholder, if no name was entered
     document.getElementById("childName").innerHTML = "Abecedarian"; 
    }
}

/** Create random letter for the letter cards */
function letter () {
    //Create an array with the length of 26, turn into uppercase(65) letters
    let alphabet = Array.from({length: 26}, (v, n) => String.fromCharCode(n + 65));
    /* 
    Math.random generates random number between 0 and 1 and
    is than multiplied by length property of alphabet array to get random index. 
    To round to the nearest integer and get a valid index within the alphabet array, use Math.floor() function.
    Use this index to pick a random element from the alphabet array and store it in the randomLetter variable.
    */
    var randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];  
    return randomLetter;
}

/** Create a row with letters inside the rhyme */
function letterRow () { //Each letter card should contain a random letter from the alphabet, but not the same
    //Create for each letter card a random letter 
    let letterOne = document.getElementById("letterOne");
    letterOne.innerText = letter();
    let letterTwo = document.getElementById("letterTwo");
    letterTwo.innerText = letter();
    let letterThree = document.getElementById("letterThree");
    letterThree.innerText = letter();
    let letterFour = document.getElementById("letterFour");
    letterFour.innerText = letter();
    let letterFive = document.getElementById("letterFive");
    letterFive.innerText = letter();

    //Make sure no letter is used twice

}

/* match the letter in the rhyme and one letter from the letter row */
function match() {
    //Get the letter in the rhyme
    let letterZero = document.getElementById("letterZero");
    //Set its value to one of the letters in the letter row

}

/** Get current score from the DOM and increment it by 1 */
function incrementScore() {
    //Get the old score from the dom
    let oldScore = parseInt(document.getElementById("answers").innerText);
    //increase the correct answers by adding one
    document.getElementById("answers").innerText = ++oldScore;
}
   
/** Checks if answer was correct or not and runs the corresponding functions */
function correctAnswer() {
    //read the childrens click from the DOM
    // should return as integer(parseInt), 


    
    //if answer was correct and value becomes true,
    var correct = document.getElementById("correct");
    var wrong = document.getElementById("wrong");
    //if the answer was correct, the well done box should appear for 3 seconds, the score should increase by one
    //and the the letters should shuffle again
    if (isCorrect) { 
        correct.classList.remove("hidden");
        //to add the class after 3 seconds I used the instruction by Caren Bautista from ITSourceCode.com
        setTimeout(function() {
            correct.classList.add("hidden");
            }, 3000);
        incrementScore();
        letterRow();
    } else { //if the answer was wrong, the wrong answer box should appear for 3 seconds and the letters should shuffle again
        wrong.classList.remove("hidden");
        setTimeout(function() {
            wrong.classList.add("hidden");
            }, 3000);
        letterRow();
    }
}

/** Starts the games countdown as soon as button to start the game is clicked */
function timer (){
    //Used the instruction by James McDowell on Stack Overflow
    let timeleft = 5;
    let downloadTimer = setInterval(function(){
        if(timeleft <= 0){
            clearInterval(downloadTimer);
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