import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function RecentlyReleased() {

    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get("/recentlyreleased")
        .then((res) => {
            setData(res.data);
        })
        .catch((err) => console.log(err));


    }, []);

    return (
        <h1>Recently Released</h1>
    )
}

export default RecentlyReleased