import React, { useState } from 'react';
import './TakeQuizzesPage.css';
import PropTypes from 'prop-types';


async function GetQuiz(qid) {
  return fetch('http://localhost:8080/TakeQuiz', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(qid)
  })
    .then(data => data.json())
}

export default function TakeQuizzesPage() {
  const qid = localStorage.getItem('qid')
  const quizString = localStorage.getItem('quiz');
  const quizFromStorage = JSON.parse(quizString);
  console.log(quizFromStorage);

  const handleSubmit = async e => {
    //e.preventDefault();
    if (JSON.stringify(qid).length >= 1) {
      const quizJSON = await GetQuiz({
        qid
      });
      console.log(quizJSON.quiz);
      if (JSON.stringify(quizJSON).length >= 1) { // change to whatever failing looks like
        localStorage.setItem('quiz', JSON.stringify(quizJSON));
      }
    }
  }
  handleSubmit();


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

    //Start making quiz here!

    if (quizFromStorage != null) {
      return (
        <div className="TakeQuizzesPage-wrapper">
          <h1>{quizFromStorage.quiz.name}</h1>
          <h2>Created:{quizFromStorage.quiz.datePosted} by:{quizFromStorage.quiz.username}</h2>
          <h5>{JSON.stringify(quizFromStorage)}</h5>
          <div>
          {getQuestions()}
          </div>
        </div>

      )

    } else {
      return (
        <div className="TakeQuizzesPage-wrapper">
          <h1>You have a quiz ready! Refresh the page to begin!</h1>
        </div>
      )
    }
  }
  function getQuestions() {
    var questionsHTML=[];
    for (var i = 0; i < quizFromStorage.questions.length; i++) {
      var question = quizFromStorage.questions[i];
      var questionID = question.questionID;
      var answers = selectQuestionsAnswer(quizFromStorage.answers,questionID);
      var answersHTML = [];
      for (var j = 0; j < 4; j++) {
       var answerHTML = <div><input type="radio" id={answers[j].answerID} name= {questionID} value = {answers[j].answerID}></input><label for={answers[j].answerID}>{answers[j].answer}</label></div>;
          answersHTML.push(answerHTML);
      }
      var questionHTML = <div><p>{question.question}</p><div>{answersHTML}</div></div>;
      questionsHTML.push(questionHTML);
    }
    console.log(questionsHTML);
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