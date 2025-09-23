import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom"
import { useUserContext } from "../main"



export default function AddMovieButton(){
    const {user, setUser} = useUserContext();
    
    return (
        <>
            {
                user?.auth == "admin"?
                    <li className="nav-item">
                        <Link className="nav-link" to="/movie/add">
                            <button type="button" className="btn btn-primary">Add Movie</button>
                        </Link>
                    </li>
                : 
                <></>
            }
        </>
    )
};

//<input className="form-control" type="search" placeholder="Search" aria-label="Search"/>