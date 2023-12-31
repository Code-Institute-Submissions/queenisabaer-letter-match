
//Wait for the DOM to finish loading and add event listeners to button elements
document.addEventListener("DOMContentLoaded", function(){
    
    let buttons = document.getElementsByTagName("button");

    /*
    iterate through array created through ElementsByTagName method
    return each element in the array and store it in variable button on each iteration
    */
    for(let button of buttons){
        //Add Eventlistener to these buttons from array
        //button represent individual button element from array created
        //when clicked, it will run the following if-function
        button.addEventListener("click", function(){
            /*
            if-statement checks the data-type of the button(s) 
            this is referring to the button, that is clicked, 
            e.g. addition button is clicked, this referrs to this addition button
            then use the get Attribute method and check the contents of data-type costum attribute
            */
            if (this.getAttribute("data-type") === "start-game") {
                //First attemtp for practicing: display an alert, if data-type equals submit. alert("You clicked Submit");
                // call the check answer function
                alert("This is a test alert");
            } else {
                //if it was not submit, that was clicked, set the gameType variable 
                //to the value of that attribute, e.g. addition, division or subtract
                let gameType = this.getAttribute("data-type");
                //First attempt: add alert that displays the user the button, the user clicked. attention: backquotes used to create template iteral. alert(`You clicked ${gameType}`);
                //final attempt: call the runGame function
                runGame(gameType);
            }

        })
    }
})

/*
Create the modal for the instructions, 
so that the rules are only visible, when the button is clicked.
The modal should be closed, when the x-button is clicked
I used a tutroial by Victor Eke from freeCodeCamp
*/
const modalContent = document.querySelector(".modal-content"); 
const openModalBtn = document.querySelector(".btn-rules");
const closeModalBtn = document.querySelector(".btn-close");

//Open the modal by removing the hidden class from the modal content
let openModal = function () {
    modalContent.classList.remove("hidden");
  };

  openModalBtn.addEventListener("click", openModal);

//Close the instructions modal by adding the hidden clase to the modal content
let closeModal = function () {
    modalContent.classList.add("hidden");
  };

  closeModalBtn.addEventListener("click", closeModal);

  //Close the modal with the escape button(UX)
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !modalContent.classList.contains("hidden")) {
      closeModal();
    }
  });

 /** Start the game */
function startGame () {

}

/* Create letter */
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
