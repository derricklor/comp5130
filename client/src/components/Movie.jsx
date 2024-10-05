import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";


function Movie() {
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
        <div>
            <h1>Movie</h1>
            <Link to="/">Home</Link>
        </div>
    )
}

export default Movie