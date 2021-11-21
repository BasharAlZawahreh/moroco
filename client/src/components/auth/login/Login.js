import React, { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./login.css";
import { AuthContext } from "../../../contexts/context";
import GoogleLogin from 'react-google-login'
//-----------------------------
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { Canvas, extend, useFrame, useLoader, useThree } from 'react-three-fiber';
import circleImg from './assets/circle.png';
import { Suspense, useCallback, useMemo, useRef } from 'react';
extend({OrbitControls})

//-----------------------------
// function CameraControls(){
//   const {
//     camera,
//     gl: {domElement}
//   } = useThree();
//   const controlsRef = useRef();
//   useFrame(() => controlsRef.current.update())

//   return (
//     <orbitControls
//       ref={controlsRef}
//       args={[camera, domElement]}
//       autoRotate
//       autoRotateSpeed={-0.2}
//     />
//   );
// }// end camera

function Points() {
  const imgTex = useLoader(THREE.TextureLoader, circleImg);
  const bufferRef = useRef();

  let t = 0;
  let f = 0.002;
  let a = 3;
  const graph = useCallback((x, z) => {
    return Math.sin(f * (x ** 2 + z ** 2 + t)) * a;
  }, [t, f, a])

  const count = 100
  const sep = 1.5
  let positions = useMemo(() => {
    let positions = []

    for (let xi = 0; xi < count; xi++) {
      for (let zi = 0; zi < count; zi++) {
        let x = sep * (xi - count / 2);
        let z = sep * (zi - count / 2);
        let y = graph(x, z);
        positions.push(x, y, z);
      }
    }

    return new Float32Array(positions);
  }, [count, sep, graph])

  useFrame(() => {
    t += 15
    
    const positions = bufferRef.current.array;

    let i = 0;
    for (let xi = 0; xi < count; xi++) {
      for (let zi = 0; zi < count; zi++) {
        let x = sep * (xi - count / 2);
        let z = sep * (zi - count / 2);

        positions[i + 1] = graph(x, z);
        i += 3;
      }
    }

    bufferRef.current.needsUpdate = true;
  })

  return (
    <points>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          ref={bufferRef}
          attachObject={['attributes', 'position']}
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        attach="material"
        map={imgTex}
        color={0x702963}
        size={0.5}
        sizeAttenuation
        transparent={false}
        alphaTest={0.5}
        opacity={1.0}
      />
    </points>
  );
}

function AnimationCanvas() {
  return (
    <Canvas
      colorManagement={false}
      camera={{ position: [100, 10, 0], fov: 25 }}
    >
      <Suspense fallback={null}>
        <Points />
      </Suspense>
      {/* <CameraControls/> */}
    </Canvas>
  );
}


//-----------------------------

const Login = () => {
  const { setIsLoggedIn, isLoggedIn, saveToken } = useContext(AuthContext);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/users/login", {
        email,
        password,
      });
      if (res.data.success) {
        setMessage("");
        saveToken(res.data.token);
        setIsLoggedIn(true);
        history.push("/Home");
      } else throw Error;
    } catch (error) {
      if (error.response && error.response.data) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Login, please try again");
    }
  };
  const  responsesuccessGoogle=(response)=>{
    // console.log(response.profileObj);
    axios.post("/users/googleLogin",{tokenId: response.tokenId})
    .then((res) => {
      console.log(res);
      if (res.data) {
        setMessage("");
        saveToken(res.data.token);
        setIsLoggedIn(true);
        history.push("/Home");
      } else throw Error;
  }).catch((err) =>{
      if(err.message){
        setMessage("Error happened while Login, please try again");
        console.log(message);
      }
  })
    
  }
  const  responseErrorGoogle=(response)=>{
    setMessage("responseErrorGoogle => Error happened while Login, please try again");
    console.log(message);
    
    
  }
  useEffect(() => {
    if (isLoggedIn) {
    }
  });
  return (
    <>

      {!isLoggedIn ? (
        <>
          {/* <div className="logIncontener">
            
            <div className="logInleft">
              <div className="leftcc">
              <div className="textDevide">
              </div>
            <p><span className="logo">Moroco</span> <br/> <span>Connect with friends and the world around you.</span> </p>
            <img width="80%" height="90%" src="assets\730_generated.jpg"></img>
              </div>
            </div>
            <div className="logInright">
              <div className="loginTest">
              <div className="login-form">
                <form onSubmit={login}>
                  <h1>Login</h1>
                  <div className="form-group">
                    <input
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      name="email"
                      placeholder="E-mail Address"
                    />
                    <span className="input-icon">
                      <i className="fa fa-envelope"></i>
                    </span>
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      name="psw"
                      placeholder="Password"
                    />
                    <span className="input-icon">
                      <i className="fa fa-lock"></i>
                    </span>
                  </div>
                  <GoogleLogin
        clientId="748391034640-4faj5hc4s827b2h6k3c9cni55uq46djh.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={(response)=>responsesuccessGoogle(response)}
        onFailure={(response)=>responseErrorGoogle(response)}
        cookiePolicy={'single_host_origin'}
        
        />
                  <button className="login-btn">Login</button>
                  <div className="seperator">
                    <b>or</b>
                  </div>
                  <div className="social-icon">
                    <button  onClick={()=> history.push("/register")} type="button">Register</button>
                  </div>
                </form>
              </div>
            </div>
            </div>
          </div> */}
          <div className="anim">
      <Suspense fallback={<div>Loading...</div>}>
        <AnimationCanvas />
      </Suspense>
    </div>
                  <div class="container-register1">
        <div class="form-register">
            <img src="https://icons.iconarchive.com/icons/alecive/flatwoken/512/Apps-User-icon.png"/>
            <h1>Login Form</h1>
        <form onSubmit={login}>
         <div class="container-register">
          <input type="text" 
onChange={(e) => setEmail(e.target.value)}
          placeholder="Email" name="email" required />
          <input type="password" 
onChange={(e) => setPassword(e.target.value)}
          placeholder="Password" name="psw" required />
          <div>
          <GoogleLogin
        clientId="748391034640-4faj5hc4s827b2h6k3c9cni55uq46djh.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={(response)=>responsesuccessGoogle(response)}
        onFailure={(response)=>responseErrorGoogle(response)}
        cookiePolicy={'single_host_origin'}
        
        />
              <button type="submit" class="signupbtn">Login</button>
            </div>
            <p >You Need an  account?  <span >
              <Link to="/register">Register</Link></span></p>

    </div>
      </form>
        </div>
        
      </div>
      <div className="anim">
      <Suspense fallback={<div>Loading...</div>}>
        <AnimationCanvas />
      </Suspense>
    </div>
        </>
      ) : (
        history.push("/")
      )}
      
    </>
    
  );
};
export default Login;