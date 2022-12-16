import { Link } from "react-router-dom"
import Parser from 'html-react-parser';

function UserPage({ username }) {
    const style = {
        margin: "auto",
        padding: "0% 5% 10% 5%",
        color: "Black"
    }

    return <div style={style}>
        <div style={{ "fontSize": "96px" }}>
            { }
        </div>
        <UserStuff />
        <UserQuizzes username={username} />
    </div>
}
async function handleSubmit(event) {
    console.log("hello");
    event.preventDefault();
    localStorage.clear();
    location.reload(false);
}

function UserStuff({ username }) {

    const style = {
        margin: "auto",
        padding: "10% 35% 10% 15%",
        color: "black"
    }

    return <div style={style}>
        <form onSubmit={handleSubmit}>
            <div>
                <button type="submit">log out</button>
            </div>
        </form>
    </div>
}


//stuff for displaying the user quizzes
async function UserQuizzes(props) {
    //do the fetch, hopefully
    let searchResults = getQuizzes(props.username)
    
    //if the search results were undefined, stop (return a blank div)
    if (searchResults === undefined) {
        return <div></div>
    }

    //otherwise, make an array
    let quizzes = [];
    for (let i = 0; i < searchResults.length; i++) {
        let oneResult = <oneResult quiz={searchResults[i]} />
        quizzes.push(oneResult);
    }
}

function oneResult(props) {
    return <div className="quizDiv" key={props.quiz.quizID}>
        <span className="quizName">
            {props.quiz.quizName}
        </span>
        <span className="author">
            Author: {props.quiz.username};
        </span>
        <span className="datePosted">
            Posted on: {props.quiz.datePosted};
        </span>
        <span className="timesPlayed">
            Times played: {props.quiz.timesPlayed}
        </span>
        <Link to="/TakeQuizzesPage" class="nav-link">
            <button type="button" onClick={sessionStorage.setItem('quizID', props.quiz.quizID)}>
                Take Quiz
            </button>
        </Link>
    </div>
}

async function getQuizzes(username) {
    let searchTerm = { searchTerm: username };

    return fetch('http://localhost:8080/UsersQuizzes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(searchTerm)
    })
        .then(data => data.json())
}

//export it
export default UserPage