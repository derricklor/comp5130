import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useTokenContext, useUserContext } from "../main"


export default function Movie() {
    const { id } = useParams();
    const [singleMovie, setSingleMovie] = useState([])

    const {user, setUser} = useUserContext()
    //const [token, setToken] = useTokenContext()
    useEffect(() => {
        axios.get(`http://localhost:4000/api/movie/${id}`)
            .then((res) => {
                setSingleMovie(res.data)
            })
            .catch((err) => console.log(err))
    }, [])

    return (
        <>
            <div className="row g-1 p-1">
                <div className="col-2"></div>
                <div className="col-8">
                    <div className="row">
                        {singleMovie?.length > 0 ?
                            singleMovie.map((movie) => (
                                <div id="movieInfo" key={movie.id}>
                                    <h1>{movie.title}</h1>
                                    <img src={movie.poster} alt="movie poster" />
                                    <p>Release date: {movie.released}</p>
                                    <p>Runtime: {movie.runtime} mins</p>
                                    <p>Director: {movie.director}</p>
                                    <p>Rating: {movie.rating}</p>
                                    <p>Genre: {movie.genre}</p>
                                    <p>Plot: {movie.plot}</p>
                                    <p>Actors: {movie.actors}</p>
                                    {
                                    
                                    user?.auth == "admin" ?
                                    <Link to={`http://localhost:3000/movie/${id}/edit`}>
                                        <button className="btn btn-primary">Edit</button>
                                    </Link>
                                        : <></>
                                    }

                                </div>
                            )) : (
                                <p>Could not get data.</p>
                            )
                        }
                    </div>
                </div>
                <div className="col-2"></div>
            </div>
        </>
    )
}
