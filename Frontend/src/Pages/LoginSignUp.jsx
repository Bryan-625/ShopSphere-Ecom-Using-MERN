import { useState } from "react";
import "./CSS/LoginSignUp.css";

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  return (
    <>
      <div className="loginsignup">
        <div className="loginsignup-container">
          <div className="loginsignup-container-text">
            <h1 id="loginsignup-container-text1">{state}</h1>
            {state === "Sign" && <h1 id="loginsignup-container-text2">Up</h1>}
          </div>
          <div className="loginsignup-fields">
            {state === "Sign" ? (
              <input type="text" placeholder="Enter Your Name" />
            ) : (
              <></>
            )}
            <input type="email" placeholder="Enter Your Email" />
            <input type="password" placeholder="Enter Your Password" />
          </div>
          <button>Continue</button>
          {state === "Sign" ? (
            <p className="loginsignup-login">
              Already have an account?<span onClick={()=>{setState("Login")}}> Login Here</span>
            </p>
          ) : (
            <p className="loginsignup-login">
              Create an account?<span onClick={()=>{setState("Sign")}}> Sign Up</span>
            </p>
          )}

          <div className="loginsignup-agree">
            <input type="checkbox" name="" id="" />
            <p>By continuing, i agree to the terms of use & privacy policy.</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default LoginSignup;
