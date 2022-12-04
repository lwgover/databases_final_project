/*
 * All of the database interface code lives here
 * 
 * Things with the comment "//EXPORTED" have been added to the export list at the bottom of the script
 * Anything not ending in "//EXPORTED" are not currently available for outside access
*/

///// TO DO LIST /////
//remove picture field from database
//5 random quizzes method
//main page
//search method

"use strict";

//require the package
const sqlite = require('better-sqlite3');

//setup the database variable
const path = require('path');
const dbPath = path.resolve(__dirname, './sql/wearther_database.db')
const db = new sqlite(dbPath); //EXPORTED
db.pragma('journal_mode = WAL');


////////// USER STUFFS //////////
//add a user to the database
//this will not work if the user already exists
//returns true on success, false on failure
function addUser(username, hashedPassword) {
    if (!userExists(username)) {
        let query = `INSERT INTO "Users" VALUES(?, ?)`;
        db.prepare(query).run(username, hashedPassword);
        return true;
    }
    else {
        return false;
    }
} //EXPORTED

//checks the password of a user
//returns true if they match, or false if the username or password is incorrect
function checkUserPassword(username, hashedPassword) {
    if (!userExists) {
        return false;
    }

    let query = `SELECT password FROM Users WHERE Username = ?`;
    let r = db.prepare(query).get(username);
    //return true or false
    if (hashedPassword === r.password) {
        return true;
    }
    else {
        return false;
    }
} //EXPORTED

//checks if a username is already present in the database
function userExists(username) {
    let query = 'SELECT * FROM Users WHERE username = ?';
    let result = db.prepare(query).get(username);
    if (result === undefined) {
        return false;
    }
    else {
        return true;
    }
} //EXPORTED

//removes a user from the database
function removeUser(username) {
    if (userExists) {
        let query = `DELETE * FROM Users WHERE Username = ?`;
        db.prepare(query).run(username);
        return true;
    }
    else {
        return false;
    }
} //EXPORTED

//UNIMPLEMENTED
//changs a user's password
function changePassword(username) {
    //
}




////////// QUIZZES //////////
//Add a quiz created by a user. Returns false if a quiz by that user, by that name, posted at that time already exists
function addQuiz(username, quizName, datePosted) {
    //does this quiz already exist?
    if (getQuizID(username, quizName, datePosted) === undefined) {
        return false;
    }

    //clean up the quiz name for its ID
    let words = quizName.split(' ');
    let editedName;
    for (let i = 0; i < words.length; i++) {
        editedName += words[i];
    } //this just removes all the spaces
    if (editedName.length > 30) { //in case quiz names get extremely long, don't let the IDs get extremely long
        editedName = editedName.slice(0, 31); //only the first 30 characters will be included.
    }


    //create the quiz ID
    let quizID = `${username}.${editedName}.${datePosted}`;

    //add the quiz to the database
    let query = "INSERT INTO Quizzes VALUES(?, ?, ?, ?, 0)";
    db.prepare(query).run(quizID, quizName, username, datePosted);
    return true;
} //EXPORTED

//get quiz questions and answers
function getQuizQuestions(username, quizName, datePosted) {
    let query = "WITH thisQuiz AS (SELECT * FROM Quizzes WHERE username = ? AND quizName = ? AND datePosted = ?) SELECT * FROM thisQuiz NATURAL JOIN Questions";
    let answers = db.prepare(query).all(username, quizName, datePosted);
} //EXPORTED

//checks if a quiz by that user and author exists in the database
function quizExists(username, quizName, datePosted) {
    let result = getQuizID(username, quizName, datePosted);
    if (result === undefined) {
        return false;
    }
    else {
        return true;
    }
} //EXPORTED

function deleteQuiz(username, quizName, datePosted) {
    if (!userExists(username)) {
        return false;
    }
    if (!quizExists(username, quizName)) {
        return false;
    }
    let query = "DELETE FROM Quizzes WHERE username = ? AND quizName = ? AND datePosted = ?";
    db.prepare(query).run(username, quizName, datePosted);
    return true;
} //EXPORTED

