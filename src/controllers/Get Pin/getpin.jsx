import React, { useState } from "react";
import Cookies from "universal-cookie"
import { useNavigate } from "react-router-dom";
import Axios from "axios"


function GetPin(){
    const cookies = new Cookies()
    let navigate = useNavigate()
    const [ppin, setPpin] = useState(null)
    const [qpin, setQpin] = useState(null)

    if(!cookies.get("access_token")){
        navigate("/")
    }

    Axios.post("http://127.0.0.1:5000/getdetail", {"access_token":cookies.get("access_token")})
    .then((response)=>{
        console.log(response.data)
        if(response.data.data.profile_status === "pending"){
            navigate("/info")
        }
    })
    function sendPin(){
        Axios.post("http://127.0.0.1:5000/getpin", {ppin, qpin})
        .then((response)=>{
            if(response.data.success === true){
                cookies.set("ppin", ppin, {path: "/"})
                cookies.set("qpin", qpin, {path: "/"})
                navigate(`/results/${ppin}/${qpin}`)
            }
        })
    }
    return (
        <div>
            <h1 className="attend-heading">Welcome, You May Proceed To  Attend The Quiz</h1>
            <h4 className="attend-heading2">Please Enter The Details Correctly To Validate It</h4>
            <input type="text" placeholder="Please Type The Personal Pin Of Your Host" className="attempt-per-pin" onChange={(event)=>{setPpin(event.target.value)}}/>
            <input type="text" placeholder="Please Type The Quiz Pin" className="attempt-pin" onChange={(event)=>{setQpin(event.target.value)}}/>
            <button className="attempt-submit" onClick={sendPin}>Submit</button>
        </div>
    )
}

export default GetPin;