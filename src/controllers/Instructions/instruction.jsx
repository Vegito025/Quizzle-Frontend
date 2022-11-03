import React from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie"
import "./instruction.css"

function Instruction(){
    let cookies = new Cookies();
    let navigate = useNavigate()
    if(!cookies.get("access_token")){
        navigate("/")
    }
    function sendUser(){
        Axios.post("http://127.0.0.1:5000/finishtutor", {access_token: cookies.get("access_token"), tutorial: true})
        .then((response)=>{
            if(response.data.success === true){
                navigate("/hostquiz")
            }
        })
    }
    
    return(
        <div>
            <h1 className="instro-head">* Some Instructions To Be Noted Before Creating A Quiz</h1>
            <ul className="instro-list">
                <li className="instro-ilist">There will be two code provided to attend the examination.</li>
                <li className="instro-ilist">The host should note the above two codes and send it to the quiz attempters.</li>
                <li className="instro-ilist">The attempters have to provide these two codes mandetorily or the quiz will not be commensed</li>
                <li className="instro-ilist">The 1st code will be host code which will be common for all quizez hosted by the same host</li>
                <li className="instro-ilist">The 2nd code will be the security code used to confirm and validate the quiz and the attempter.</li>
                <li className="instro-ilist">The questions can have multiple options ranging from 2 - 6 according to the examiner.</li>
            </ul>
            <p className="instro-para">If you understood all the instructions you can continue to the next page by clicking the "NEXT" button</p>
            <button className="instro-button" onClick={sendUser}>NEXT</button>
        </div>
    )
}

export default Instruction;