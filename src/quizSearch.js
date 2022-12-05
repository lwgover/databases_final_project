
console.log("quizSearch.js reached");

//set up database
const path = require('path');
const dbPath = path.resolve(__dirname, './database.js')
const database = require(dbPath);


// setup
window.addEventListener("DOMContentLoaded", loadedHandler)
function loadedHandler() {
    document.querySelector("#subButton").addEventListener("click",clickHandler);
}


//actually does the searching
function clickHandler() {
    //clear any previous results:
    let resultsChild = document.querySelector("#resultsChild");
    resultsChild.parentNode.removeChild(resultsChild);

    //get the users
    let searchResults = document.querySelector("#searchBox").value;

    //set up the results div
    let resultsDiv = document.querySelector("#results");

    //create a new "resultsChild" to add, so that it can easily be removed in the future
    //everything is attached through a div called "resultsChild", which is removed and replaced whenever this method is called
    let newResultsChild = document.createElement("div");
    newResultsChild.setAttribute("id", "resultsChild");
    resultsDiv.append(newChild);


    if (searchResults === undefined) {    
        //have it display "no quizzes found by that name" if no results are found
        let newText = document.createTextNode("No quizzes found by that name")
        newResultsChild.appendChild(newText);
    }
    else {
        for (quiz in searchResults) {
            //create the div for this quiz, give it an ID for CSS, and append it to the resultsChild node
            let quizDiv = document.createElement("div");
            quizDiv.setAttribute("id", "quizDiv");
            newResultsChild.appendChild(quizDiv);

            //create the span for the quiz name
            let nameSpan = document.createElement("span");
            let nameSpanText = document.createTextNode(quiz.name);
            nameSpan.appendChild(nameSpanText);
            quizDiv.appendChild(nameSpan);

            //create the span for the author of the quiz
            let authorSpan = document.createElement("span");
            let authorSpanText = document.createTextNode("Author: " + quiz.username);
            authorSpan.appendChild(authorSpanText);
            quizDiv.appendChild(authorSpanText);

            //create the span for the date the quiz was posted
            let dateSpan = document.createElement("span");
            let dateSpanText = document.createTextNode("Posted on " + cleanDate(quiz.datePosted));
            dateSpan.appendChild(dateSpanText);
            quizDiv.appendChild(dateSpanText);
        }
    }
}


//cleans up the date to display in the search results
function cleanDate(date) {
    return date;
}