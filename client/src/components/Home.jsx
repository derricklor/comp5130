import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function Home() {

    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get("/")  //default page
        .then((res) => {
            setData(res.data);
        })
        .catch((err) => console.log(err));


    }, [data]);

    return (

<html lang="en">
    <head>
        <title>MovieDB</title>
        <meta charset="utf-8" />
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />

    </head>

    <body>
        <header>
            <nav class="navbar navbar-expand-sm navbar-light bg-light">
                <div class="container">
                    <a class="navbar-brand" href="index.html">Navbar</a>
                    <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="collapsibleNavId">
                        <ul class="navbar-nav me-auto mt-2 mt-lg-0">
                            <li class="nav-item">
                                <Link className="btn btn-success" to="/recentlyreleased">
                                Recently Released
                                </Link>
                            </li>
                            <li class="nav-item">
                                <Link className="btn btn-success" to="/toprated">
                                Top Rated
                                </Link>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="dropdownId" data-bs-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false">Dropdown</a>
                                <div class="dropdown-menu" aria-labelledby="dropdownId">
                                    <a class="dropdown-item" href="#">Action 1</a>
                                    <a class="dropdown-item" href="#">Action 2</a>
                                </div>
                            </li>
                        </ul>
                        <form class="d-flex my-2 my-lg-0">
                            <input class="form-control me-sm-2" type="text" placeholder="Search" />
                            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
                                Search
                            </button>
                        </form>
                    </div>
                </div>
            </nav>
            
             
        </header>
        <main>
            <div class="container">
                <div class="row">
                    {
                        data.map((movie) => {
                            return (
                                <div class="col-4">
                                    <div class="card">
                                        <Link to={`/movie/${movie.id}`}>
                                            <img class="card-img-top" src={`"${movie.poster}"`} alt={`"${movie.title}"`} />
                                            <div class="card-body">
                                                <h4 class="card-title">{movie.title}</h4>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

        </main>
        
        <div class="container">
            <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                <p class="col-md-4 mb-0 text-body-secondary">© 2024 Company, Inc</p>
            
                <a href="/" class="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
                </a>
            
                <ul class="nav col-md-4 justify-content-end">
                <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">Home</a></li>
                <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">Recently Released</a></li>
                <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">About</a></li>
                </ul>
            </footer>
        </div>
        <div class="b-example-divider"></div>
        
    </body>
</html>

   
    )
}

export default Home