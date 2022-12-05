import {Link} from "react-router-dom"

function Header() {
    return (
        <nav class="navbar">
            <div class="container-fluid">
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <Link to="/" class="nav-link">Generic Quiz Website</Link>
                    </li>
                </ul>
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <Link to="/TakeQuizzesPage" class="nav-link">Take Quizzes</Link>
                    </li>

                    <li class="nav-item">
                        <Link to="/makeQuiz" class="nav-link">Make a Quiz</Link>
                    </li>

                    <li class="nav-item">
                        <Link to="/SearchQuizzes" class="nav-link">Search Quizzes</Link>
                    </li>

                    <li class="nav-item">
                        <Link to="/User" class="nav-link">User</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Header;
