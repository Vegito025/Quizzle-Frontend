import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import React from "react";
import Home from "./controllers/Home/home"
import Register from "./controllers/Auth/register";
import Login from "./controllers/Auth/login";
function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
        </Routes>
    </Router>
    
  );
}

export default App;
