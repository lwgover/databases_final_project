import React from "react";
import { index } from "./../index";

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
        console.log("displaying results");

        if (!(this.state.hasSearched)) {
            return "Please search for a quiz";
        }

        if (this.state.searchResults.length === 0) {
            return "No quizzes found by that name";
        }

        let results = [];
        for (let i = 0; i < searchResults.length; i++) {
            let oneResult = (<div className="quizDiv"> 
                <span className="quizName"> 
                    {searchResults[i].quizName} 
                </span>
                <span className="author">
                    Author: {searchResults[i].username};
                </span>
                <span className="datePosted">
                    Posted on: {searchResults[i].datePosted};
                </span>
                <span className="timesPlayed">
                    Times played: {searchResults[i].timesPlayed}
                </span>
            </div>);
            results.push(oneResult);
        }
        return results;
    }

    //does the actual searching
    async handleSubmit(event) {
        event.preventDefault();
        console.log("handling submit button");
        this.setState({hasSearched: true}); //mark that the user has searched at least once since the page loaded
        
        //let databaseSearch = database.searchQuizNames(this.state.value); //search the database
        let databaseSearch = await this.queryDatabase(this.state.value);

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
        .then((response) => response.json())
    }



    render() {
        return (<div id="searchQuizzes">
            <h1> Search all quizzes! </h1>
            <span>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.value} onChange={this.handleChange}></input>
                    <input type="submit" value="Submit"></input>
                </form>
            </span>
            <div id="results">
                {this.displaySearchResults()}
            </div>
        </div>)
    }

}
export default QuizSearchPage;