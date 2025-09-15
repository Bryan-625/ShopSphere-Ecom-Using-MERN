import { useState } from "react";
import "./CSS/LoginSignUp.css";
import Swal from "sweetalert2";

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const changeHandler = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const login = async () => {
    console.log("Login function executed", formData);
    console.log("Signup function executed", formData);
    let responseData;
    await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else {
      Swal.fire({
        icon: "error",
        title: "Login Failed!",
        text: responseData.errors,
      });
    }
  };

  const signup = async () => {
    console.log("Signup function executed", formData);
    let responseData;
    await fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else {
      Swal.fire({
        icon: "error",
        title: "Signup Failed!",
        text: responseData.errors,
      });
    }
  };

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
              <input
                name="username"
                value={formData.username}
                onChange={changeHandler}
                type="text"
                placeholder="Enter Your Name"
              />
            ) : (
              <></>
            )}
            <input
              name="email"
              value={formData.email}
              onChange={changeHandler}
              type="email"
              placeholder="Enter Your Email"
            />
            <input
              name="password"
              value={formData.password}
              onChange={changeHandler}
              type="password"
              placeholder="Enter Your Password"
            />
          </div>
          <button
            onClick={() => {
              state === "Login" ? login() : signup();
            }}
          >
            Continue
          </button>
          {state === "Sign" ? (
            <p className="loginsignup-login">
              Already have an account?
              <span
                onClick={() => {
                  setState("Login");
                }}
              >
                {" "}
                Login Here
              </span>
            </p>
          ) : (
            <p className="loginsignup-login">
              Create an account?
              <span
                onClick={() => {
                  setState("Sign");
                }}
              >
                {" "}
                Sign Up
              </span>
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