//returns undefined if the quiz doesn't exist
function getQuizID(username, quizName, datePosted) {
    let query = 'SELECT * FROM Quizzes WHERE username = ? AND quizName = ? AND datePosted = ?';
    let result = db.prepare(query).get(username, quizName, datePosted);
    return result;
} 

//makes sure the quizID exists, true if it does, false if not
function checkQuizID(quizID) {
    let query = "SELECT * FROM quizzes WHERE quizID = ?";
    let result = db.prepare(query).get(quizID);
    if (result === undefined) {
        return false;
    }
    return true;
}

function searchQuizNames(quizName) {
    let query = 'SELECT * FROM quizzes WHERE quizName LIKE ?';
    let results = db.prepare(query).all("%" + quizName + "%");
    return results;
} //EXPORTED



////////// QUIZ QUESTIONS //////////
//adds a question to the specified quiz, returns false if the quiz doesn't exist
function addQuestion(username, quizName, datePosted, questionNumber, question) {
    //get the quiz ID, deal with it
    let quizID = this.getQuizID(username, quizName, datePosted);
    if (quizID === undefined) {
        return false;
    }

    //generate the questionID
    let questionID = quizID + "." + quizNumber;

    //insert the question, now that we have the quizID
    let query = "INSERT INTO Questions VALUES(?, ?, ?, ?)";
    db.prepare(query).run(questionID, question, quizID, questionNumber);
    return true;
} //EXPORTED

//adds a question by its ID number
function addQuestionByID(quizID, question, questionNumber) {
    //check to make sure a quiz by that ID exists
    if (!checkQuizID(quizID)) {
        return false;
    }

    //generate the questionID
    let qustionID = quizID + "." + questionNumber;

    //insert the question, now that we have the quizID
    let query = "INSERT INTO Questions VALUES(?, ?, ?, ?)";
    db.prepare(query).run(questionID, question, quizID, questionNumber);
} //EXPORTED

//gets the question ID number, returns null if the quiz doesn't exist, undefined if the question doesn't exist
function getQuestionID(username, quizName, datePosted, questionNumber) {
    let quizID = this.getQuizID(username, quizName, datePosted);
    if (quizID === undefined) {
        return null;
    }
    let query = "SELECT questionID FROM questions WHERE quizID = ? AND questionOrder = ?";
    let questionID = db.prepare(query).get(quizID, questionNumber);
    return questionID;
}




////////// ANSWERS /////////
//adds an answer to the quiz. Returns false if the question doesn't exist and the add failed, true otherwise
function addAnswer(username, quizName, datePosted, questionNumber, answer) {
    //get the questionID
    let questionID = getQuestionID(username, quizName, questionNumber, datePosted);
    if (questionID === undefined) {
        return false;
    }

    //generate a unique answer ID
    let isUnique = false;
    let answerID = questionID + ".";
    let i = 0;
    while (!isUnique) {
        i++;
        if (checkAnswerID(answerID + i)) {
            answerID = answerID + i;
            isUnique = true;
        }
    }
    
    let query = "INSERT INTO answers VALUES(?, ?, ?)";
    db.prepare(query).run(answerID, answer, questionID);
    return true;
}




////////// ANSWER VALUES //////////
//add an answer value
function addAnswerValueByID(answerID, answer) {
    if (!answerExists) {
        return false;
    }
    
}




///////// EXPORT //////////
module.exports.db = db;

module.exports.addUser = addUser;
module.exports.checkUserPassword = checkUserPassword;
module.exports.removeUser = removeUser;
module.exports.userExists = userExists;

module.exports.addQuiz = addQuiz;
module.exports.getQuizQuestions = getQuizQuestions;
module.exports.deleteQuiz = deleteQuiz;
module.exports.quizExists = quizExists;
module.exports.searchQuizNames = searchQuizNames;

module.exports.addQuestion = addQuestion;
module.exports.addQuestionByID = addQuestionByID;