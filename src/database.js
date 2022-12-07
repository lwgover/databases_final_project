/*
 * All of the database interface code lives here
 * 
 * Things with the comment "//EXPORTED" have been added to the export list at the bottom of the script
 * Anything not ending in "//EXPORTED" are not currently available for outside access
*/

"use strict";

//require the package
const sqlite = require('better-sqlite3');

//setup the database variable
const path = require('path');
const dbPath = path.resolve(__dirname, './../database.db')
const db = new sqlite(dbPath); //EXPORTED
db.pragma('journal_mode = WAL');


////////// USER STUFFS //////////
//add a user to the database
//this will not work if the user already exists
//returns true on success, false on failure
function addUser(username, hashedPassword) {
    if (!userExists(username)) {
        let query = 'INSERT INTO users VALUES(?, ?)';
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
    if (!userExists(username)) {
        return false;
    }

    let query = 'SELECT password FROM users WHERE username = ?';
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
    let query = 'SELECT * FROM users WHERE username = ?';
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
    if (userExists(username)) {
        let query = 'DELETE * FROM users WHERE Username = ?';
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
    let query = "INSERT INTO quizzes VALUES(?, ?, ?, ?, 0)";
    db.prepare(query).run(quizID, quizName, username, datePosted);
    return true;
} //EXPORTED

//get quiz questions and answers
function getQuizQuestions(username, quizName, datePosted) {
    let query = "WITH thisQuiz AS (SELECT * FROM quizzes WHERE username = ? AND quizName = ? AND datePosted = ?) SELECT * FROM thisQuiz NATURAL JOIN questions";
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
    if (!quizExists(username, quizName, datePosted)) {
        return false;
    }
    let query = "DELETE FROM quizzes WHERE username = ? AND quizName = ? AND datePosted = ?";
    db.prepare(query).run(username, quizName, datePosted);
    return true;
} //EXPORTED

//returns undefined if the quiz doesn't exist
function getQuizID(username, quizName, datePosted) {
    let query = 'SELECT * FROM quizzes WHERE username = ? AND quizName = ? AND datePosted = ?';
    let result = db.prepare(query).get(username, quizName, datePosted);
    return result;
} //EXPORTED

//makes sure the quizID exists, true if it does, false if not
function checkQuizID(quizID) {
    let query = "SELECT * FROM quizzes WHERE quizID = ?";
    let result = db.prepare(query).get(quizID);
    if (result === undefined) {
        return false;
    }
    return true;
}

//TODO: disallow "" as an input
//TODO: change to an iterator, only 25 are allowed
function searchQuizNames(quizName) {
    let query = 'SELECT * FROM quizzes WHERE quizName LIKE ?';
    let results = db.prepare(query).all('%' + quizName + '%');
    return results;
} //EXPORTED

function idAddQuiz(quizID, quizName, username, datePosted, timesPlayed) {
    if(!checkQuizID(quizID)) {
        return false;
    }
    //add the quiz to the database
    let query = "INSERT INTO quizzes VALUES(?, ?, ?, ?, ?)";
    db.prepare(query).run(quizID, quizName, username, datePosted, timesPlayed);
    return true;
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
    let query = "INSERT INTO questions VALUES(?, ?, ?, ?)";
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
    let questionID = quizID + "." + questionNumber;

    //insert the question, now that we have the quizID
    let query = "INSERT INTO questions VALUES(?, ?, ?, ?)";
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
} //EXPORTED

function idAddQuestion(questionID, question, quizID, questionOrder) {
    //insert the question, now that we have the quizID
    let query = "INSERT INTO questions VALUES(?, ?, ?, ?)";
    db.prepare(query).run(questionID, question, quizID, questionOrder);
} //EXPORTED


////////// ANSWERS /////////
//adds an answer to the quiz. Returns false if the question doesn't exist and the add failed, true otherwise
function addAnswer(username, quizName, datePosted, questionNumber, answer, answerNumber) {
    //get the questionID
    let questionID = getQuestionID(username, quizName, questionNumber, datePosted);
    if (questionID === undefined) {
        return false;
    }

    //generate a unique answer ID
    let answerID = questionID + "." + answerNumber;
    
    let query = "INSERT INTO answers VALUES(?, ?, ?)";
    db.prepare(query).run(answerID, answer, questionID);
    return true;
} //EXPORTED

function addAnswerByID(questionID, answer, answerNumber) {
    let introQuery = "SELECT * FROM answers WHERE questionID = ?";
    let questionID = db.prepare(introQuery).get(questionID);
    if (questionID === undefined) {
        return false;
    }

    //generate a unique answer ID
    let answerID = questionID + "." + answerNumber;

    let query = "INSERT INTO answers VALUES(?, ?, ?)";
    db.prepare(query).run(answerID, answer, questionID);
    return true;
} //EXPORTED

//gets all the answers for a question
function getAnswersToOneQuestion(questionID) {
    let query = "SELECT * FROM answers WHERE questionID = ?";
    let results = db.prepare(query).all(questionID);
    return results;
} //EXPORTED

function getAnswer(questionID, answerNumber) {
    let answerID = questionID + "." + answerNumber;
    let query = "SELECT * FROM answers WHERE questionID = ? AND answer = ?";
    let results = db.prepare(query).all(questionID, answer);
    return results;
} //EXPORTED

function answerExists(answerID) {
    let query = "SELECT * FROM answers WHERE answerID = ?";
    let result = db.prepare(query).get(answerID);

    if (result === undefined) {
        return false;
    }
    else {
        return true;
    }
}

function idAddAnswer(answerID, answer, questionID) {
    let query = "INSERT INTO answers VALUES(?, ?, ?)";
    db.prepare(query).run(answerID, answer, questionID);
} //EXPORTED




////////// ANSWER VALUES //////////
//add an answer value
function addAnswerValueByID(answerID, result, value) {
    if (!answerExists) {
        return false;
    }

    let query = "INSERT INTO answerValues VALUES(?, ?, ?)";
    db.prepare(query).run(answerID, result, value);
    return true;
} //EXPORTED

function getAnswerValues(answerID) {
    let query = "SELECT * FROM answerValues WHERE answerID = ?";
    let results = db.prepare(query).all(answerID);
    return results;
} //EXPORTED




////////// QUIZ RESULTS //////////
function addQuizResult(quizID, result, description) {
    if (!quizExists) {
        return false;
    }

    let query = "INSERT INTO quizResults VALUES(?, ?, ?)";
    db.prepare(query).run(quizID, result, description);
    return true;
} //EXPORTED

function getQuizResults(quizID) {
    let query = "SELECT * FROM quizResults WHERE quizID = ?";
    let results = db.prepare(query).all(quizID);
    return results;
} //EXPORTED



///////// EXPORT //////////
module.exports.db = db;

module.exports.addUser = addUser;
module.exports.checkUserPassword = checkUserPassword;
module.exports.removeUser = removeUser;
module.exports.userExists = userExists;

module.exports.addQuiz = addQuiz;
module.exports.getQuizQuestions = getQuizQuestions;
module.exports.getQuizID = getQuizID;
module.exports.deleteQuiz = deleteQuiz;
module.exports.quizExists = quizExists;
module.exports.searchQuizNames = searchQuizNames;
module.exports.idAddQuiz = idAddQuiz;

module.exports.addQuestion = addQuestion;
module.exports.addQuestionByID = addQuestionByID;
module.exports.getQuestionID = getQuestionID;
module.exports.idAddQuestion = idAddQuestion;

module.exports.addAnswer = addAnswer;
module.exports.getAnswer = getAnswer;
module.exports.getAnswersToOneQuestion = getAnswersToOneQuestion;
module.exports.addAnswerByID = addAnswerByID;

module.exports.addAnswerValueByID = addAnswerValueByID;
module.exports.getAnswerValues = getAnswerValues;

module.exports.addQuizResult = addQuizResult;
module.exports.getQuizResults = getQuizResults;