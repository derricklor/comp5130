import React, { useEffect, useState, useContext } from "react";
import { Link, redirect, useNavigate } from "react-router-dom"
import axios from "axios"
import { useNetworkContext } from "../main"


let searchSubmitTimerId=null;
let seachTimerLength= 1000;


export default function SearchBar(){
    const navigate = useNavigate()
    const [searchResults, setSearchResults] = useState([])
    const {network, setNetwork} = useNetworkContext()

    // inner function for firing API call to search for movie
    function searchForQuery(){
        let input = document.getElementById("searchbar").value
        console.log(input)
        axios.get(`http://${network.host}:${network.serverPort}/api/search/${input}`)
            .then((res) => {
                
                setSearchResults(res.data)
            })
            .catch((err) => console.log(err))
    }
    // inner function to reset the countdown timer, fires searchForQuery after seachTimerLength interval
    function resetCountdown(){
        clearTimeout(searchSubmitTimerId);
        //clear all old child nodes search results from datalistOptions
        //document.getElementById("datalistOptions").innerHTML = ""
        if (document.getElementById("searchbar").value){
            searchSubmitTimerId = setTimeout( searchForQuery, seachTimerLength)
        }
    }
    // external window hook to add event listeners
    useEffect(()=>{
        document.getElementById("searchbar").addEventListener("keyup", resetCountdown)
        
    }, []);
    

    return (
        <>

            <div className="d-flex col-8 me-1 dropdown">
                <input className="dropdown-toggle" id="searchbar" data-bs-toggle="dropdown" aria-expanded="false" 
                        placeholder="Type to search..."/>
        
                <ul className="dropdown-menu" id="resultOptions">
                    {searchResults?.length > 0 ?
                        searchResults.map((movie, index) => (
                            //index used for mapping each movie so react doesn't complain
                            <li className="dropdown-item" key={index}>
                                <Link reloadDocument to={`http://${network.host}:${network.clientPort}/movie/${movie.id}`} >{movie.title}</Link>
                            </li>
                        )) 
                    : //no results from db
                    <li className="dropdown-item" disabled>No results found.</li>
                    }
                </ul>
            </div>
        </>
    )
};

//<input className="form-control" type="search" placeholder="Search" aria-label="Search"/>