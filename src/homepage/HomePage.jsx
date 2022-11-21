import {Link} from "react-router-dom"

function LandingPageButton() {
    return <Link to="/TakeQuizzesPage" class="nav-link">
        <button class="btn btn-primary" > 
            <span style={{"font-size": "24px"}}>
                Take a Quiz!
            </span>
        </button>
    </Link>
}

function LandingFrameMessage() {

    const style = {
        margin: "auto",
        padding: "10% 35% 10% 15%",
        color: "white"
    }

    return <div style={style}>
        <div style={{"font-size": "96px"}}>
            Generic Quiz Website
        </div> 
        <div style={{"font-size": "36px"}}>
            Take quizzes and stuff!
        </div>
        <br />
        <LandingPageButton />
    </div>
}

function LandingFrame() {
    const style = {

        "background-image": `url("images/background.jpg")`,
        "background-repeat": "no-repeat",
        "background-size": "cover",
        position: "absolute",
        height: "100%",
        width: "100%"
    }

    return <div style={style}>
        <LandingFrameMessage />        
    </div>
}

function HomePage() {
    return <div>
        <LandingFrame />
    </div>
}

export default HomePage