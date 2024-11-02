import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
} from "react-router-dom";


import Index from "./routes/index";
import RecentlyReleased from "./routes/recentlyreleased";
import TopRated from "./routes/toprated";
import ErrorPage from "./routes/errorpage";
import Movie from "./routes/movie";
import EditMovie from "./routes/edit";
import Login from "./routes/login";
import Register from "./routes/register";
import { action as deleteAction } from "./routes/delete";

function toggle(){
    
}

ReactDOM.createRoot(document.getElementById("root")).render(

    <BrowserRouter>
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">MovieDB</Link>
                <button
                    className="navbar-toggler" type="button"
                    data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link " to="/recentlyreleased">Recently Released</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/toprated">Top Rated</Link>
                        </li>
                    </ul>
                    <form className="d-flex me-5" role="search" id="search">
                        <input className="form-control " type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                    { }
                    <ul className="navbar-nav mb-2 mb-lg-0">
                    <Link className="nav-link" to="/login">
                        <button type="button" className="btn btn-primary" id="loginBtn">Login</button>
                    </Link>
                    <Link className="nav-link" to="/register">
                        <button type="button" className="btn btn-outline-primary ms-1" id="registerBtn">Register</button>
                    </Link>
                    </ul>
                    <hr />
                </div>
            </div>
        </nav>

        <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/recentlyreleased" element={<RecentlyReleased />} />
            <Route path="/toprated" element={<TopRated />} />
            <Route path="/movie/:id" element={<Movie />} />
            <Route path="/movie/:id/edit" element={<EditMovie />} />
            <Route path="/movie/:id/delete" action={deleteAction} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    </BrowserRouter>

);
