import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./navbar.css";
import Cookies from 'universal-cookie';
import Axios from "axios";


function Navbars(){ 
    const [hover1, setHover1] = useState("white")
    const [hover2, setHover2] = useState("white")
    const [hover3, setHover3] = useState("white")
    const [hover4, setHover4] = useState("white")
    const [hover5, setHover5] = useState("white")
    const [hover6, setHover6] = useState("white")
    let logged_in = false;
    const [profileUrl, setProfileUrl] = useState(null)
    const cookies = new Cookies();
    if (cookies.get("access_token")){
      logged_in = true;
      Axios.post("http://127.0.0.1:5000/getdetail", {"access_token":cookies.get("access_token")})
      .then((response)=>{
        if(response.data.data.type === "google")
        logged_in = true
        if(response.data.data.profile_pic === null){
          setProfileUrl("/user-profile-icon-free-vector.png")
        }
        else{
          setProfileUrl(response.data.data.profile_pic)
        }
        setHover5("yellow")
      })
    }
    
    return (
        <Navbar style={{backgroundColor: "transparent"}} expand="lg">
        <Container fluid>
          <Navbar.Brand href="#" style={{color: hover6, fontSize: "25px", paddingLeft: "3%", fontFamily:"Raleway",fontWeight:"600"}} onMouseOver={()=>{setHover6("white")}} onMouseOut={()=>setHover6("#BC6FF1")}>Quizzle</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ms-auto my-2 my-lg-2"
              style={{ maxHeight: '200px', paddingRight:"2%"}}
              navbarScroll
            >
              <Nav.Link href="#action1" style={{fontSize: "18px", color:hover1, fontFamily:"Raleway", fontWeight:"600"}} onMouseOver={()=>{setHover1("#790252")}} onMouseOut={()=>setHover1("white")}>Home</Nav.Link>
              <Nav.Link href="#action2" style={{fontSize: "18px", color:hover2, fontFamily:"Raleway", fontWeight:"600"}} onMouseOver={()=>{setHover2("#790252")}} onMouseOut={()=>setHover2("white")}>Host Quiz</Nav.Link>
              <Nav.Link href="#" style={{fontSize: "18px", color:hover3, fontFamily:"Raleway", fontWeight:"600"}} onMouseOver={()=>{setHover3("#790252")}} onMouseOut={()=>setHover3("white")}>
                Attend Quiz
              </Nav.Link>
              <Nav.Link href="/getpin" style={{fontSize: "18px", color:hover3, fontFamily:"Raleway", fontWeight:"600"}} onMouseOver={()=>{setHover3("#790252")}} onMouseOut={()=>setHover3("white")}>
                See Results
              </Nav.Link>
              
                {logged_in ? null : <Nav.Link href="/login" style={{fontSize: "18px", color:hover4, fontFamily:"Raleway", fontWeight:"800"}} onMouseOver={()=>{setHover4("#790252")}} onMouseOut={()=>setHover4("white")}>
                Login
                </Nav.Link>}
                {logged_in ? <Nav.Link href="/" style={{fontSize: "18px", color:hover5, fontFamily:"Raleway", fontWeight:"800"}} onMouseOver={()=>{setHover5("#790252")}} onMouseOut={()=>setHover5("white")} onClick={()=> {cookies.remove("access_token")}}>
                Logout
                </Nav.Link> : null}
                {logged_in ? <img src={profileUrl} alt="" className="profile_pic"/> : <Nav.Link href="/register" style={{fontSize: "18px", color:hover5, fontFamily:"Raleway", fontWeight:"800"}} onMouseOver={()=>{setHover5("#790252")}} onMouseOut={()=>setHover5("white")}>
                Sign Up
                </Nav.Link>}
                
              
              
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

export default Navbars;