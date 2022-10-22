import "./welcome.css"
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';

function Welcome(){
    const cookies = new Cookies();
    let logged_in = false

    if (cookies.get("access_token")){
        logged_in = true;
    }
    return(
        <div>
            <h1 className="welcome-h12">QUIZZLE</h1>
            <h1 className="welcome-h1">Welcome, to the new age quiz app</h1>
            {logged_in ? <Link to="/attendquiz" style={{textDecoration: "none", color:"black"}}><button className="login-button2">Attend Quiz</button></Link> : <Link to="/login" style={{textDecoration: "none", color:"black"}}><button className="login-button">Log In</button></Link>}
            {logged_in ? <Link to="/hostquiz" style={{textDecoration: "none", color:"black"}}><button className="register-button2">Host Quiz</button></Link> : <Link to="/register" style={{textDecoration: "none", color:"black"}}><button className="register-button">Register</button></Link>}
        </div>
    )
}


export default Welcome;