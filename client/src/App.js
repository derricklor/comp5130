import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import Home from "elements/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/recentlyreleased" element={<RecentlyReleased/>}/>
        <Route path="/toprated" element={<TopRated/>}/>
        <Route path="/movie/:id" element={<Movie/>}/>
        <Route path="/people/:id" element={<People/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App