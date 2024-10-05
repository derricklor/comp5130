import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import Home from "./components/Home";
import RecentlyReleased from "./components/RecentlyReleased";
import TopRated from "./components/TopRated";
import Movie from "./components/Movie";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/recentlyreleased" element={<RecentlyReleased/>}/>
        <Route path="/toprated" element={<TopRated/>}/>
        <Route path="/movie/:id" element={<Movie/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App