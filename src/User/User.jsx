import {Link} from "react-router-dom"
import Parser from 'html-react-parser';

function getUser(user){
    return user;
}

function UserPage({ username }) {
    const style = {
        margin: "auto",
        padding: "0% 5% 10% 5%",
        color: "Black"
    }

    return <div style={style}>
        <div style={{"fontSize": "96px"}}>
            {Parser(getUser(username))}
        </div> 
        <UserStuff />
    </div>
}

function UserStuff() {

    const style = {
        margin: "auto",
        padding: "10% 35% 10% 15%",
        color: "white"
    }

    return <div style={style}>
        <div style={{"fontSize": "96px"}}>
            User Info
        </div> 
        <br />
    </div>
}

export default UserPage