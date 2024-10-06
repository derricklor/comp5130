import React, { useEffect, useState, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";
import {Link, useParams, Form, useLoaderData } from "react-router-dom";
import { getMovie } from "../movies";

export async function loader({ params }) {
  //axios?
  const movie = await getMovie(params.id);
  return { movie };
}

export default function Movie() {
    const ex_movie = {
        title: "sample title",
        released: 55556677,
        runtime: 5,
        director: "sample director",
        id: 5,
        rating: 5.0,
        genre: "sample genre",
        plot: "sample plot",
        actors: "sample actors",
        poster: "sample poster",
      };
    const { movie } = useLoaderData();

    const {id} = useParams();
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get(`/movie/:${id}`)
        .then((res) => {
            setData(res.data);
        })
        .catch((err) => console.log(err));
    }, [id]);

    return (
        <div id="movie_info">
            <h2>{ex_movie.title}</h2>
            <img src="{ex_movie.poster}" alt="movie poster" />
            <p>Release date: {ex_movie.released}</p>
            <p>Runtime: {ex_movie.runtime} mins</p>
            <p>Director: {ex_movie.director}</p>
            <p>Rating: {ex_movie.rating}</p>
            <p>Genre: {ex_movie.genre}</p>
            <p>Plot: {ex_movie.plot}</p>
            <p>Actors: {ex_movie.actors}</p>

            <Form method="post" action="destroy" onSubmit={(event) => {
                    if (!confirm("Please confirm you want to delete this record.")) {
                        event.preventDefault();
                    }
                }}
            >
                <button type="submit">Delete</button>
            </Form>
        </div>
        
    )
}
