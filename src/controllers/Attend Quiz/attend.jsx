import React from "react";
import Cookies from "universal-cookie"
import { useNavigate } from "react-router-dom";
import Axios from "axios"

function Attend(){
    const cookies = new Cookies()
    let navigate = useNavigate()

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
    return (
        <div>
            
        </div>
    )
}

export default Attend;