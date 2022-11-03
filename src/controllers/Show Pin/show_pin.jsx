import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import "./show_pin.css"

function ShowPin(){
    let cookies = new Cookies();
    const host_pin = cookies.get("personal_pin");
    const exam_pin = cookies.get("exam_pin")
    let navigate = useNavigate();
    
    return (<div className="pins">
        <h2>Please Take A Pic Or Note It Down. The Students Have You Use These Pins To Attempt The Exam</h2>
        <h3 className="h31">Host Pin : {host_pin}</h3>
        <h3 className="h32"> Exam Pin : {exam_pin}</h3>
        <button onClick={()=>{navigate("/")}}>Okay, Close This Page</button>
    </div>)
}
export default ShowPin;