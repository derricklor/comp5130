import { useContext, createContext, useState } from "react";
import * as ReactDOM from "react-dom/client";
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
} from "react-router-dom";

import Home from "./routes/home";
import RecentlyReleased from "./routes/recentlyreleased";
import TopRated from "./routes/toprated";
import ErrorPage from "./routes/errorpage";
import Movie from "./routes/movie";
import AddMovie from "./routes/add";
import EditMovie from "./routes/edit";
import LoginRegisterComponent from "./components/loginregistercomponent";
import SearchBar from "./components/searchbar";
import AddMovieButton from "./components/addmoviebutton";
//import { action as deleteAction } from "./routes/delete";

function toggleTheme(){
    let html = document.getElementsByTagName("html")[0]
    if (html.hasAttribute("data-bs-theme")){
        html.removeAttribute("data-bs-theme")
    } else {
        html.setAttribute("data-bs-theme", "dark")
    }
    return
}

export function useTokenContext() {
    return useContext(TokenContext);
}
export function useUserContext() {
    return useContext(UserContext);
}
const TokenContext = createContext(null)
const UserContext = createContext(null)
export default function Main(){
    const [token, setToken] = useState(localStorage.getItem("moviedbtoken"))
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
    
    // Use context as a way of passing dynamic token and user variables to children components
    // Which then display conditional html. ex if logged in, then display logout button
    return(
    <>
    <BrowserRouter>
        <TokenContext.Provider value={{token, setToken}}>
        <UserContext.Provider value={{user, setUser}}>

            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <Link className="navbar-brand me-auto d-lg-none" to="/">MovieDB</Link>
                    <button className="navbar-toggler" type="button"
                        data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <Link className="navbar-brand d-none d-lg-block" to="/">MovieDB</Link>
                            <li className="nav-item">
                                <Link className="nav-link " to="/recentlyreleased">Recently Released</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/toprated">Top Rated</Link>
                            </li>
                            <AddMovieButton/>
                            <li className="nav-item">
                                <SearchBar/>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-outline-secondary me-2" title="changeTheme" onClick={toggleTheme}>&#9680;</button>
                            </li>
                            <li className="nav-item">
                                <LoginRegisterComponent/>
                            </li>
                        </ul>
                        
                        <hr />
                    </div>
                </div>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/recentlyreleased" element={<RecentlyReleased />} />
                <Route path="/toprated" element={<TopRated />} />
                <Route path="/movie/add" element={<AddMovie />} />
                <Route path="/movie/:id" element={<Movie />} />
                <Route path="/movie/:id/edit" element={<EditMovie />} />
                
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </UserContext.Provider>
        </TokenContext.Provider>
    </BrowserRouter>
    </>
    )
};