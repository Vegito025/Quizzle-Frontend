import React from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import "./quizexam.css"
import { useState } from "react";
import { useEffect } from "react";
import Cookies from "universal-cookie"


function QuizExam(){
    let {hostpin, exampin} = useParams();
    const [marks, setMarks] = useState(0)
    const [questions, setQuestions] = useState([])
    let cookies = new Cookies()
    let navigate = useNavigate()
    useEffect(()=>{
        Axios.post("http://127.0.0.1:5000/getexam", {hostpin, exampin})
        .then((response)=>{
            setQuestions(response.data.data)
        })
    },[])

    function submitExam(){
        Axios.post("http://127.0.0.1:5000/getsubmission", {access_token: cookies.get("access_token"), ppin: cookies.get("ppin"), qpin: cookies.get("qpin"), marks})
        .then((response)=>{
            if (response.data.success === true){
                alert("Thank you for taking this test");
                navigate("/")
            }
        })
    }
    
    
    return (
        <div className="quizexam">
            <h1>Welcome to your Quiz. Here are your Questions</h1>
            {questions.map((question)=>{
                    return(
                        <div className="quiz-questions">
                            <h1>Q. {question.qname}</h1>
                            <div className="quiz-options">
                                {question.options.map((option)=>{
                                    return(
                                        <button onClick={()=>{if(option == question.correct_option){setMarks(marks+1)}}}>{option}</button>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            <button onClick={submitExam} className="submit-button">Submit</button>
        </div>
    )
}

export default QuizExam;