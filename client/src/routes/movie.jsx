import React, { useEffect, useState, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";
import {Link, useParams, Form, useLoaderData } from "react-router-dom";

// export async function getMovie(id) {
    
//     axios.get(`/api/movie/${id}`)
//     .then((res) =>{
//         console.log(res);
//         return res
//     })
//     .catch((err)=> console.log(err))
    
// }

// export async function loader({ params }) {
//   //axios?
//   const movie = await getMovie(params.id);
//   return { movie };
// }

export default function Movie() {
    const {id} = useParams();
    const [singleMovie, setSingleMovie] = useState([])
    useEffect(()=>{
        axios.get(`http://localhost:4000/api/movie/${id}`)
        .then((res) =>{
            setSingleMovie(res.data)
        })
        .catch((err)=> console.log(err))
    }, [])
    
    // const ex_movie = {
    //     title: "sample title",
    //     released: 55556677,
    //     runtime: 5,
    //     director: "sample director",
    //     id: 5,
    //     rating: 5.0,
    //     genre: "sample genre",
    //     plot: "sample plot",
    //     actors: "sample actors",
    //     poster: "sample poster",
    //   };
    //const { movie } = useLoaderData();

    //Make movie/:id pass the movie json to movie/:id/edit, then edit will post changes to server
    return (
        <>
        <div id="movieInfo">
            {singleMovie.map((movie)=>(
                <div key={movie.id}>
                <h2>{movie.title}</h2>
                <img src={movie.poster} alt="movie poster" />
                <p>Release date: {movie.released}</p>
                <p>Runtime: {movie.runtime} mins</p>
                <p>Director: {movie.director}</p>
                <p>Rating: {movie.rating}</p>
                <p>Genre: {movie.genre}</p>
                <p>Plot: {movie.plot}</p>
                <p>Actors: {movie.actors}</p>
                </div>
            ))
            }
            <Link to={`http://localhost:4000/api/movie/${id}/edit`}>edit</Link>

            <form method="post" action="destroy" onSubmit={(event) => {
                    if (!confirm("Please confirm you want to delete this record.")) {
                        event.preventDefault();
                    }
                }}
            >
                <button type="submit">Delete</button>
            </form>
        </div>
        </>
    )
}
