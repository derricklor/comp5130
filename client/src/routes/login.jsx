import { Link, redirect, useNavigate } from "react-router-dom"

function passwordAddInvalidFeedback(message){
    let feedback = document.createElement("div")
    feedback.className = "invalid-feedback"
    feedback.appendChild(document.createTextNode(message))
    document.getElementById("login-password").parentNode.appendChild(feedback)
}

function validateLogin(myLogin){
    // email
    // password
    if (myLogin.password.length < 8){
        passwordAddInvalidFeedback("Password cannot be less than 8 characters.")
        return false
    }
    let reHasUpperLetter = /[A-Z]/;
    if (!reHasUpperLetter.test(myLogin.password)){
        passwordAddInvalidFeedback("Password must have at least 1 upper case letter.")
        return false
    }
    let reHasLowerLetter = /[a-z]/;
    if (!reHasLowerLetter.test(myLogin.password)){
        passwordAddInvalidFeedback("Password must have at least 1 lower case letter.")
        return false
    }
    let reHasNum = /[0-9]/;
    if (!reHasNum.test(myLogin.password)){
        passwordAddInvalidFeedback("Password must have at least 1 number.")
        return false
    }

    return true
}

export default function Login() {

    function validateForm(e) {
        e.preventDefault(); //prevent page reload and form submission
        //get form data and put into JSON of updates
        let myLogin = {
            email: document.getElementById("login-email").value,
            password: document.getElementById("login-password").value
        }
        //validate the JSON
        if (!validateLogin(myLogin)){
            return  // errors in the form, show invalid inputs
        }
        
        // send the post request to server with body
        // axios.post(url,body,header)
        axios.post(`http://localhost:4000/api/auth`, myLogin)
            .then((res) => {
                if (res.data.error){
                    alert(res.data.error)
                } else {
                    if (res.ok){
                        console.log(res)
                        //save jwt token
                        sessionStorage.setItem("token", res.data.token)
                        alert("Login success.")
                    }
                }
            })
            .catch((err) => {
                console.log(err)
            })
        //return redirect(`/movie/${id}`);
    }
    
    
    return (
        <>
            <div className="d-flex justify-content-center">
                <form className="was-validated" onSubmit={validateForm}>
                    <h3>Login</h3>
                    <div className="form-group mb-3">
                        <label htmlFor="login-email">Email address</label>
                        <input type="email" className="form-control" id="login-email"
                            aria-describedby="emailHelp" defaultValue="" placeholder="Enter email" required
                        />
                        <div className="valid-feedback">Valid.</div>
                        <div className="invalid-feedback">Email is required.</div>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="login-password">Password</label>
                        <input type="password" className="form-control" id="login-password" 
                            defaultValue="" placeholder="Password" minLength={8} required
                        />
                        <div className="valid-feedback">Valid.</div>
                        <div className="invalid-feedback">Password is required.</div>
                    </div>
                    <p>Not registered yet? <Link to="/register">Register</Link></p>
                    <button type="submit" className="btn btn-primary col-12">
                        Login
                    </button>
                </form>
            </div>
        </>
    )
}
