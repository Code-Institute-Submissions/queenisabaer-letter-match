
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
 * display the game area with question, score and timer 
 * and start the game with the correct name input, letters in the lettercards, the score and the timer */
function startGame () {
    let start = document.getElementById("start");
    let game = document.getElementById("game");
    start.classList.add("hidden"); //hide the first panel
    game.classList.remove("hidden"); //display the game area
    
    nameInput();
    letter();
    letterRow();
    timer();
    score();
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

/** Create a random letter for matching with the letter row */
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
function letterRow () {

    //variables for the letter row
    document.getElementById("letterOne").innerText = letter();
    document.getElementById("letterTwo").innerText = letter();
    document.getElementById("letterThree").innerText = letter();
    document.getElementById("letterFour").innerText = letter();
    document.getElementById("letterFive").innerText = letter();

 
    //create variable called operand 1 that stores the inner text(the value) of element with id operand1
    let operand1 = parseInt(document.getElementById('operand1').innerText);
    //create variable called operand 2 that stores the inner text(the value) of element with id operand2
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    //creates a variable called operator, that reads the text content of element with id operator
    let operator = document.getElementById('operator').innerText;
}

/* match the letter and the letter row */
function match(x, ) {
    if (letter === letter2){

    }
}

function score() {

}

function wrongAnswer() {
    alert
}
    

function correctAnswer() {
    alert
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
    //restart the game by clicking the button
    document.querySelector(".btn-restart").addEventListener("click", e => {
        restart.classList.add("hidden"); 
        startGame(); 
    });
}