import React, { useEffect, useState } from "react";
import axios from "axios"
import { useParams, redirect, useNavigate } from "react-router-dom"
import { useTokenContext, useUserContext , useNetworkContext} from "../main"

// Validates the form, returns true if everything is valid.
// If false, then shows where validator failed, returns false.
function validateUpdate(myUpdates){
    // title
    // released
    // runtime
    // if (!parseInt(myUpdates.runtime)){
    //     feedback = document.createElement("div")
    //     feedback.className = "invalid-feedback"
    //     feedback.appendChild(document.createTextNode("Invalid date."))
    //     document.getElementById("form-title").parentNode.appendChild(feedback)
    //     return false
    // }
    // director// rating// genre// plot// actors// poster
    return true
}

export default function AddMovie() {
    const navigate = useNavigate();
    const {user, setUser} = useUserContext()    //user stored as string
    const {token, setToken} = useTokenContext() //token stored as string
    const {network, setNetwork} = useNetworkContext()

    //check if user is in local storage
    if (user == null){
        alert("Please log in and try again.")
        useEffect(()=>{
            navigate(`/`, { replace: true }); // <-- redirect
        },[])
        return
    }


    // Define an inner function for adding a movie, when form is submitted.
    // This inner function has access to outer function's variables.
    function addMovie(e) {
        e.preventDefault(); //prevent page reload
        //get form data and put into JSON of movie
        let myMovie = {
            title: document.getElementById("form-title").value,
            released: document.getElementById("form-released").value,
            runtime : document.getElementById("form-runtime").value,
            director : document.getElementById("form-director").value,
            rating : document.getElementById("form-rating").value,
            genre : document.getElementById("form-genre").value,
            plot : document.getElementById("form-plot").value,
            actors : document.getElementById("form-actors").value,
            poster : document.getElementById("form-poster").value
        }
        //validate the JSON
        if (!validateUpdate(myMovie)){
            return  // errors in the form, show invalid inputs
        }
        // get x-auth token from useContext, token is in form of string
        // send the post request to server with body and headers
        // axios.post(url,body,header)
        axios.post(`http://${network.host}:${network.serverPort}/api/movie/add`, myMovie, { headers: { "X-Auth": token }})
            .then((res) => {
                if (res.status >= 300){
                    alert(res.data.error)
                } else {
                    alert(res.data.message)
                    navigate(`/`, { replace: true });
                    //navigate(`/movie/${id}`, { replace: true }); // <-- redirect
                }
            })
            .catch((err) => {
                console.log(err)
            })
        return
    }


    return (
        <>  
            <div className="row g-1 p-1">
                <div className="col-md-0 col-xl-3"></div>
                <div className="col-md-12 col-xl-6">
                    <div className="row">
                        <h1 className="m-4 text-start">Add Movie</h1>
                                <div id="movieform">
                                    <p>
                                        <button type="button" className="btn btn-secondary" onClick={() => { navigate(-1); }}>Cancel</button>
                                    </p>
                                    <form className="row g-3 was-validated" onSubmit={addMovie}>
                                        <div className="col-md-6">
                                            <label htmlFor="form-title" className="form-label">Title</label>
                                            <input type="text" className="form-control" id="form-title" name="title" placeholder="Title of movie" maxLength={255} required />
                                            <div className="valid-feedback">Valid.</div>
                                            <div className="invalid-feedback">Title is required</div>
                                        </div>
                                        <div className="col-md-3">
                                            <label htmlFor="form-released" className="form-label">Released</label>
                                            <input type="date" className="form-control" id="form-released" name="released" defaultValue={''} placeholder="mmddyyyy" required />
                                            <div className="valid-feedback">Valid.</div>
                                            <div className="invalid-feedback">Release date is required</div>
                                        </div>
                                        <div className="col-md-2">
                                            <label htmlFor="form-runtime" className="form-label">Runtime</label>
                                            <input type="number" className="form-control" id="form-runtime" name="runtime" placeholder='minutes' min={0} max={999} step={1} required />
                                            <div className="valid-feedback">Valid.</div>
                                            <div className="invalid-feedback">Runtime is required</div>
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="form-director" className="form-label">Director</label>
                                            <input type="text" className="form-control" id="form-director" name="director" defaultValue={''} placeholder="Name of director(s)" required />
                                            <div className="valid-feedback">Valid.</div>
                                            <div className="invalid-feedback">Director is required</div>
                                        </div>
                                        <div className="col-md-2">
                                            <label htmlFor="form-rating" className="form-label">Rating</label>
                                            <input type="number" className="form-control" id="form-rating" name="rating" min={0} max={10} step={0.1} placeholder="Score" required />
                                            <div className="valid-feedback">Valid.</div>
                                            <div className="invalid-feedback">Rating is required</div>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="form-genre" className="form-label">Genre</label>
                                            <input type="text" className="form-control" id="form-genre" name="genre" defaultValue={''} placeholder="Genre(s)" required />
                                            <div className="valid-feedback">Valid.</div>
                                            <div className="invalid-feedback">Genre is required</div>
                                        </div>
                                        <div className="col-md-12">
                                            <label htmlFor="form-plot" className="form-label">Plot</label>
                                            <textarea className="form-control" id="form-plot" rows="3" name="plot" defaultValue={''} placeholder="Synopsis of movie. No spoilers!" required>
                                            </textarea>
                                            <div className="valid-feedback">Valid.</div>
                                            <div className="invalid-feedback">Plot is required</div>
                                        </div>
                                        <div className="col-md-12">
                                            <label htmlFor="form-actors" className="form-label">Actors</label>
                                            <textarea className="form-control" id="form-actors" rows="2" name="actors" defaultValue={''} placeholder="List of actor(s) and actress(es)" required>
                                            </textarea>
                                            <div className="valid-feedback">Valid.</div>
                                            <div className="invalid-feedback">Actors is required</div>
                                        </div>
                                        <div className="col-md-12">
                                            <label htmlFor="form-poster" className="form-label">Poster Image</label>
                                            <textarea className="form-control" id="form-poster" rows="2" name="poster" defaultValue={''} placeholder="URL link to poster image" required>
                                            </textarea>
                                            <div className="valid-feedback">Valid.</div>
                                            <div className="invalid-feedback">Poster is required</div>
                                        </div>

                                        <div className="row g-3">
                                            <div className="col-6">
                                                <button className="btn btn-primary" type="submit">Add</button>
                                            </div>
                                        </div>
                                    </form>

                                </div>
                            
                    </div>
                </div>
                <div className="col-md-0 col-xl-3"></div>
            </div>

        </>
    );
}

//document.getElementById("formUpdateBtn").addEventListener("")
// if invalid input then event.preventDefault
           
// let validTitle = false;
// let validReleased = false;
// function validateTitle(event){
//     if (event.target.value.length < 1){
//         validTitle = false;
//         event.target.style.backgroundColor = "red";
//     } else {
//         validTitle = true;
//         event.target.backgroundColor = "green";
//     }
// }
// function validateReleased(event){
//     let widget = document.getElementById("form-released");
//     if (event.target.value.length != 8){
//         validReleased = false;
//         widget.style.backgroundColor = "$danger";
//     } else {
//         validReleased = true;
//         widget.style.backgroundColor = "$success";
//     }
// }

//document.getElementById("form-title").addEventListener("input", validateTitle)
// document.getElementById("form-released").addEventListener("input", validateReleased)

// function validateForm(event){
//     if (!validTitle || !validReleased){
//         event.preventDefault();
//         console.log("One or more fields are invalid.")
//     } else {
//         console.log("Submitted valid form.")
//     }
//     //updateMovie(id)
// }

// document.getElementById("form-submit").addEventListener("submit", validateForm)