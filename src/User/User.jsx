import {Link} from "react-router-dom"

function UserPage() {
    const style = {
        margin: "auto",
        padding: "10% 5% 0% 15%",
        color: "Black"
    }

    return <div style={style}>
        <div style={{"font-size": "96px"}}>
            THIS WILL BE YOUR USERNAME
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
        <div style={{"font-size": "96px"}}>
            User Info
        </div> 
        <br />
    </div>
}

export default UserPage