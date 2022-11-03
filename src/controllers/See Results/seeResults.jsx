import React from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Cookies from "universal-cookie"


function SeeResults(){
    let {hostpin, exampin} = useParams();
    const [questions, setQuestions] = useState([])
    let cookies = new Cookies()
    const [loading, setLoading] = useState(true)
    
    useEffect(()=>{
        Axios.post("http://127.0.0.1:5000/getresults", {hostpin, exampin})
        .then((response)=>{
            setQuestions(response.data.data);
            setLoading(false)
        })
    })
    

    
    
    
    return (
        
        <div className="quizexam">
            {loading ? <h1>Please Wait</h1> : 
            <div className="quiz-questions" >
                {questions.map((question)=>{
                    return(
                        <div style={{backgroundColor: "white"}}>
                            <h1 style={{color: "black"}}>STUDENT  NAME : {question.name.toUpperCase()}</h1>
                            <h1 style={{color: "black"}}>COLLEGE NAME : {question.college.toUpperCase()}</h1>
                            <h1 style={{color: "black"}}>ROLL NUMBER : {question.roll_no.toUpperCase()}</h1>
                            <h1 style={{color: "black"}}>GRADE : {question.grade}</h1>
                            <h1 style={{color: "black", paddingBottom: "2%"}}>MARKS : {question.marks}</h1>
                        </div>
                    )
                })}
            </div>
        }
        </div>
    )
}

export default SeeResults;