import "./welcome.css"
import { Link } from "react-router-dom";


function Welcome(){
    return(
        <div>
            <h1 className="welcome-h12">QUIZZLE</h1>
            <h1 className="welcome-h1">Welcome, to the new age quiz app</h1>
            <Link to="/login" style={{textDecoration: "none", color:"black"}}><button className="login-button">Log In</button></Link>
            <Link to="/register" style={{textDecoration: "none", color:"black"}}><button className="register-button">Register</button></Link>
        </div>
    )
}


export default Welcome;