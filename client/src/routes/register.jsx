import React, { useEffect } from "react";
import { Link, redirect, useNavigate } from "react-router-dom"
import axios from "axios"

function repeatPassword(){
    let pwErrorCount = 0
    let password = document.getElementById("register-password")
    let repeatPassword = document.getElementById("register-repeat-password")
    
    if(password.value != repeatPassword.value){
        pwErrorCount++
        if ( document.getElementById("repeatPasswordInvalid") == null ){
            repeatPassword.classList.add("is-invalid")
            let feedback = document.createElement("div")
            feedback.setAttribute("id", "repeatPasswordInvalid")
            feedback.classList.add("invalid-feedback")
            feedback.appendChild(document.createTextNode(`Passwords must match.`))
            repeatPassword.parentNode.appendChild(feedback)
        }
    } else {
        if (document.getElementById("repeatPasswordInvalid") != null){
            document.getElementById("repeatPasswordInvalid").remove() } 
    }

    if(pwErrorCount > 0){ return false } else { return true }
}

function validateEmail(){
    let emErrorCount = 0
    let email = document.getElementById("register-email")
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
    let password = document.getElementById("register-password")
    
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

function validateRegister(){
    document.querySelectorAll("form")[1].classList.add("was-validated")
    if (validateEmail() && validatePassword() && repeatPassword()){
        return true     //only if all fields are true
    } else {
        return false    //if either are false
    }
}

export default function Register() {

    useEffect(()=>{
        document.getElementById("register-email").addEventListener("input", validateEmail)
        document.getElementById("register-password").addEventListener("input", validatePassword)
        document.getElementById("register-repeat-password").addEventListener("input", repeatPassword)
    }, []);
    // inner function
    function sendForm(e) {
        e.preventDefault(); //prevent page reload and form submission
        //validate the JSON
        if (!validateRegister()){
            return  // errors in the form, show invalid inputs
        }
        //get form data and put into JSON of updates
        let myRegister = {
            email: document.getElementById("register-email").value,
            password: document.getElementById("register-password").value
        }
        
        // send the post request to server with body
        // axios.post(url,body,header)
        axios.post(`http://localhost:4000/api/registration`, myRegister)
            .then((res) => {
                if (res.status >= 300){
                    alert(res.data.error)
                } else {
                    if (res.status == 201){
                        console.log(res.status)
                        alert("Registration success! Please login using your credentials.")
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
                <form className="was-validated" noValidate={true}>
                    <h3>Register</h3>
                    <div className="form-group mb-3">
                        <label htmlFor="register-email">Email address</label>
                        <input type="email" className="form-control" id="register-email"
                            aria-describedby="emailHelp" defaultValue="" placeholder="Enter email" required
                        />
                        <div className="invalid-feedback">Email is required.</div>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="register-password">Password</label>
                        <input type="password" className="form-control" id="register-password"
                            defaultValue="" placeholder="Password" minLength={8} required
                        />
                        <div className="invalid-feedback">Password is required.</div>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="register-repeat-password">Repeat Password</label>
                        <input type="password" className="form-control" id="register-repeat-password"
                            defaultValue="" placeholder="Repeat password" minLength={8} required
                        />
                        <div className="invalid-feedback">Repeat password is required.</div>
                    </div>
                    <button onClick={sendForm} className="btn btn-primary col-12">
                        Register
                    </button>
                </form>
            </div>
        </>
    )
}
