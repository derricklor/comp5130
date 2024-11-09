import React, { useEffect, useState, useContext } from "react";
import { redirect, useNavigate } from "react-router-dom"
import axios from "axios"
import { useTokenContext, useUserContext } from "../main"

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

function validateEmail(inputId){
    let emErrorCount = 0
    let email = document.getElementById(inputId)
    let emailre = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,30}$/    //quantifier {2,30} repeat last at least 2 with at most 30

    if ( !emailre.test(email.value) ){
        emErrorCount++
        if ( document.getElementById(inputId+"-feedback") == null ){
            email.classList.add("is-invalid")
            let feedback = document.createElement("div")
            feedback.setAttribute("id", inputId+"-feedback")
            feedback.classList.add("invalid-feedback")
            feedback.appendChild(document.createTextNode(`Expected format: example@db.com`))
            email.parentNode.appendChild(feedback)
        }
    }
    if (emErrorCount > 0) { return false } else { 
        let temp = document.getElementById(inputId+"-feedback")
        if (temp != null){ temp.remove() }
        // remove is-invalid, add is-valid from inputId field
        email.classList.remove("is-invalid")
        email.classList.add("is-valid")
        return true }
}

function passwordAddInvalidFeedback(message, passwordElement, errorName){
    passwordElement.classList.add("is-invalid")
    //check if elementId exists
    if ( document.getElementById(passwordElement.id + errorName) == null ){    // if elementId does not exist then create it then add invalid feedback
        let feedback = document.createElement("div")
        feedback.setAttribute("id", passwordElement.id + errorName)
        feedback.className = "invalid-feedback"
        feedback.appendChild(document.createTextNode(message))
        passwordElement.parentNode.appendChild(feedback)
    }
    //if does exist, do nothing
    return
}

function validatePassword(inputId){
    let pwErrorCount = 0
    let password = document.getElementById(inputId)
    
    if (password.value.length < 8){
        passwordAddInvalidFeedback("Password cannot be less than 8 characters.", password, "-InvalidLength")
        pwErrorCount++
    } else {
        let temp = document.getElementById(password.id+"-InvalidLength")
        if (temp != null){ temp.remove() } 
    }
    let reHasUpperLetter = /[A-Z]/;
    if (!reHasUpperLetter.test(password.value)){
        passwordAddInvalidFeedback("Password must have at least 1 upper case letter.", password, "-InvalidUpper")
        pwErrorCount++
    } else {
        let temp = document.getElementById(password.id+"-InvalidUpper")
        if (temp != null){ temp.remove() }
    }
    let reHasLowerLetter = /[a-z]/;
    if (!reHasLowerLetter.test(password.value)){
        passwordAddInvalidFeedback("Password must have at least 1 lower case letter.", password, "-InvalidLower")
        pwErrorCount++
    } else {
        let temp = document.getElementById(password.id+"-InvalidLower")
        if (temp != null){ temp.remove() }
    }
    let reHasNum = /[0-9]/;
    if (!reHasNum.test(password.value)){
        passwordAddInvalidFeedback("Password must have at least 1 number.", password, "-InvalidNumber")
        pwErrorCount++
    } else {
        let temp = document.getElementById(password.id+"-InvalidNumber")
        if (temp != null){ temp.remove() }
    }

    if(pwErrorCount > 0){ return false } else { 
        // remove is-invalid, add is-valid from inputId field
        password.classList.remove("is-invalid")
        password.classList.add("is-valid")
        return true }
}

function validateLogin(){
    document.getElementById("modal-form-login").classList.add("was-validated")
    if (validateEmail("login-email") && validatePassword("login-password")){
        return true     //only if both fields are true
    } else {
        return false    //if either are false
    }
}

function validateRegister(){
    document.getElementById("modal-form-register").classList.add("was-validated")
    if (validateEmail("register-email") && validatePassword("register-password") && repeatPassword()){
        return true     //only if all fields are true
    } else {
        return false    //if either are false
    }
}


