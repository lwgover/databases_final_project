import React from "react";
import { Link } from "react-router-dom"
import Parser from 'html-react-parser';

export class UserPage extends React.Component {
    constructor() {
        super();
        this.state = {
            username: null,
            quizzes: []
        };

        this.queryDatabase = this.queryDatabase.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setUsername = this.setUsername.bind(this);
        this.handleQuizzesSubmit = this.handleQuizzesSubmit.bind(this);
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
        console.log("hello");
        event.preventDefault();
        localStorage.clear();
        location.reload(false);
    }

    async handleQuizzesSubmit(event) {
        event.preventDefault();
        if (this.state.value === "") {
            return;
        }

        //let databaseSearch = database.searchQuizNames(this.state.value); //search the database
        let databaseSearch = await this.queryDatabase(this.state.value);

        console.log(databaseSearch);

        if (databaseSearch === null) { //if the search didn't find anything,
            this.setState({ searchResults: [] }); //set the results to an empty array
        }

        else {
            this.setState({ quizzes: databaseSearch });
        }

    }

    async displayUserQuizzes() {
        if (this.state.quizzes === null) {
            return "You have not made any quizzes";
        }

        let results = [];
        for (let i = 0; i < this.state.quizzes.length.length; i++) {
            let oneResult = formatResult(this.state.quizzes[i]);
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
        console.log(this.state.username);
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
                    {this.state.username}
                </div>
                <div id="userStuff">
                    {this.UserStuff()}
                </div>
                <div id="quizzes">
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <button type="submit">Display my quizzes</button>
                        </div>
                    </form>
                    {this.displayUserQuizzes()}
                </div>
            </div>)
    }

}

//export it
export default UserPage