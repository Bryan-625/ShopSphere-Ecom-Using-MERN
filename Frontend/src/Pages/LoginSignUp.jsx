import './CSS/LoginSignUp.css'

const LoginSignup=()=>
{
    return(
        <>
        <div className="loginsignup">
            <div className="loginsignup-container">
                <div className='loginsignup-container-text'>
                <h1 id='loginsignup-container-text1'>Sign</h1>
                <h1 id='loginsignup-container-text2'> Up</h1>
                </div>
                <div className="loginsignup-fields">
                    <input type="text" placeholder="Enter Your Name" />
                    <input type="email" placeholder="Enter Your Email" />
                    <input type="password" placeholder="Enter Your Password" />

                </div>
                <button>Continue</button>
                <p className="loginsignup-login">Already have an account?<span> Login Here</span></p>
                <div className="loginsignup-agree">
                    <input type="checkbox" name="" id=""/>
                    <p>By continuing, i agree to the terms of use & privacy policy.</p>
                </div>
            </div>
        </div>
        </>
    )
}
export default LoginSignup;