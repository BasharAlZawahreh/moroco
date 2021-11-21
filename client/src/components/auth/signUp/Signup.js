import axios from "axios";
import React, { useState} from "react";
import {Link, useHistory } from "react-router-dom";
import './signUp.css'
const SignUp = () => {
    const history = useHistory();
  const [firstName, setfirstName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error,setError] = useState("");
  const signUpSend = (e) => {
    e.preventDefault();
    let savedData = { firstName, password, email };
    axios.post("/users/", savedData).then((res) => {
        history.push("/Login")
    }).catch((err) =>{
        if(err.message){
            setError("Error happened while register, please try again")
        }
    })
  };
  return (
    <>
    <div class="container-register1">
        <div class="form-register">
            <img src="https://icons.iconarchive.com/icons/alecive/flatwoken/512/Apps-User-icon.png"/>
            <h1>Register Form</h1>
        <form action="">
         <div class="container-register">
          <input type="text"
                                onChange={(e) => {
                                  setfirstName(e.target.value);
                                  }} 
          placeholder="First Name" name="name" required />
          <input type="text" 
                                 onChange={(e) => {
                                  setEmail(e.target.value);
                                 }}
          placeholder="Email" name="email" required />
          <input type="password" 
                                 onChange={(e) => {
                                  setPassword(e.target.value);
                                  }}
          placeholder="Password" name="psw" required />
          <div>
              <button type="submit"
                                  onClick={(e) => {
                                    {
                                     signUpSend(e);
                                    }
                                    }}
              class="signupbtn">Register</button>
            </div>
            <p >Already have an  account?  <span >
              <Link to="/Login">login</Link></span></p>
    </div>
      </form>
        </div>
      </div>

    {/* <div className="logIncontener">
    <div className="logInleft">
      <div className="leftcc">
    <p><span className="logo">Moroco</span> <br/> Join our Family Today </p>
    <img width="100%" style={{marginLeft:"4%"}} height="90%" src="assets\Project_141-02.jpg"></img>
      </div>
    </div>
    <div className="logInright">
      <div className="loginTest">
              <div className="login-form">
                <form onSubmit={"login"}>
                  <h1>Register</h1>
                  <div className="form-group">
                    <input
                      placeholder="FirstName"
                      onChange={(e) => {
                      setfirstName(e.target.value);
                      }}                 
                    />
                    <span className="input-icon">
                      <i className="fa fa-envelope"></i>
                    </span>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Email" //email
                       onChange={(e) => {
                       setEmail(e.target.value);
                      }}
                    />
                    <span className="input-icon">
                      <i className="fa fa-lock"></i>
                    </span>
                  </div>
                  <div className="form-group">
                    <input
                       type="password"
                       placeholder="Password" //password
                       onChange={(e) => {
                       setPassword(e.target.value);
                       }}
                    />
                    <span className="input-icon">
                      <i className="fa fa-lock"></i>
                    </span>
                  </div>
                    <button
                    type="submit"
                    onClick={(e) => {
                    {
                     signUpSend(e);
                    }
                    }}
                    className="Regbutton">Register</button>
                  <div className="seperator">
                    <b>or</b>
                  </div>
                  <div className="social-icon">
                  <button onClick={()=> history.push("/Login")} className="login-btn">Login</button>
                  </div>
                  <div>{error}</div>
                </form>
              </div>
              </div>
              </div>
              </div> */}
              </>
  );
};
  export default SignUp;