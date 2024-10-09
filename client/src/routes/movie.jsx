import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";


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
    //     title: "sample title", released: 55556677,
    //     runtime: 5, director: "sample director",
    //     id: 5, rating: 5.0,
    //     genre: "sample genre", plot: "sample plot",
    //     actors: "sample actors", poster: "sample poster",
    //   };
    //const { movie } = useLoaderData();

    //Make movie/:id pass the movie json to movie/:id/edit, then edit will post changes to server
    return (
        <>
        
            {singleMovie?.length > 0 ?
                singleMovie.map((movie)=>(
                <div id="movieInfo" key={movie.id}>
                    <h2>{movie.title}</h2>
                    <img src={movie.poster} alt="movie poster" />
                    <p>Release date: {movie.released}</p>
                    <p>Runtime: {movie.runtime} mins</p>
                    <p>Director: {movie.director}</p>
                    <p>Rating: {movie.rating}</p>
                    <p>Genre: {movie.genre}</p>
                    <p>Plot: {movie.plot}</p>
                    <p>Actors: {movie.actors}</p>
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
            )) : (
                <p>Could not get data.</p>
            )
            }
        </>
    )
}
