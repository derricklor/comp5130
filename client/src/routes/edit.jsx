import React, { useEffect, useState } from "react";
import axios from "axios"
import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom"

function updateMovie(id) {
    //get form data

    //put into array of

    axios.post(`/movie/${id}/edit`, updates)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => console.log(err))


    return redirect(`/movie/${params.id}`);
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
            <form method="post" id="movie-form" action={`http://localhost:4000/api/movie/${id}/edit`}>
                <label>
                    <span>Title</span>
                    <input type="text" id="form-title" name="title" placeholder="Title" defaultValue={singleMovie[0].title} maxLength={255} required/>
                </label>
                <label>
                    <span>Released</span>
                    <input type="number" id="form-released" name="released" placeholder="YYYYMMDD" defaultValue={singleMovie[0].released} min={17000101} max={20991231} required/>
                </label>
                <label>
                    <span>Runtime</span>
                    <input type="number" id="form-runtime" name="runtime" placeholder="# in minutes" defaultValue={singleMovie[0].runtime} min={0} max={999}/>
                </label>
                <label>
                    <span>Director</span>
                    <input type="text" id="form-director" name="director" placeholder="director name" defaultValue={singleMovie[0].director} maxLength={255}/>
                </label>
                <label>
                    <span>Rating</span>
                    <input type="number" id="form-rating" name="rating" placeholder="0.0 to 10.0" defaultValue={singleMovie[0].rating} min={0} max={10}/>
                </label>
                <label>
                    <span>Genre</span>
                    <input type="text" id="form-plot" name="plot" placeholder="less than 255 chars" defaultValue={singleMovie[0].genre} maxLength={255}/>
                </label>
                <label>
                    <span>Plot</span>
                    <textarea id="form-plot" name="plot" placeholder="less than 255 chars" defaultValue={singleMovie[0].plot} rows={3} maxLength={255}/>
                </label>
                <label>
                    <span>Actors</span>
                    <input type="text" id="form-actors" name="actors" placeholder="less than 255 chars" defaultValue={singleMovie[0].actors} maxLength={255}/>
                </label>
                <label>
                    <span>Poster URL</span>
                    <input type="text" id="form-poster" name="poster" placeholder="less than 255 chars" defaultValue={singleMovie[0].poster} maxLength={255}/>
                </label>
                <p>
                    <button type="submit" id="form-submit">Save</button>
                    <button type="button" onClick={() => { navigate(-1); }}>Cancel</button>
                </p>
            </form>
        </>
    );
}
let validTitle = false;
let validReleased = false;
function validateTitle(event){
    let widget = document.getElementById("form-title");
    if (event.target.value.length < 1){
        validTitle = false;
        widget.style.backgroundColor = "$danger";
    } else {
        validTitle = true;
        widget.style.backgroundColor = "$success";
    }
}
function validateReleased(event){
    let widget = document.getElementById("form-released");
    if (event.target.value.length != 8){
        validReleased = false;
        widget.style.backgroundColor = "$danger";
    } else {
        validReleased = true;
        widget.style.backgroundColor = "$success";
    }
}

document.getElementById("form-title").addEventListener("input", validateTitle)
document.getElementById("form-released").addEventListener("input", validateReleased)

function validateForm(event){
    if (!validTitle || !validReleased){
        event.preventDefault();
        console.log("One or more fields are invalid.")
    } else {
        console.log("Submitted valid form.")
    }
    //updateMovie(id)
}

document.getElementById("form-submit").addEventListener("submit", validateForm)