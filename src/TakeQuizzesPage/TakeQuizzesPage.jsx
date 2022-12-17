import React, { useState } from 'react';
import './TakeQuizzesPage.css';
import PropTypes from 'prop-types';
import { cppdb } from 'better-sqlite3/lib/util';
import {Link} from "react-router-dom"
export class TakeQuizzesPage extends React.Component {
  constructor(){

      super();
      this.state={value: '',
        quiz:'{}',
          complete:false
      };
  }
  componentDidMount() {
    this.handleSubmit();
}
  render(){
    const quizComplete =(sessionStorage.getItem('complete')==="true");
    console.log(quizComplete);
    const quizFromStorage = JSON.parse(this.state.quiz);
    console.log(quizFromStorage);
    console.log(quizFromStorage);
    console.log((quizFromStorage.length>0)&&(!quizComplete));
    console.log(quizFromStorage.keys);
    if ((quizFromStorage.hasOwnProperty('quiz'))&&(!quizComplete)) {
      return (
        <div className="TakeQuizzesPage-wrapper">
          <h1>{quizFromStorage.quiz.quizName}</h1>
          <h2>Created:{quizFromStorage.quiz.datePosted} by:{quizFromStorage.quiz.username}</h2>
          <form onSubmit={e=>this.completeQuiz(quizFromStorage)}>
          {this.getQuestions(quizFromStorage)}
          <button type="submit">Complete quiz.</button>
          </form>
          
        </div>

      )

    } else if(quizComplete){
      return (
        <div className="TakeQuizzesPage-wrapper">
          <p>
              You got the result: {sessionStorage.getItem('finalResult')}
          </p>
          <Link to="/SearchQuizzes" class="nav-link"><button>Take new quiz!</button></Link>
        </div>
      );
    }else {
      return(
        <div>

          <div></div>
        </div>
      );
    }
  
  }


async obtainQuiz() {
  console.log(qid);
  await this.handleSubmit(qid,quizComplete);
  }

  async handleSubmit(){
    const quizComplete =(sessionStorage.getItem('complete')==="true");
  const qid = sessionStorage.getItem('quizID');
    if (qid.length >= 1&&!quizComplete) {
      console.log("setting quiz")
      const quizJSON = await this.GetQuiz({
        qid
    });
      
      this.setState({quiz : quizJSON});
      console.log("test2");
    }
}
  GetQuiz(qid) {
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


  

  resetPage(){
    console.log("test");
    sessionStorage.removeItem('complete');
    sessionStorage.removeItem('quiz');
    sessionStorage.removeItem('finalResult');
    location.href="searchQuizzes";

  }
 getQuestions(quizFromStorage) {
    var questionsHTML=[];
    for (var i = 0; i < quizFromStorage.questions.length; i++) {
      var question = quizFromStorage.questions[i];
      var questionID = question.questionID;
      var answers = this.selectQuestionsAnswer(quizFromStorage.answers,questionID);
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
  selectQuestionsAnswer(array,questionID){
    var answers = [];
    for(var i=0;i<array.length;i++){
      if(array[i].questionID === questionID){
        answers.push(array[i]);
      }
    }
    return answers;
  }
  completeQuiz(quizFromStorage){
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
        const answerResults = this.getAnswerResults(answerID,quizFromStorage);
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
      }
      //location.reload();
      
  }
  getAnswerResults(answerID,quizFromStorage){
    const answerVals = quizFromStorage.answerResults;
    console.log(answerID);
    const results = quizFromStorage.results;
    console.log(answerVals);
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

 
 Question(questionTitle) {

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
}
export default TakeQuizzesPage;