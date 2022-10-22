import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import React from "react";
import Home from "./controllers/Home/home"
import Register from "./controllers/Auth/register";
import Login from "./controllers/Auth/login";
import Host from "./controllers/Host Quiz/host";
import Attend from "./controllers/Attend Quiz/attend";
import Info from "./controllers/Auth/info";
function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/hostquiz" element={<Host/>}/>
            <Route path="/attendquiz" element={<Attend/>}/>
            <Route path="/info" element={<Info/>}/>
        </Routes>
    </Router>
    
  );
}

export default App;
