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
import { action as deleteAction } from "./routes/delete";


ReactDOM.createRoot(document.getElementById("root")).render(
    
    <BrowserRouter>
        
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">MovieDB</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
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
                        <li className="nav-item">
                            <Link className="nav-link disabled">List</Link>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <button className="btn btn-outline-success" type="submit">
                            Search
                        </button>
                    </form>
                </div>
            </div>
        </nav>

        <Routes>
            <Route path="/" element={<Index/>} />
            <Route path="/recentlyreleased" element={<RecentlyReleased/>} />
            <Route path="/toprated" element={<TopRated/>} />
            <Route path="/movie/:id" element={<Movie/>} />
            <Route path="/movie/:id/edit" element={<EditMovie />} />
            <Route path="/movie/:id/delete" action={deleteAction} />
            <Route path="/movie/*" element={<Index/>} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    </BrowserRouter>
   
  );

  //Make movie/:id pass the movie json to movie/:id/edit, then edit will post changes to server
