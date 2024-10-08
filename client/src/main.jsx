import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
    BrowserRouter,
    Routes,
    Route,
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
        <Routes>
            <Route path="/" element={<Index/>} />
            <Route path="/recentlyreleased" element={<RecentlyReleased/>} />
            <Route path="/toprated" element={<TopRated/>} />
            <Route path="/movie/:id" element={<Movie/>} />  
            <Route path="/movie/:id/edit" element={<EditMovie />} />
            <Route path="/movie/:id/delete" action={deleteAction} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    </BrowserRouter>
   
  );

  //Make movie/:id pass the movie json to movie/:id/edit, then edit will post changes to server