export default function LoginRegisterComponent(){
    const navigate = useNavigate()
    const {user, setUser} = useUserContext()
    const {token, setToken} = useTokenContext()   // how to rerender component? with useContext
    
    useEffect(()=>{
        if (token == null){
            document.getElementById("login-email").addEventListener("input", function() { validateEmail("login-email"); })
            document.getElementById("login-password").addEventListener("input", function() { validatePassword("login-password"); })
            document.getElementById("register-email").addEventListener("input", function() { validateEmail("register-email"); })
            document.getElementById("register-password").addEventListener("input", function() { validatePassword("register-password"); })
            document.getElementById("register-repeat-password").addEventListener("input", repeatPassword)
        }
            
    }, []);

    // inner function for logging out
    function logOutHandler(e){
        if (!confirm("Confirm you want to log out? You will have to log in again.")) {
            //canceled, do nothing
        } else {
            localStorage.removeItem("moviedbtoken")
            localStorage.removeItem("user")
            setToken(null)  //causes LoginRegisterComponent to rerender
            setUser(null)
            navigate(`/`, { replace: true }); // <-- redirect
        }
    }

    // inner function for sending login form
    function sendFormLogin(e) {
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
                        //remove modal if it remains
                        let mo = bootstrap.Modal.getInstance(document.getElementById("modalLogin"));
                        mo.dispose()   // bootstrap instance method to clean up modal element
                        //remove any remaining leftover properties of modal from body tag element and styling
                        let body = document.getElementsByTagName("body")[0]
                        body.removeAttribute("class")
                        body.removeAttribute("style")
                        body.removeAttribute("data-bs-overflow")
                        body.removeAttribute("data-bs-padding-right")
                        
                        // Note: localstorage converts value stored in key, as string
                        // So if storing JSON object, stringify it upon set and parse it upon get
                        localStorage.setItem("moviedbtoken", res.data.token)//save jwt token 
                        setToken(res.data.token)// after successful login from server, use setToken. Causes LoginRegisterComponent to rerender
                        localStorage.setItem("user", JSON.stringify({uid: res.data.uid, auth: res.data.auth}))
                        setUser({uid: res.data.uid, auth: res.data.auth})
                        alert("Login success.")
                    }
                    if (res.status == 401){
                        //console.log(res.data)
                        alert("Bad email/password")
                    }
                }
            })
            .catch((err) => {
                console.log(err)
                alert("Bad email/password.")
            })
        //return redirect("/movie/${id}");
    }

    // inner function for sending registration form
    function sendFormRegister(e) {
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
        //return redirect("/movie/${id}");
    }

    // component
    if (token !== null){  
        
        return (
            <>
                
                <button type="button" className="btn btn-primary" id="logoutBtn" onClick={logOutHandler}>Log Out</button>
                
            </>
        );
    } else {
        return (
            <>
                <button className="btn btn-primary" data-bs-target="#modalLogin" data-bs-toggle="modal">
                    Login/Register
                </button>
                <div className="modal fade" id="modalLogin" aria-hidden="true" aria-labelledby="modalLoginLabel" tabIndex={-1}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="modalLoginLabel">Login</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                <form className="needs-validation" id="modal-form-login" noValidate={true}>
                                    <div className="form-group mb-3">
                                        <label htmlFor="login-email">Email address</label>
                                        <input type="email" className="form-control" id="login-email"
                                            aria-describedby="emailHelp" defaultValue="" placeholder="Enter email" required
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="login-password">Password</label>
                                        <input type="password" className="form-control" id="login-password"
                                            defaultValue="" placeholder="Password" minLength={8} required
                                        />
                                    </div>
                                    <button onClick={sendFormLogin} className="btn btn-primary col-12">
                                        Login
                                    </button>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <p>Not registered yet?</p>
                                <button className="btn btn-primary" data-bs-target="#modalRegister" data-bs-toggle="modal">
                                    Register
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="modalRegister" aria-hidden="true" aria-labelledby="modalRegisterLabel" tabIndex={-1}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="modalRegisterLabel">Register</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                <form className="was-validated" id="modal-form-register" noValidate={true}>
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
                                    <button onClick={sendFormRegister} className="btn btn-primary col-12">
                                        Register
                                    </button>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-primary" data-bs-target="#modalLogin" data-bs-toggle="modal" >
                                    Back to Login
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
        /*                 
        <ul className="navbar-nav mb-2 mb-lg-0">
            <Link className="nav-link" to="/login">
                <button type="button" className="btn btn-primary" id="loginBtn">Login</button>
            </Link>
            <Link className="nav-link" to="/register">
                <button type="button" className="btn btn-outline-primary ms-1" id="registerBtn">Register</button>
            </Link>
        </ul> */
            
        
    }
}