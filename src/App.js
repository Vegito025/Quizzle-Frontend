import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import React from "react";
import Home from "./controllers/Home/home"
import Register from "./controllers/Auth/register";
import Login from "./controllers/Auth/login";
import Host from "./controllers/Host Quiz/host";
import Attend from "./controllers/Attend Quiz/attend";
import Info from "./controllers/Auth/info";
import Instruction from "./controllers/Instructions/instruction";
import ShowPin from "./controllers/Show Pin/show_pin";
import QuizExam from "./controllers/Quiz Exam/quizexam";
import GetPin from "./controllers/Get Pin/getpin";
import SeeResults from "./controllers/See Results/seeResults";
function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/instructions" element={<Instruction/>}/>
            <Route path="/hostquiz" element={<Host/>}/>
            <Route path="/attendquiz" element={<Attend/>}/>
            <Route path="/info" element={<Info/>}/>
            <Route path="/showpin" element={<ShowPin/>}/>
            <Route path="/quiz/:hostpin/:exampin" element={<QuizExam/>}/>
            <Route path="/getpin" element={<GetPin/>}/>
            <Route path="/results/:hostpin/:exampin" element={<SeeResults/>}/>

        </Routes>
    </Router>
    
  );
}

export default App;
