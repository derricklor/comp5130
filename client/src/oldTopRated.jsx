import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function TopRated() {

    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get("/toprated")
        .then((res) => {
            setData(res.data);
        })
        .catch((err) => console.log(err));

        console.log("get top rated");
    }, []);

    return (
        <h1>Top Rated</h1>
    )
}

export default TopRated