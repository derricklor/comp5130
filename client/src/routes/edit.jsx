import React, { useEffect, useState } from "react";
import axios from "axios"
import { Form, useParams, redirect, useNavigate } from "react-router-dom"



function updateMovie(id) {
    //get form data

    //put into array of

    axios.post(`http://localhost:4000/api/movie/${id}/update`, updates)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => console.log(err))


    return redirect(`/movie/${params.id}`);
}

function deleteMovie(id) {
    axios.post(`http://localhost:4000/api/movie/${id}/delete`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err))
  
    return redirect("/");
  }

// export async function action({ request, params }) {
//     const formData = await request.formData();
//     const updates = Object.fromEntries(formData);
//     await updateMovie(params.id, updates);
//     return redirect(`/movie/${params.id}`);
// }

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

    // <Form> for router
    return (
        <>
            {singleMovie?.length > 0 ?
                singleMovie.map((movie) => (

                    <div id="movieform" key={movie.id}>
                        <p>
                            <button type="button" className="btn btn-secondary" onClick={() => { navigate(-1); }}>Cancel</button>
                        </p>
                        <form className="row g-3 needs-validation" noValidate action="">
                            <div className="col-md-4">
                                <label htmlFor="form-title" className="form-label">Title</label>
                                <input type="text" className="form-control" id="form-title" defaultValue={movie.title} maxLength={255} required />
                                <div className="invalid-feedback">Title is required</div>
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="form-released" className="form-label">Released</label>
                                <input type="text" className="form-control" id="form-released" defaultValue={movie.released} min={10000101} max={99991231} step={1} required />
                                <div className="invalid-feedback">Release date is required</div>
                            </div>
                            <div className="col-md-2">
                                <label htmlFor="form-runtime" className="form-label">Runtime</label>
                                <input type="text" className="form-control" id="form-runtime" defaultValue={movie.runtime} placeholder={0} required />
                                <div className="invalid-feedback">Runtime is required</div>
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="form-director" className="form-label">Director</label>
                                <input type="text" className="form-control" id="form-director" defaultValue={movie.director} placeholder="..." required />
                                <div className="invalid-feedback">Director is required</div>
                            </div>
                            <div className="col-md-2">
                                <label htmlFor="form-rating" className="form-label">Rating</label>
                                <input type="number" className="form-control" id="form-rating" min={0} max={10} step={0.1} defaultValue={movie.rating} required/>
                                <div className="invalid-feedback">Rating is required</div>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="form-genre" className="form-label">Genre</label>
                                <input type="text" className="form-control" id="form-genre" defaultValue={movie.genre} placeholder="..." required/>
                                <div className="invalid-feedback">Genre is required</div>
                            </div>
                            <div className="col-md-12">
                                <label htmlFor="form-plot" className="form-label">Plot</label>
                                <textarea className="form-control" id="form-plot" rows="3" defaultValue={movie.plot} placeholder="..." required>
                                </textarea>
                                
                                <div className="invalid-feedback">Plot is required</div>
                            </div>
                            <div className="col-md-12">
                                <label htmlFor="form-actors" className="form-label">Actors</label>
                                <textarea className="form-control" id="form-actors" rows="2" defaultValue={movie.actors} placeholder="..." required>
                                </textarea>
                                <div className="invalid-feedback">Actors is required</div>
                            </div>
                            
                            <div className="row g-3">
                                <div className="col-6">
                                    <button className="btn btn-primary" type="submit">Update</button>
                                </div>
                                <div className="col-6">
                                    <button className="btn btn-danger" onClick={(event) => {
                                        if (!confirm("Confirm you want to delete this movie.")){
                                            event.preventDefault();
                                        }
                                        //run delete function
                                        deleteMovie(id);
                                    }}>Delete</button>
                                </div>
                            </div>
                        </form>
                        
                    </div>
                )) : (
                    <p>Could not get data.</p>
                )
            }
            

        </>
    );
}


           
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