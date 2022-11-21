import {Link} from "react-router-dom"

function Header() {
    return (
        <nav class="navbar">
            <div class="container-fluid">

                <div>Generic Quiz Website!</div>

                <ul class="nav nav-tabs">

                    <li class="nav-item">
                        <Link to="/" class="nav-link">Home</Link>
                    </li>

                    <li class="nav-item">
                        <Link to="/TakeQuizzesPage" class="nav-link">Take Quizzes</Link>
                    </li>

                    <li class="nav-item">
                        <Link to="/UserPage" class="nav-link">User</Link>
                    </li>
                    <li class="nav-item">
                        <Link to="/login/login.html" class="nav-link">login</Link>
                    </li>

                </ul>
            </div>
        </nav>
    );
}

export default Header;
