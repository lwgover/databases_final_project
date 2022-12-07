const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const path = require('path');
const dbPath = path.resolve(__dirname, 'database.js')
const database = require(dbPath);

app.use(cors());
app.use(bodyParser.json());

app.use('/login', (req, res) => {
  console.log(req.body)
  console.log(req.body.username)
  console.log(req.body.password)

  if(database.checkUserPassword(req.body.username,req.body.password)){  //user and password
    res.send({
      user: req.body.username
    });
  }else{
    res.send({
      user: "Invalid User"
    });
  }
});

const data = require('./examplequiz.json');
const { db } = require('./database');
app.use('/TakeQuiz', (req, res) => {
  console.log(req.body);
  //console.log(req.body.username)
  //console.log(req.body.password)

  if(true){
    res.send(data);
  }else{
    res.send({
      user: "invalid User"
    });
  }
});

app.use('/MakeQuiz', (req, res) => {
  //try{
  console.log(req.body);
  submitQuizJSON(req.body);
  //}

  if(!true){
    //res.send();
  }else{
    res.send({
      status: "Quiz was recieved or whatever"
    });
  }
});


app.use('/SearchQuizzes', (req, res) => {
  console.log("request recieved");

  let searchTerm = req.body.searchTerm;
  let results = database.searchQuizNames(searchTerm);

  if (results === undefined) {
    results = null;
  }

  res.json(results);
});

app.listen(8080, () => console.log('API is running on http://localhost:8080/'));

function submitQuizJSON(quiz){
  console.log("in!")
  console.log(quiz);
  try{
    database.addQuiz(quiz.quiz.username,quiz.quiz.name,quiz.quiz.datePosted);
  }catch(e) {
    return 'failed at addQuiz: ' + e;
  }
  questions = JSON.parse(JSON.stringify(quiz.questions));
  for(i in questions){
    console.log(questions[i].question);
    console.log(questions[i].questionOrder);
    try{
      console.log("success! " + database.addQuestion(quiz.quiz.username, quiz.quiz.quizName, quiz.quiz.datePosted, questions[i].questionOrder, questions[i].question));
    }catch(e) {
      return 'failed at addQuestion: ' + e;
    }
  }
  answers = JSON.parse(JSON.stringify(quiz.answers));
  for(i in answers){
    console.log(answers[i].answer);
    console.log(answers[i].questionID);
    try{
      //database.addAnswer(quiz.quiz.username, quiz.quiz.quizName, quiz.quiz.datePosted, answers[i].questionID, answers[i].answer);
    }catch(e) {
      return 'failed at addAnswer: ' + e;
    }
  }
  quizResults = JSON.parse(JSON.stringify(quiz.quizResults));
  for(i in quizResults){
    console.log(quizResults[i].quizID);
    console.log(quizResults[i].result);
    console.log(quizResults[i].description);
    try{
      database.addAnswer(quiz.quiz.username, quiz.quiz.quizName, quiz.quiz.datePosted, answers[i].answerOrder, answers[i].answer);
    }catch(e) {
      return 'failed at addAnswer: ' + e;
    }
  }
  answerValues = JSON.parse(JSON.stringify(quiz.answerValues));
  for(i in answerValues){
    console.log(answerValues[i].answerID);
    console.log(answerValues[i].result);
    console.log(answerValues[i].value);
  }
  return 'success';
}