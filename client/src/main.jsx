import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";

import Root, { 
    loader as rootLoader,
    action as rootAction,
} from "./routes/root";

import Index from "./routes/index";
import RecentlyReleased from "./routes/recentlyreleased";
import TopRated from "./routes/toprated";
import ErrorPage from "./routes/errorpage";
import Movie, { loader as movieLoader } from "./routes/movie";
import EditMovie, { action as editAction } from "./routes/edit";
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


//const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <Root />,
//         errorElement: <ErrorPage />,
//         loader: rootLoader,
//         action: rootAction,
//         children: [
//             { index: true, element: <Index /> },
//             {
//                 path: "movie/:id",
//                 element:<Movie />,
//                 loader: movieLoader,
//             },
//             {
//                 path: "movie/:id/edit",
//                 element: <EditMovie />,
//                 loader: movieLoader,
//                 action: editAction,
//             },
//             {
//                 path: "movie/:id/delete",
//                 action: deleteAction,//no loader, because we just want to delete
//                 errorElement: <div>Oops! There was an error.</div>,
//             },
//         ],
//     },
//   ]);