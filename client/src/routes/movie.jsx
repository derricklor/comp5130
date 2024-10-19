import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";


export default function Movie() {
    const { id } = useParams();
    const [singleMovie, setSingleMovie] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:4000/api/movie/${id}`)
            .then((res) => {
                setSingleMovie(res.data)
            })
            .catch((err) => console.log(err))
    }, [])

    return (
        <>

            {singleMovie?.length > 0 ?
                singleMovie.map((movie) => (
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
                        <Link to={`http://localhost:3000/movie/${id}/edit`}>edit</Link>
                        
                    </div>
                )) : (
                    <p>Could not get data.</p>
                )
            }
        </>
    )
}
