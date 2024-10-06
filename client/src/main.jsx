import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

import Root, { 
    loader as rootLoader,
    action as rootAction,
} from "./routes/root";

import Index from "./routes/index";
import ErrorPage from "./errorpage";
import Movie, { loader as movieLoader } from "./routes/movie";
import EditMovie, { action as editAction } from "./routes/edit";
import { action as deleteAction } from "./routes/delete";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        loader: rootLoader,
        action: rootAction,
        children: [
            { index: true, element: <Index /> },
            {
                path: "movie/:id",
                element:<Movie />,
                loader: movieLoader,
            },
            {
                path: "movie/:id/edit",
                element: <EditMovie />,
                loader: movieLoader,
                action: editAction,
            },
            {
                path: "movie/:id/delete",
                action: deleteAction,//no loader, because we just want to delete
                errorElement: <div>Oops! There was an error.</div>,
            },
        ],
    },
  ]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );