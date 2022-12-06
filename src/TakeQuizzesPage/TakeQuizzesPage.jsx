import React, {useState} from 'react';
import './TakeQuizzesPage.css';
import PropTypes from 'prop-types';

function getLocalQuizID(){

}

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

export default function TakeQuizzesPage({ setToken }) {
  const [qid, setQID] = useState();
  const qidString = localStorage.getItem('qid');
  const qidFromStorage = JSON.parse(qidString);
  console.log(qidFromStorage);

  const handleSubmit = async e => {
    e.preventDefault();
    const quizJSON = await GetQuiz({
      qid
    });
    console.log(quizJSON.quiz);
    localStorage.setItem('qid', JSON.stringify(qid));
    localStorage.setItem('quiz', JSON.stringify(quizJSON));
  }

  
  //const quiz = handleSubmit(e);
  if(qidFromStorage == null){
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
    const quizString = localStorage.getItem('quiz');
    const quizFromStorage = JSON.parse(quizString);
    console.log(quizFromStorage.quiz.name); // name
    console.log(quizFromStorage.quiz.datePosted); // date posted
    console.log(quizFromStorage.questions); // questions

    if(quizFromStorage != null){
      return (
        <div className="TakeQuizzesPage-wrapper">
          <h1>You have a quiz ready! Look in the console to see the quiz info</h1>
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
}