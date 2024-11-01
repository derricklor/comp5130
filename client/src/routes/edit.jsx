import React, { useEffect, useState } from "react";
import axios from "axios"
import { Form, useParams, redirect, useNavigate } from "react-router-dom"



// function deleteMovie(id) {
//     axios.post(`http://localhost:4000/api/movie/${id}/delete`)
//       .then((res) => {
//         console.log(res);
//       })
//       .catch((err) => console.log(err))
  
//     return redirect("/");
//   }

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
    // director
    // rating
    // genre
    // plot
    // actors
    // poster
    return true
}


export default function EditMovie() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [singleMovie, setSingleMovie] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:4000/api/movie/${id}`)
            .then((res) => {
                setSingleMovie(res.data)
            })
            .catch((err) => console.log(err))
    }, [])

    // Define an inner function for updating movies, when form is submitted.
    // This inner function has access to outer function's variables.
    function updateMovie(e) {
        e.preventDefault(); //prevent page reload
        //get form data and put into JSON of updates
        let myUpdates = {
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
        if (!validateUpdate(myUpdates)){
            return  // errors in the form, show invalid inputs
        }
        // send the post request to server
        axios.post(`http://localhost:4000/api/movie/${id}/update`, myUpdates)
            .then((res) => {
                if (res.data.error){
                    alert(`${res.data.error}`)
                } else {
                    alert(`${res.data.message}`)
                }
            })
            .catch((err) => {
                console.log(err)
            })
        //return redirect(`/movie/${id}`);
    }

    // Define an inner function for deleting movies, when delete button is confirmed.
    // This inner function has access to outer function's variables.
    function deleteMovie(e) {
        e.preventDefault();//prevent form submit
        //get hashed key from session storage
        let key = sessionStorage.getItem("sessionKey")
        if (key == null){
            alert("Permission denied.")
            return
        }
        // send the post delete request to server with json obj
        axios.post(`http://localhost:4000/api/movie/${id}/delete`, {hashKey: key})
            .then((res) => {
                if (res.data.error){
                    alert(`${res.data.error}`)
                } else {
                    alert(`${res.data.message}`)
                }
            })
            .catch((err) => {
                console.log(err)
            })
        return redirect(`/`);
    }

    // <Form> for router
    return (
        <>  
            <div className="row g-1 p-1">
                <div className="col-md-0 col-xl-3"></div>
                <div className="col-md-12 col-xl-6">
                    <div className="row">
                        <h1 className="m-4 text-start">Edit</h1>
                        {singleMovie?.length > 0 ?
                            singleMovie.map((movie) => (

                                <div id="movieform" key={movie.id}>
                                    <p>
                                        <button type="button" className="btn btn-secondary" onClick={() => { navigate(-1); }}>Cancel</button>
                                    </p>
                                    <form className="row g-3 was-validated" onSubmit={updateMovie}>
                                        <div className="col-md-6">
                                            <label htmlFor="form-title" className="form-label">Title</label>
                                            <input type="text" className="form-control" id="form-title" name="title" defaultValue={movie.title} maxLength={255} required />
                                            <div className="valid-feedback">Valid.</div>
                                            <div className="invalid-feedback">Title is required</div>
                                        </div>
                                        <div className="col-md-3">
                                            <label htmlFor="form-released" className="form-label">Released</label>
                                            <input type="date" className="form-control" id="form-released" name="released" defaultValue={movie.released} placeholder="mmddyyyy" required />
                                            <div className="valid-feedback">Valid.</div>
                                            <div className="invalid-feedback">Release date is required</div>
                                        </div>
                                        <div className="col-md-2">
                                            <label htmlFor="form-runtime" className="form-label">Runtime</label>
                                            <input type="number" className="form-control" id="form-runtime" name="runtime" defaultValue={movie.runtime} placeholder={0} min={0} max={999} step={1} required />
                                            <div className="valid-feedback">Valid.</div>
                                            <div className="invalid-feedback">Runtime is required</div>
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="form-director" className="form-label">Director</label>
                                            <input type="text" className="form-control" id="form-director" name="director" defaultValue={movie.director} placeholder="..." required />
                                            <div className="valid-feedback">Valid.</div>
                                            <div className="invalid-feedback">Director is required</div>
                                        </div>
                                        <div className="col-md-2">
                                            <label htmlFor="form-rating" className="form-label">Rating</label>
                                            <input type="number" className="form-control" id="form-rating" name="rating" min={0} max={10} step={0.1} defaultValue={movie.rating} required />
                                            <div className="valid-feedback">Valid.</div>
                                            <div className="invalid-feedback">Rating is required</div>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="form-genre" className="form-label">Genre</label>
                                            <input type="text" className="form-control" id="form-genre" name="genre" defaultValue={movie.genre} placeholder="..." required />
                                            <div className="valid-feedback">Valid.</div>
                                            <div className="invalid-feedback">Genre is required</div>
                                        </div>
                                        <div className="col-md-12">
                                            <label htmlFor="form-plot" className="form-label">Plot</label>
                                            <textarea className="form-control" id="form-plot" rows="3" name="plot" defaultValue={movie.plot} placeholder="..." required>
                                            </textarea>
                                            <div className="valid-feedback">Valid.</div>
                                            <div className="invalid-feedback">Plot is required</div>
                                        </div>
                                        <div className="col-md-12">
                                            <label htmlFor="form-actors" className="form-label">Actors</label>
                                            <textarea className="form-control" id="form-actors" rows="2" name="actors" defaultValue={movie.actors} placeholder="..." required>
                                            </textarea>
                                            <div className="valid-feedback">Valid.</div>
                                            <div className="invalid-feedback">Actors is required</div>
                                        </div>
                                        <div className="col-md-12">
                                            <label htmlFor="form-poster" className="form-label">Poster Image</label>
                                            <textarea className="form-control" id="form-poster" rows="2" name="poster" defaultValue={movie.poster} placeholder="..." required>
                                            </textarea>
                                            <div className="valid-feedback">Valid.</div>
                                            <div className="invalid-feedback">Poster is required</div>
                                        </div>

                                        <div className="row g-3">
                                            <div className="col-6">
                                                <button className="btn btn-primary" type="submit">Update</button>
                                            </div>
                                            <div className="col-6">
                                                <button className="btn btn-danger" onClick={(event) => {
                                                    if (!confirm("Confirm you want to delete this movie.")) {
                                                        event.preventDefault();//prevent form submit if cancel
                                                    } else {
                                                        deleteMovie(event);//run delete function for current movie displayed
                                                    }
                                                }}>Delete</button>
                                            </div>
                                        </div>
                                    </form>

                                </div>
                            )) : (
                                <p>Could not get data.</p>
                            )
                        }
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