import React, { useState } from "react";
import Cookies from "universal-cookie"
import { useNavigate } from "react-router-dom";
import Axios from "axios"
import Dropdown from 'react-bootstrap/Dropdown';

function Info(){
    let navigate = useNavigate()
    const cookies = new Cookies()
    if(!cookies.get("access_token")){
        navigate("/")
    }
    const [option, setOption] = useState(null)
    const [college, setCollege] = useState(null)
    const [grade, setGrade] = useState(null)
    const [board, setBoard] = useState(null)
    const [rollno, setRollno] = useState(null)
    const [error, setError] = useState(null);
    const [errormsg, setErrormsg] = useState(null)




    function sendUser(){
        if(option && college && grade && board && rollno){
            Axios.post("http://127.0.0.1:5000/getinfo", {option, college, grade, board, rollno, status: "complete", access_token: cookies.get("access_token")})
            .then((response)=>{
                if(response.data.success === true){
                    navigate("/")
                }
            })
        }else{
            setError(true)
            setErrormsg("Please enter all the details")
        }
        
    }

    return (
        <div>
            
            <h1 className="info-heading">A Little Bit Of Info To Continue</h1>
            <Dropdown style={{marginLeft: "30%", marginTop:"2%"}}>
                <Dropdown.Toggle variant="light" id="dropdown-basic" style={{paddingRight: "10%", paddingLeft:"10%",textAlign:"center"}}>
                    {option ? option : "Are You A?"}
                </Dropdown.Toggle>

                <Dropdown.Menu style={{paddingRight: "8.5%", paddingLeft:"8%", marginLeft: "0.5%"}}>
                    <Dropdown.Item style={{textAlign:"center"}} onClick={((event)=>{setOption("Student")})}>Student</Dropdown.Item>
                    <Dropdown.Item style={{textAlign:"center"}} onClick={((event)=>{setOption("Professor")})}>Professor</Dropdown.Item>
                    <Dropdown.Item style={{textAlign:"center"}} onClick={((event)=>{setOption("Interviewer")})}>Interviewer</Dropdown.Item>
                    <Dropdown.Item style={{textAlign:"center"}} onClick={((event)=>{setOption("Interviewee")})}>Interviewee</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <input type="text" placeholder="Institution Name" className="info-input" onChange={(event)=>{setCollege(event.target.value)}}/>
            <input type="text" placeholder="Class Grade Or Current Year" className="info-input2" onChange={(event)=>{setGrade(event.target.value)}}/>
            <input type="text" placeholder="Board Or Branch" className="info-input2" onChange={(event)=>{setBoard(event.target.value)}}/>
            <input type="text" placeholder="Roll Number" className="info-input2" onChange={(event)=>{setRollno(event.target.value)}}/>
            {error ? <p className="error">*{errormsg}</p> : null}
            
            <button className="login-submit" style={{marginTop: "5%"}} onClick={sendUser}>Submit</button>
        </div>
    )
}

export default Info;