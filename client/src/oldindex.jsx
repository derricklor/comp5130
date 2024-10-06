import React, { useEffect, useState, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";
//import './index.css'

createRoot(document.getElementById("root")).render(
  //<StrictMode>
    <Index />
  //</StrictMode>,
)


function Index() {

    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get("/home")  //default page
        .then((res) => {
            setData(res.data);
        })
        .catch((err) => console.log(err));
    }, []);

    return (
    <div className="container">
        <div className="row">
            {   
            //console.log(data)
            //   data.map((movie) =>{
            //         return (
            //             <div className="col-4">
            //                 <div className="card">
            //                     <Link to={`/movie/${movie.id}`}>
            //                         <img className="card-img-top" src={`"${movie.poster}"`} alt={`"${movie.title}"`} />
            //                         <div className="card-body">
            //                             <h4 className="card-title">{movie.title}</h4>
            //                         </div>
            //                     </Link>
            //                 </div>
            //             </div>
            //         )
            //   })
            }
        </div>
    </div>
    )
}

export default Index
