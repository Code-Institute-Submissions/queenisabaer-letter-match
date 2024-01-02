
//Wait for the DOM to finish loading and add event listeners to button elements
document.addEventListener("DOMContentLoaded", function(){
    //Event listener for the instructions button
    openModalBtn.addEventListener("click", openModal);
    //Event listener for the close button inside of the instructions button
    closeModalBtn.addEventListener("click", closeModal);
    //Event listener for the Start Game button so the startGame function runs
    startGameBtn.addEventListener("click", startGame);
})

// Variables for modal and game start
const modalContent = document.querySelector(".modal-content"); 
const openModalBtn = document.querySelector(".btn-rules");
const closeModalBtn = document.querySelector(".btn-close");
const startGameBtn = document.querySelector(".btn-start");

/*
Create the modal for the instructions, 
so that the rules are only visible, when the button is clicked.
The modal should close, when the x-button is clicked.
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

/** startGame function should hide the welcome panel
 * and display the game area with question, score and timer */
function startGame () {
    let start = document.getElementById("start");
    let game = document.getElementById("game");
    start.classList.add("hidden"); //hide the first panel
    game.classList.remove("hidden"); //display the game area
    
    nameInput();
    letter();
    letterRow();
    timer();
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

/* Create a letter for matching with the letter row */
function letter () {

}

/** create row with letters */
function letterRow () {

}

/* match the letter and the letter row */
function match() {

}

function score() {

}

function wrongAnswer() {
    alert
};
    

function correctAnswer() {
    alert
}

function timer (){

}
