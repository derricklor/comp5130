
import React, { useEffect } from "react";
import { Link, redirect, useNavigate } from "react-router-dom"
import axios from "axios"



function validateEmail(){
    let emErrorCount = 0
    let email = document.getElementById("login-email")
    let emailre = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,30}$/    //quantifier {2,30} repeat last at least 2 with at most 30

    if ( !emailre.test(email.value) ){
        emErrorCount++
        if ( document.getElementById("emailInvalid") == null ){
            email.classList.add("is-invalid")
            let feedback = document.createElement("div")
            feedback.setAttribute("id", "emailInvalid")
            feedback.classList.add("invalid-feedback")
            feedback.appendChild(document.createTextNode(`Expected format: example@db.com`))
            email.parentNode.appendChild(feedback)
        }
    } 
    if (emErrorCount > 0) { return false } else { return true }
}

function passwordAddInvalidFeedback(message, passwordElement, argId){
    passwordElement.classList.add("is-invalid")
    //check if elementId exists
    if ( document.getElementById(argId) == null ){    // if elementId does not exist then create it then add invalid feedback
        let feedback = document.createElement("div")
        feedback.setAttribute("id", argId)
        feedback.className = "invalid-feedback"
        feedback.appendChild(document.createTextNode(message))
        passwordElement.parentNode.appendChild(feedback)
    }
    //if does exist, do nothing
    return
}

function validatePassword(){
    let pwErrorCount = 0
    let password = document.getElementById("login-password")
    
    if (password.value.length < 8){
        passwordAddInvalidFeedback("Password cannot be less than 8 characters.", password, "passInvalidLength")
        pwErrorCount++
    } else {
        if (document.getElementById("passInvalidLength") != null){
            document.getElementById("passInvalidLength").remove() } 
    }
    let reHasUpperLetter = /[A-Z]/;
    if (!reHasUpperLetter.test(password.value)){
        passwordAddInvalidFeedback("Password must have at least 1 upper case letter.", password, "passInvalidUpper")
        pwErrorCount++
    } else {
        if (document.getElementById("passInvalidUpper") != null){
            document.getElementById("passInvalidUpper").remove() } 
    }
    let reHasLowerLetter = /[a-z]/;
    if (!reHasLowerLetter.test(password.value)){
        passwordAddInvalidFeedback("Password must have at least 1 lower case letter.", password, "passInvalidLower")
        pwErrorCount++
    } else {
        if (document.getElementById("passInvalidLower") != null){
            document.getElementById("passInvalidLower").remove() } 
    }
    let reHasNum = /[0-9]/;
    if (!reHasNum.test(password.value)){
        passwordAddInvalidFeedback("Password must have at least 1 number.", password, "passInvalidNumber")
        pwErrorCount++
    } else {
        if (document.getElementById("passInvalidNumber") != null){
            document.getElementById("passInvalidNumber").remove() } 
    }

    if(pwErrorCount > 0){ return false } else { return true }
}

function validateLogin(){
    document.querySelectorAll("form")[1].classList.add("was-validated")
    if (validateEmail() && validatePassword()){
        return true     //only if both fields are true
    } else {
        return false    //if either are false
    }
}

export default function Login() {

    useEffect(()=>{
        document.getElementById("login-email").addEventListener("input", validateEmail)
        document.getElementById("login-password").addEventListener("input", validatePassword)
    });
    // inner function
    function sendForm(e) {
        e.preventDefault(); //prevent page reload and form submission
        //validate the JSON
        if (!validateLogin()){
            console.log("Invalid email or password.")
            return  // errors in the form, show invalid inputs
        }
        //get form data and put into JSON of updates
        let myLogin = {
            email: document.getElementById("login-email").value,
            password: document.getElementById("login-password").value
        }
        
        // send the post request to server with body
        // axios.post(url,body,header)
        axios.post(`http://localhost:4000/api/auth`, myLogin)
            .then((res) => {
                if (res.status >= 300){
                    alert(res.data.error)
                } else {
                    if (res.status == 200){
                        console.log(res)
                        //save jwt token
                        sessionStorage.setItem("token", res.data.token)
                        console.log(sessionStorage.getItem("token"))
                        alert("Login success.")
                    }
                    if (res.status == 401){
                        console.log(res.data)
                        alert("Bad email/password")
                    }
                }
            })
            .catch((err) => {
                console.log(err)
                alert(`Server replied: ${err.message}. ${err.response.data.error}`)
            })
        //return redirect(`/movie/${id}`);
    }
    
    
    return (
        <>
            <div className="d-flex justify-content-center">
                <form className="needs-validation" noValidate={true}>
                    <h3>Login</h3>
                    <div className="form-group mb-3">
                        <label htmlFor="login-email">Email address</label>
                        <input type="email" className="form-control" id="login-email"
                            aria-describedby="emailHelp" defaultValue="" placeholder="Enter email" required
                        />
                        <div className="invalid-feedback">Email is required.</div>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="login-password">Password</label>
                        <input type="password" className="form-control" id="login-password" 
                            defaultValue="" placeholder="Password"  minLength={8} required
                        />
                        <div className="invalid-feedback">Password is required.</div>
                    </div>
                    <p>Not registered yet? <Link to="/register">Register</Link></p>
                    <button onClick={sendForm} className="btn btn-primary col-12">
                        Login
                    </button>
                </form>
            </div>
        </>
    )
}
