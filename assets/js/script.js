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