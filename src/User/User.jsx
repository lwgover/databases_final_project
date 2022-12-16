import { Link } from "react-router-dom"
import Parser from 'html-react-parser';

function UserPage({ username }) {
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
 async function handleSubmit(event) {
    console.log("hello");
    event.preventDefault();
    localStorage.clear();
    location.reload(false);
}

function UserStuff({ username }) {

    const style = {
        margin: "auto",
        padding: "10% 35% 10% 15%",
        color: "black"
    }

    return <div style={style}>
        <form onSubmit={handleSubmit}>
            <div>
                <button type="submit">log out</button>
            </div>
        </form>
    </div>
}

export default UserPage