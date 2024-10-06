import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import Index from "./index";
import RecentlyReleased from "./RecentlyReleased";
import TopRated from "./TopRated";
import Movie from "./Movie";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index/>}/>
        <Route path="/recentlyreleased" element={<RecentlyReleased/>}/>
        <Route path="/toprated" element={<TopRated/>}/>
        <Route path="/movie/:id" element={<Movie/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;