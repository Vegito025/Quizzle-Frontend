import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import Cookies from "universal-cookie"
import "./host.css"

function Host(){
    let navigate = useNavigate()
    const [questions, setQuestions] = useState([])
    const [question, setQuestion] = useState(null)
    const [count, setCount] = useState([])
    const [option, setOption] = useState()
    const [optionss, setOptionss] = useState([])
    const [correct, setCorrect] = useState()
    
    
    let cookies = new Cookies()
    Axios.post("http://127.0.0.1:5000/getdetail", {"access_token":cookies.get("access_token")})
    .then((response)=>{
        console.log(response.data)
        if(response.data.data.profile_status === "pending"){
            navigate("/info")
        }
    })
    
    if(cookies.get("access_token")){
        Axios.post("http://127.0.0.1:5000/getdetail", {"access_token":cookies.get("access_token")})
        .then((response)=>{
            if(response.data.data.tutorial === false){
                navigate("/instructions")
            }
        })
    }else{
        navigate("/")
    }
    function addOption(){
        if (count.length < 6){
            setCount([...count, 1])
        }else{
            alert("Can't add more than 6")
        }
    }
    function sendQuestions(){
        Axios.post("http://127.0.0.1:5000/getquestions", {access_token: cookies.get("access_token"), questions})
        .then((response)=>{
            cookies.set("exam_pin", response.data.exam_pin, {path: "/"})
            cookies.set("personal_pin", response.data.personal_pin, {path: "/"})
            navigate("/show_pin")
        })
    }
    
    return (
        <div>
            <div className="quiz-box">
                <h1 className="quiz-head">Enter Your Questions</h1>
                {questions.map((question)=>{
                    return(
                        <div className="quiz-questions">
                            <h1>Q. {question.qname}</h1>
                            <div className="quiz-options">
                                {question.options.map((option)=>{
                                    return(
                                        <button>{option}</button>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
                <div className="quiz-question-input">
                    <input type="text" placeholder="Enter Your Question Here" className="quiz-input" onChange={(event)=>{setQuestion(event.target.value)}}/>
                    <div className="quiz-option-2">
                    {count.map((c)=>{
                        return (
                                <label htmlFor="">
                                    <input type="text" placeholder="Enter Your Option" className="quiz-indi-option" onChange={(event)=>{setOption(event.target.value); }} />
                                    <button style={{backgroundColor:"lightgreen"}} onClick={()=>{optionss.push(option); alert("Option Saved");}}>Save Option</button>
                                </label>
                                
                            )
                    })}
                    <button onClick={addOption} style={{backgroundColor:"blue"}}>Add Option</button>
                    <button style={{backgroundColor:"lightgreen"}} onClick={()=>{questions.push({"qname": question, "options": optionss, "correct_option": correct}); setQuestion(null); setCount([]); setOptionss([]); setCorrect(null); console.log(questions)}}>Save</button>
                    </div>
                    <input type="text" name="" id="" placeholder="Please Specify The Correct Option (Please Check The Spelling While Typing)" className="quiz-input" onChange={(event)=>{setCorrect(event.target.value)}}/>
                    
                </div>
                <button className="submit-button" onClick={sendQuestions}>Submit</button>
            </div>
            
        </div>
    )
}

export default Host;