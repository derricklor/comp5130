import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNetworkContext } from "../main"

export default function TopRated() {
    
    const [movieList, setMovieList] = useState([])
    const {network, setNetwork} = useNetworkContext()

    useEffect(() => {
        axios.get(`http://${network.host}:${network.serverPort}/api/toprated`)
            .then((res) => {
                setMovieList(res.data)
            })
            .catch((err) => console.log(err))
    }, [])

    return (
        <>
            <div className="row g-1 p-1">
                <div className="col-1"></div>
                <div className="col-10">
                    <div className="row">
                        <h1 className="m-4 text-start">Top Rated</h1>
                        {movieList?.length > 1 ?
                            movieList.map((movie) => (
                                <div className="card m-2" key={movie.id} style={{ maxWidth: 520 }}>
                                    <div className="row g-0">
                                        <div className="col-sm-12 col-md-4">
                                            <Link to={`${network.host}:${network.clientPort}/movie/${movie.id}`}>
                                                <img src={movie.poster} className="img-fluid rounded-start " alt={`${movie.title} poster`} />
                                            </Link>
                                        </div>
                                        <div className="col-sm-4 col-md-8">
                                            <div className="card-body">
                                                <h5 className="card-title">{movie.title}</h5>
                                                <span>{movie.rating}/10</span>
                                                <p className="card-text">
                                                    {movie.plot}
                                                </p>
                                                <p className="card-text">
                                                    <small className="text-body-secondary">Released: {movie.released}</small>
                                                </p>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )) : (
                                <p>Could not get data.</p>
                            )
                        }
                    </div>
                </div>
                <div className="col-1"></div>
            </div>
        </>
    )
}