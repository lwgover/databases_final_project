
//set up database
const path = require('path');
const dbPath = path.resolve(__dirname, '../../public/database.js')
const database = require(dbPath);


// setup
window.addEventListener("DOMContentLoaded", loadedHandler)
function loadedHandler() {
    document.querySelector("#subButton").addEventListener("click",clickHandler);
}


//actually does the searching
function clickHandler() {
    document.querySelector("#results").innerHTML = ""; //clears the results

    let userInput = document.querySelector("#searchBox").value;

    let searchResults = database.searchResults(userInput);

    let newHTML = "";

    if (searchResults.length === 0) {
        newHTML = "<div>No quizzes by that name.</div>";
    }
    else {
        for (quiz in searchResults) {
            newHTML += "<div class='quiz'>";
            newHTML += "<span class='quizName'>" + quiz.quizName + "</span>";
            newHTML += "<span class='author'> Author: " + quiz.author + "</author>";
            newHTML += "<span class='datePosted'> Posted on: " + cleanDate(quiz.datePosted) + "</span>";
            newHTML += "</div>";
        }
    }

    document.querySelector("#results").innerHTML = newHTML;
}


//cleans up the date to display in the search results
function cleanDate(date) {
    return date;
}