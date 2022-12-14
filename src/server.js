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
const { db } = require('./database');
app.use('/TakeQuiz', (req, res) => {
  let quizID = req.body.quizID.qid;
  if(database.checkQuizID(quizID)){
    let quiz = database.getQuizInfo(quizID);
    res.json(quiz);
  }else{
    res.send({
      user: "invalid User"
    });
  }
});

app.use('/MakeQuiz', (req, res) => {
  if(!true){
    //res.send();
  }else{
    res.send({
      status: "Quiz was recieved or whatever"
    });
  }
});

app.use('/CreateUser', (req, res) => {
  if(database.addUser(req.body.username,req.body.password)){
    res.send({
        user:req.body.username
    });
  }else{
    console.log('failed');
  }
});


app.use('/SearchQuizzes', (req, res) => {
  let searchTerm = req.body.searchTerm;
  let results = database.searchQuizNames(searchTerm);

  if (results === undefined) {
    results = null;
  }

  res.json(results);
});

app.use('/UsersQuizzes',(req, res) => {
  let searchTerm = req.body.searchTerm;
  let results = database.searchQuizByUser(searchTerm);

  if (results === undefined || results == []) {
    results = null;
  }

  res.json(results);
})


app.listen(8080, () => console.log('API is running on http://localhost:8080/'));

function submitQuizJSON(quiz){
  if(!database.idAddQuiz(quiz.quiz.quizID,quiz.quiz.name,quiz.quiz.username,quiz.quiz.datePosted,0)){// uninvert later
    return 'failed at addQuiz: ' + quiz.quiz.username;
  }
  questions = JSON.parse(JSON.stringify(quiz.questions));
  for(i in questions){
    if(!database.idAddQuestion(questions[i].questionID, questions[i].question,quiz.quiz.quizID,questions[i].questionOrder)){ 
      return 'failed at addQuestion: ' + i;
    }
  }
  answers = JSON.parse(JSON.stringify(quiz.answers));
  for(i in answers){
    if(!database.idAddAnswer(answers[i].answerID, answers[i].answer, answers[i].questionID )){
      return 'failed at addAnswer: ' + answers[i].questionID;
    }
  }
  quizResults = JSON.parse(JSON.stringify(quiz.quizResults));
  for(i in quizResults){
    if(!database.addQuizResult(quiz.quiz.quizID, quizResults[i].result, quizResults[i].result)){
      return 'failed at addResult: ' + answers[i].answerOrder;
    }
  }
  answerValues = JSON.parse(JSON.stringify(quiz.answerValues));
  for(i in answerValues){
    if(!database.addAnswerValueByID(answerValues[i].answerID, answerValues[i].result, answerValues[i].value,quiz.quiz.quizID)){
      return 'failed at addAnswerValue: ' + answerValues[i].result;
    }
  }
  return 'success';
}