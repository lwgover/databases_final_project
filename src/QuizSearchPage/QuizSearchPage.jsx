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
    }

    displaySearchResults() {
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
                    Posted on: {searchResults.datePosted};
                </span>
            </div>);
            results.push(oneResult);
        }
        return results;
    }

    //does the actual searching
    async handleSubmit(event) {
        
        this.setState({hasSearched: true}); //mark that the user has searched at least once since the page loaded
        
        //let databaseSearch = database.searchQuizNames(this.state.value); //search the database
        let databaseSearch = await queryDatabase(this.state.value);

        if (databaseSearch === undefined) { //if the search didn't find anything,
            this.setState({searchResults: []}); //set the results to an empty array
        }

        else {
            this.setState({searchResults: databaseSearch});
        }
        

        //This was present in the example I looked at
        event.preventDefault();
        
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    queryDatabase(quizName) {
        return fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(quizName)
        })
        .then((response) => response.json())
        .then((data) => {return data});
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