import React from "react";
import { Link } from "react-router-dom"
import Parser from 'html-react-parser';

export class UserPage extends React.Component {
    constructor() {
        super();
        this.state = {
            username: null,
            quizzes: null,
            displayQuiz: false
        };

        this.queryDatabase = this.queryDatabase.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setUsername = this.setUsername.bind(this);
        this.handleQuizzesSubmit = this.handleQuizzesSubmit.bind(this);
        this.formatResult = this.formatResult.bind(this);
    }


    UserStuff() {
        const style = {
            margin: "auto",
            padding: "10% 35% 10% 15%",
            color: "black"
        }

        return <div style={style}>
            <form onSubmit={this.handleSubmit}>
                <div>
                    <button type="submit">log out</button>
                </div>
            </form>
        </div>
    }


    async handleSubmit(event) {
        event.preventDefault();
        localStorage.clear();
        location.reload(false);
    }

    async handleQuizzesSubmit(event) {
        event.preventDefault();

        //let databaseSearch = database.searchQuizNames(this.state.value); //search the database
        let databaseSearch = await this.queryDatabase(this.state.value);


        this.setState({ quizzes: databaseSearch, displayQuiz: true });
    }

    displayUserQuizzes() {
        if (!(this.state.displayQuiz)) {
            return <div></div>;
        }
        if (this.state.quizzes === null) {
            return (<div>You have not made any quizzes</div>);
        }

        let results = [];
        for (let i = 0; i < this.state.quizzes.length; i++) {
            let oneResult = this.formatResult(this.state.quizzes[i]);
            results.push(oneResult);
        }
        return results;
    }


    formatResult(quiz) {
        return (
            <div className="quizDiv" key={quiz.quizID}>
                <span className="quizName">
                    {quiz.quizName}
                </span>
                <span className="author">
                    Author: {quiz.username};
                </span>
                <span className="datePosted">
                    Posted on: {quiz.datePosted};
                </span>
                <span className="timesPlayed">
                    Times played: {quiz.timesPlayed}
                </span>
                <Link to="/TakeQuizzesPage" class="nav-link">
                    <button type="button" onClick={sessionStorage.setItem('quizID', quiz.quizID)}>
                        Take Quiz
                    </button>
                </Link>
            </div>);
    }


    setUsername() {
        let user = localStorage.getItem('user');
        user = user.split('"');
        user = user[3];
        this.setState({ username: user });
    }

    queryDatabase() {
        let searchTerm = { searchTerm: this.state.username };

        return fetch('http://localhost:8080/UsersQuizzes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(searchTerm)
        })
            .then(data => data.json())
    }


    componentDidMount() {
        this.setUsername();
    }

    render() {
        const style = {
            margin: "auto",
            padding: "0% 5% 10% 5%",
            color: "Black"
        }
        return (
            <div style={style}>
                <div style={{ "fontSize": "96px" }}>
                    <p>{this.state.username}</p>
                </div>
                <div id="userStuff">
                    {this.UserStuff()}
                </div>
                <div id="quizzes">
                    <form onSubmit={this.handleQuizzesSubmit}>
                        <div>
                            <button type="submit">Display my quizzes</button>
                        </div>
                    </form>
                    <div>
                        {this.displayUserQuizzes()}
                    </div>
                </div>
            </div>)
    }

}

//export it
export default UserPage