import {Link} from "react-router-dom"

function LandingPageButton() {
    return <Link to="/TakeQuizzesPage" class="nav-link">
        <button class="btn btn-primary" > 
            <span style={{"fontSize": "24px"}}>
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
        <div style={{"fontSize": "96px"}}>
            Nostalgic Quiz Website
        </div> 
        <div style={{"fontSize": "36px"}}>
            Take quizzes and stuff!
        </div>
        <br />
        <LandingPageButton />
    </div>
}

function LandingFrame() {
    const style = {

        "backgroundImage": `url("images/background.jpg")`,
        "backgroundRepeat": "no-repeat",
        "backgroundSize": "cover",
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