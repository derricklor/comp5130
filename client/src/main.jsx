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
import LoginRegisterComponent from "./routes/loginregistercomponent";
//import { action as deleteAction } from "./routes/delete";


export function useTokenContext() {
    return React.useContext(TokenContext);
}
export function useUserContext() {
    return React.useContext(UserContext);
}
const TokenContext = React.createContext(null)
const UserContext = React.createContext(null)
export default function Main(){
    const [token, setToken] = React.useState(localStorage.getItem("moviedbtoken"))
    const [user, setUser] = React.useState(null)
    
    // Use context as a way of passing dynamic token and user variables to children components
    // Which then display conditional html. ex if logged in, then display logout button
    return(
    <>
    <BrowserRouter>
        <TokenContext.Provider value={{token, setToken}}>
        <UserContext.Provider value={{user, setUser}}>

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
                        <LoginRegisterComponent/>
                        
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
                
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </UserContext.Provider>
        </TokenContext.Provider>
    </BrowserRouter>
    </>
    )
};