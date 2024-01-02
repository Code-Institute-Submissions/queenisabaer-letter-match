
//Wait for the DOM to finish loading and add event listeners to button elements
document.addEventListener("DOMContentLoaded", function(){
    //Event listener for the instructions button
    openModalBtn.addEventListener("click", openModal);
    //Event listener for the close button inside of the instructions button
    closeModalBtn.addEventListener("click", closeModal);

})

/*
Create the modal for the instructions, 
so that the rules are only visible, when the button is clicked.
The modal should be closed, when the x-button is clicked.
I used a tutorial by Victor Eke from freeCodeCamp
*/
const modalContent = document.querySelector(".modal-content"); 
const openModalBtn = document.querySelector(".btn-rules");
const closeModalBtn = document.querySelector(".btn-close");

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

// Add an event listener to the start game button so the startGame function runs
const startGameBtn = document.querySelector(".btn-start");
startGameBtn.addEventListener('click', startGame);

/** startGame function should hide the welcome panel
 * and display the game question and the timer */
function startGame () {

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
