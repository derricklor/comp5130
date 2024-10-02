import React, { useEffect, useState } from "react";
import axios from "axios";
import React, { useEffect, useState} from "react";
import {Link} from "react-router-dom";

function Home() {

    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get("/frontpage")
        .then((res) => {
            setData(res.data);
        })
        .catch((err) => console.log(err));


    }, []);

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
            <div id="carouselId" class="carousel slide" data-bs-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-bs-target="#carouselId" data-bs-slide-to="0" class="active" aria-current="true"
                        aria-label="First slide"></li>
                    <li data-bs-target="#carouselId" data-bs-slide-to="1" aria-label="Second slide"></li>
                    <li data-bs-target="#carouselId" data-bs-slide-to="2" aria-label="Third slide"></li>
                </ol>
                <div class="carousel-inner" role="listbox">
                    <div class="carousel-item active">
                        <img src="holder.js/900x500/auto/#777:#555/text:First slide" class="w-100 d-block" alt="First slide" />
                    </div>
                    <div class="carousel-item">
                        <img src="holder.js/900x500/auto/#666:#444/text:Second slide" class="w-100 d-block" alt="Second slide" />
                    </div>
                    <div class="carousel-item">
                        <img src="holder.js/900x500/auto/#666:#444/text:Third slide" class="w-100 d-block" alt="Third slide" />
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselId" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselId" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-4">
                        <div class="card">
                            <img class="card-img-top" src="holder.js/100x180/" alt="Title" />
                            <div class="card-body">
                                <h4 class="card-title">Title</h4>
                                <p class="card-text">Text</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-4">
                        <div class="card">
                            <img class="card-img-top" src="holder.js/100x180/" alt="Title" />
                            <div class="card-body">
                                <h3 class="card-title">Title</h3>
                                <p class="card-text">Text</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="card">
                            <img class="card-img-top" src="holder.js/100x180/" alt="Title" />
                            <div class="card-body">
                                <h3 class="card-title">Title</h3>
                                <p class="card-text">Text</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-4">
                        <div class="card">
                            <img class="card-img-top" src="holder.js/100x180/" alt="Title" />
                            <div class="card-body">
                                <h4 class="card-title">Title</h4>
                                <p class="card-text">Text</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-4">
                        <div class="card">
                            <img class="card-img-top" src="holder.js/100x180/" alt="Title" />
                            <div class="card-body">
                                <h3 class="card-title">Title</h3>
                                <p class="card-text">Text</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="card">
                            <img class="card-img-top" src="holder.js/100x180/" alt="Title" />
                            <div class="card-body">
                                <h3 class="card-title">Title</h3>
                                <p class="card-text">Text</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-4">
                        <div class="card">
                            <img class="card-img-top" src="holder.js/100x180/" alt="Title" />
                            <div class="card-body">
                                <h4 class="card-title">Title</h4>
                                <p class="card-text">Text</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-4">
                        <div class="card">
                            <img class="card-img-top" src="holder.js/100x180/" alt="Title" />
                            <div class="card-body">
                                <h3 class="card-title">Title</h3>
                                <p class="card-text">Text</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="card">
                            <img class="card-img-top" src="holder.js/100x180/" alt="Title" />
                            <div class="card-body">
                                <h3 class="card-title">Title</h3>
                                <p class="card-text">Text</p>
                            </div>
                        </div>
                    </div>
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