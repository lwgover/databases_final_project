import {Link} from "react-router-dom"

function QuizSearchPage() {
    return <div id="searchPage">
        <script src="./quizSearch.js"></script>
        <h1> Search all quizzes! </h1>
        <span>
            <input type="text" id="searchBox"></input>
            <input type="submit" id="subButton"></input>
        </span>
        <div id="results">
            <div id="resultsChild"></div>
        </div>
    </div>
}
export default QuizSearchPage;