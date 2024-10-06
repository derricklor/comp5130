import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import Index from "./index";
import RecentlyReleased from "./RecentlyReleased";
import TopRated from "./TopRated";
import Movie from "./routes/movie";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="dashboard" element={<Dashboard />} />
      {/* ... etc. */}
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

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