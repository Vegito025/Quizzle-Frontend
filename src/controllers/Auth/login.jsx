import Axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css"
import {GoogleLogin} from "react-google-login";
import {gapi} from "gapi-script"
import Cookies from 'universal-cookie';
function Login(){
    const clientId = "276481273360-t6ofu9vihqa7lpfo3ee5s4q8oro1r835.apps.googleusercontent.com"

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null)
    const [error, setError] = useState(null);
    const [errormsg, setErrormsg] = useState(null)
    const cookies = new Cookies();
    let navigate = useNavigate()

    const onSuccess = (res) =>{
        Axios.post("http://127.0.0.1:5000/login", {email: res.profileObj.email, type:"google", password:null, profile_pic: res.profileObj.imageUrl})
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
    }

    async function sendUser(){
        if(!email || !password){
            setError(true);
            setErrormsg("Please fill all the details to proceed")
        }
        else{
            Axios.post("http://127.0.0.1:5000/login", {email: email, password: password, type: "manual"})
            .then((response)=>{
                console.log(response.data)
            if (response.data.success === true){
                navigate("/")
            }
            else{
                setError(true)
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

    

    return(
        <div>
            <h1 className="auth-login" style={{marginTop: "10%"}}>Log On To Quizzle</h1>
            <input type="email" name="" id="" placeholder="Email" className="email" style={{marginTop:"3%"}} onChange={(event)=> {setEmail(event.target.value)}}/>
            <input type="password" name="" id="" className="email" placeholder="Password" style={{marginTop:"1%"}} onChange={(event)=> {setPassword(event.target.value)}}/>
            {error ? <p className="error">*{errormsg}</p> : null}
            
            <button className="login-submit" onClick={sendUser}>Submit</button>
            <h3 className="auth-options">Or Log In Using</h3>
            <div id="signInButton">
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Or Login In Using Google"
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

export default Login;