import { Link } from "react-router-dom"
import Parser from 'html-react-parser';

export class QuizSearchPage extends React.Component {
    constructor(){
        super();
        this.state={
        };

        this.UserPage = this.UserPage.bind(this);
        this.UserStuff = this.UserStuff.bind(this);
        this.displayUserResults = this.displayUserResults.bind(this);
        this.queryDatabase = this.queryDatabase.bind(this);
    }

    UserPage({ username }) {
        const style = {
            margin: "auto",
            padding: "0% 5% 10% 5%",
            color: "Black"
        }

        return <div style={style}>
            <div style={{ "fontSize": "96px" }}>
                {Parser(username)}
            </div>
            <UserStuff />
        </div>
    }

    UserStuff({ username }) {

        const style = {
            margin: "auto",
            padding: "10% 35% 10% 15%",
            color: "black"
        }

        return <div style={style}>
            <div style={{ "fontSize": "48px" }}>
                {this.displayUserResults(username)}
            </div>
            <br />
            <form onSubmit={localStorage.clear()}>
                <div>
                    <button type="submit">log out</button>
                </div>
            </form>
        </div>
    }

    async displayUserResults(username) {
        if (username === "") {
            return;
        }

        //let databaseSearch = database.searchQuizNames(this.state.value); //search the database
        let databaseSearch = await this.queryDatabase(username);

        console.log(databaseSearch);

        if (databaseSearch === null) { //if the search didn't find anything,
            this.setState({ searchResults: [] }); //set the results to an empty array
        }

        else {
            this.setState({ searchResults: databaseSearch });
        }
    }

    queryDatabase(username) {
        console.log("query databse with " + username);

        let searchTerm = { searchTerm: username };

        return fetch('http://localhost:8080/SearchUsernames', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(searchTerm)
        })
            .then(data => data.json())
    }
}

export default UserPage