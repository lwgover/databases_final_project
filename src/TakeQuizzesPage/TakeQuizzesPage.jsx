import React, { useState } from 'react';
import './TakeQuizzesPage.css';
import PropTypes from 'prop-types';
import { cppdb } from 'better-sqlite3/lib/util';
import {Link} from "react-router-dom"


async function GetQuiz(qid) {
  let quizID = {quizID: qid};
  return fetch('http://localhost:8080/TakeQuiz', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(quizID)
  })
    .then(data => data.json())
}

export default function TakeQuizzesPage() {
  const qid = sessionStorage.getItem('quizID');
  console.log(qid);
  const quizComplete =(sessionStorage.getItem('complete')==="true");
  const quizFromStorage = JSON.parse(sessionStorage.getItem('quiz'));
  console.log(quizComplete);
  const handleSubmit = async e => {
    console.log(qid);
    //e.preventDefault();
    if (qid.length >= 1&&!quizComplete) {
      console.log("setting quiz")
      const quizJSON = await GetQuiz({
        qid
      });
      if (quizJSON.length >= 1) { // change to whatever failing looks like
        console.log("setting quiz2")
        sessionStorage.setItem('quiz', quizJSON);
      }
      console.log(sessionStorage.getItem('quiz'));
    }
  }
  handleSubmit();
  console.log(sessionStorage.getItem('quiz'));
  console.log(sessionStorage.getItem('quiz'));
  console.log(quizFromStorage);

  //const quiz = handleSubmit(e);
  if (quizFromStorage == null) {
    return (
      <div className="TakeQuizzesPage-wrapper">
        <h1>It's quiz time!</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <p>which quiz id do you want to take?</p>
            <input type="text" onChange={e => setQID(e.target.value)} />
          </label>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    )
  } else {
    console.log(quizFromStorage.quiz.name); // name
    console.log(quizFromStorage.quiz.datePosted); // date posted
    console.log(quizFromStorage.questions); // questions
    console.log(quizComplete)
    //Start making quiz here!
    if ((quizFromStorage != null)&&(!quizComplete)) {
      return (
        <div className="TakeQuizzesPage-wrapper">
          <h1>{quizFromStorage.quiz.name}</h1>
          <h2>Created:{quizFromStorage.quiz.datePosted} by:{quizFromStorage.quiz.username}</h2>
          <form onSubmit={completeQuiz}>
          {getQuestions()}
          <button type="submit">Complete quiz.</button>
          </form>
          
        </div>

      )

    } else if(quizComplete){
      console.log(sessionStorage.getItem('finalResult'));
      return(
        <div className="TakeQuizzesPage-wrapper">
          <p>
              You got the result: {sessionStorage.getItem('finalResult')}
          </p>
          <Link to="/SearchQuizzes" class="nav-link"><button>Take new quiz!</button></Link>
        </div>
      )
    }else {
      return (
        <div className="TakeQuizzesPage-wrapper">
          <h1>You have a quiz ready! Refresh the page to begin!</h1>
        </div>
      )
    }
  }
  function resetPage(){
    console.log("test");
    sessionStorage.removeItem('complete');
    sessionStorage.removeItem('quiz');
    sessionStorage.removeItem('finalResult');
    location.href="searchQuizzes";

  }
  function getQuestions() {
    var questionsHTML=[];
    for (var i = 0; i < quizFromStorage.questions.length; i++) {
      var question = quizFromStorage.questions[i];
      var questionID = question.questionID;
      var answers = selectQuestionsAnswer(quizFromStorage.answers,questionID);
      var answersHTML = [];
      for (var j = 0; j < 4; j++) {
       var answerHTML = <div><input type="radio" id={answers[j].answerID} name= {questionID} value = {answers[j].answerID}></input><label>{answers[j].answer}</label></div>;
          answersHTML.push(answerHTML);
      }
      var questionHTML = <div><p>{question.question}</p><div>{answersHTML}</div></div>;
      questionsHTML.push(questionHTML);
    }
      return <div>{questionsHTML}</div>
  }
  function selectQuestionsAnswer(array,questionID){
    var answers = [];
    for(var i=0;i<array.length;i++){
      if(array[i].questionID === questionID){
        answers.push(array[i]);
      }
    }
    return answers;
  }
  function completeQuiz(){
    event.preventDefault();
    console.log(quizFromStorage);
     const results = quizFromStorage.quizResults;
     const resultNames = [];
     const resultVals = {};
     for(var i = 0;i<results.length;i++){
      var resultName = results[i].result;
      resultNames.push(resultName);
      Object.defineProperty(resultVals, resultName, {
        value: 0,
        writable:true
      })
     }
      for(var i =0; i<quizFromStorage.questions.length;i++){
        var question = quizFromStorage.questions[i];
        var questionID = question.questionID;
        var answerHTML = document.getElementsByName(questionID);
        console.log(answerHTML);
        var answerID;
        for(var j = 0;j <answerHTML.length;j++){
        if(answerHTML[j].checked){
        answerID =answerHTML[j].value;
        }
      }
      console.log(answerID);
        const answerResults = getAnswerResults(answerID);
        for(var j = 0;j<results.length;j++){
          const currentResult = resultNames[j];
          resultVals[currentResult] =(parseInt(resultVals[currentResult]) + parseInt(answerResults[currentResult]));
         }


      }
      console.log(resultVals);
      var resultArray = [];
      for(var i = 0; i<resultNames.length;i++){
        resultArray[i] = resultVals[resultNames[i]];
        console.log(typeof resultArray[i]);
      }
      console.log(resultArray);
      const max = Math.max(...resultArray);
      console.log(max);
      for(var i = 0; i<resultNames.length;i++){
        if(resultVals[resultNames[i]]===max){
          sessionStorage.setItem('finalResult',resultNames[i]);
          sessionStorage.setItem('complete',true);
        }
        location.reload();
      }
      
  }
  function getAnswerResults(answerID){
    const answerVals = quizFromStorage.answerResults;
    console.log(quizFromStorage);
    const results = quizFromStorage.results;
    var addedResults = {};
    for(var i=0;i<answerVals.length;i++){
      var answerResult = answerVals[i];
      if(answerResult.answerID===answerID){
      Object.defineProperty(addedResults, answerResult.result, {
        value: answerResult.value
      })
    }
    }
    console.log(addedResults);
  return addedResults;
  }
}
 
function Question(questionTitle) {

  const style = {
    margin: "auto",
    padding: "10% 35% 10% 15%",
    color: "black"
  }

  return <div style={style}>
    <div style={{ "fontSize": "48px" }}>
      Lots of really useful user information
    </div>
    <br />
    <form onSubmit={localStorage.clear()}>
      <div>
        <button type="submit">log out</button>
      </div>
    </form>
  </div>
}