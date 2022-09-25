import "./auth.css"
function Register(){
    return (
        <div>
            <h1 className="auth-login" style={{marginTop: "3.5%"}}>Sign Up On Quizzle</h1>
            <input type="name" name="" id="" placeholder="Name" className="email"/>
            <input type="email" name="" id="" placeholder="Email" className="email" style={{marginTop:"1%"}}/>
            <input type="password" name="" id="" className="email" placeholder="Password" style={{marginTop:"1%"}}/>
            <input type="password" name="" id="" className="email" placeholder="Confirmed Password" style={{marginTop:"1%"}}/>
            <button className="login-submit">Submit</button>
            <h3 className="auth-options">Or Sign Up Using</h3>
            <img src="/google-logo-28FA7991AF-seeklogo.com.png" alt="" width={50} className="google"/>
            <img src="/Facebook-logo-modified (1).png" alt="" width={55} className="facebook"/>
        </div>
    )
}

export default Register;