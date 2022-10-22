import Axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css"
import {GoogleLogin} from "react-google-login";
import {gapi} from "gapi-script"
import Cookies from 'universal-cookie';
function Register(){
    const clientId = "276481273360-t6ofu9vihqa7lpfo3ee5s4q8oro1r835.apps.googleusercontent.com"

    const [email, setEmail] = useState(null);
    const [name, setName] = useState(null);
    const [password, setPassword] = useState(null);
    const [confimedPassword, setConfirmedPassword] = useState(null);
    const [error, setError] = useState(false)
    const [errormsg, setErrormsg] = useState(null)
    const cookies = new Cookies();

    const onSuccess = (res) =>{
        Axios.post("http://127.0.0.1:5000/register", {name: res.profileObj.name, email: res.profileObj.email, type:"google", password:null, confirmed_password:null,profile_pic: res.profileObj.imageUrl, profile_status: "pending"})
        .then((response)=>{
            if(response.data.success === true){
                cookies.set("access_token", response.data.access_token, {path: "/"})
                navigate("/")
            }
            else{
                setError(true);
                setErrormsg(response.data.message)
            }
        })
    }
    const onFailure = (res) => {
        console.log(res)
        setErrormsg("Something went wrong")
    }

    let navigate = useNavigate()

    async function registerUser(){
        console.log(name, password, confimedPassword, email)
        if((!password) || (!confimedPassword) || (!email) || (!name)){
            setError(true)
            setErrormsg("Please fill all the details to proceed")
        }else{
            Axios.post("http://127.0.0.1:5000/register", {name: name, email: email, password: password, confirmed_password: confimedPassword, type:"manual"})
        .then((response)=>{
            if(response.data.success === true){
                navigate("/")
            }
            else{
                setError(true);
                setErrormsg(response.data.message)
            }
        })
        }
    }
    useEffect(()=>{
        function start(){
            gapi.client.init({
                clinetId: clientId,
                scope: ""
            })
        }

        gapi.load('client:auth2', start);
    });

    return (
        <div>
            <h1 className="auth-login" style={{marginTop: "3.5%"}}>Sign Up On Quizzle</h1>
            <input type="name" name="" id="" placeholder="Name" className="email" onChange={(event)=> {setName(event.target.value)}}/>
            <input type="email" name="" id="" placeholder="Email" className="email" style={{marginTop:"1%"}} onChange={(event)=> {setEmail(event.target.value)}}/>
            <input type="password" name="" id="" className="email" placeholder="Password" style={{marginTop:"1%"}} onChange={(event)=> {setPassword(event.target.value)}}/>
            <input type="password" name="" id="" className="email" placeholder="Confirmed Password" style={{marginTop:"1%"}} onChange={(event)=> {setConfirmedPassword(event.target.value)}}/>
            {error ? <p className="error">*{errormsg}</p> : null}
            <button className="login-submit" onClick={registerUser}>Submit</button>
            <h3 className="auth-options">Or Sign Up Using</h3>
            <div id="signInButton">
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Or Sign Up Using Google"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                    className="google"
                />
            </div>
        </div>
    )
}

export default Register;