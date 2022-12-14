import React, {useState} from 'react';
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
    if(JSON.stringify(qid).length >= 1){
      const quizJSON = await GetQuiz({
        qid
      });
      console.log(quizJSON.quiz);
      if(JSON.stringify(quizJSON).length >= 1){ // change to whatever failing looks like
        localStorage.setItem('quiz', JSON.stringify(quizJSON));
      }
    }
  }
  handleSubmit();

  
  //const quiz = handleSubmit(e);
  if(quizFromStorage == null){
    return(
      <div className="TakeQuizzesPage-wrapper">
      <h1>It's quiz time!</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <p>which quiz id do you want to take?</p>
            <input type="text" onChange={e => setQID(e.target.value)}/>
          </label>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    )
  }else{
    console.log(quizFromStorage.quiz.name); // name
    console.log(quizFromStorage.quiz.datePosted); // date posted
    console.log(quizFromStorage.questions); // questions

    //Start making quiz here!

    if(quizFromStorage != null){
      return (
        <div className="TakeQuizzesPage-wrapper">
          <h1>{quizFromStorage.quiz.name}</h1>
          <h2>{quizFromStorage.quiz.datePosted}</h2>
          <h5>{JSON.stringify(quizFromStorage)}</h5>
        </div>
      )

    }else{
      return(
        <div className="TakeQuizzesPage-wrapper">
          <h1>You have a quiz ready! Refresh the page to begin!</h1>
        </div>
      )
    }
  }
  function Question(questionTitle) {

    const style = {
        margin: "auto",
        padding: "10% 35% 10% 15%",
        color: "black"
    }

    return <div style={style}>
        <div style={{"fontSize": "48px"}}>
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