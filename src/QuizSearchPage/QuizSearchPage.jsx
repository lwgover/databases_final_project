import React from "react";
import { index } from "./../index";
import './QuizSearchPage.css';
import {Link} from "react-router-dom"

export class QuizSearchPage extends React.Component {
    constructor(){
        super();
        this.state={value: '',
            searchResults: [], 
            hasSearched: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.queryDatabase = this.queryDatabase.bind(this);
    }

    displaySearchResults() {
        sessionStorage.removeItem('qid');
        //console.log("displaying results");

        if (!(this.state.hasSearched)) {
            return "Please search for a quiz";
        }

        if (this.state.searchResults.length === 0) {
            return "No quizzes found by that name";
        }

        let results = [];
        for (let i = 0; i < this.state.searchResults.length; i++) {
            let oneResult = (
                <div className="quizDiv" key={this.state.searchResults[i].quizID}> 
                    <span className="quizName"> 
                        {this.state.searchResults[i].quizName} 
                    </span>
                    <span className="author">
                        Author: {this.state.searchResults[i].username};
                    </span>
                    <span className="datePosted">
                        Posted on: {this.state.searchResults[i].datePosted};
                    </span>
                    <span className="timesPlayed">
                        Times played: {this.state.searchResults[i].timesPlayed}
                    </span>
                    <Link to="/TakeQuizzesPage" class="nav-link">
                        <button type="button" onClick={e=>this.replaceQuizID(i)}>
                            Take Quiz
                        </button>
                    </Link>
                </div>);
            results.push(oneResult);
        }
        return results;
    }
    replaceQuizID(i){
        console.log(i);
        sessionStorage.removeItem('quizID');
        sessionStorage.setItem('quizID',this.state.searchResults[i].quizID);
    }
    //does the actual searching
    async handleSubmit(event) {
        event.preventDefault();
        if (this.state.value === "") {
            return;
        }
        sessionStorage.setItem('complete',false);
        sessionStorage.removeItem('quiz');
        this.setState({hasSearched: true}); //mark that the user has searched at least once since the page loaded
        
        //let databaseSearch = database.searchQuizNames(this.state.value); //search the database
        let databaseSearch = await this.queryDatabase(this.state.value);

        console.log(databaseSearch);

        if (databaseSearch === null) { //if the search didn't find anything,
            this.setState({searchResults: []}); //set the results to an empty array
        }

        else {
            this.setState({searchResults: databaseSearch});
        }
        
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    queryDatabase(quizName) {
        console.log("query databse with " + quizName);

        let searchTerm = {searchTerm: quizName};

        return fetch('http://localhost:8080/SearchQuizzes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(searchTerm)
        })
        .then(data => data.json())
    }
    

    render() {
        return (
            <div id="searchQuizzes">
                <h1> Search all quizzes! </h1>
                <div id="searchBar">
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" value={this.state.value} onChange={this.handleChange}></input>
                        <input type="submit" value="Submit"></input>
                    </form>
                </div>
                <div id="results">
                    {this.displaySearchResults()}
                </div>
            </div>)
    }

}
export default QuizSearchPage;