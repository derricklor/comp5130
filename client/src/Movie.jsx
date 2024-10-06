import React, { useEffect, useState, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
//import './index.css'

createRoot(document.getElementById("root")).render(
    //<StrictMode>
      <Movie />
    //</StrictMode>,
  )

function Movie() {
    const {id} = useParams();
    console.log("id:"+id)
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
        </div>
    )
}

export default Movie