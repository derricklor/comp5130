import { Link, Outlet, useLoaderData, Form, redirect } from "react-router-dom";
import axios from "axios"

function Log(str){
    console.log(str);
}

export async function createMovie() {
    await axios.post(`/movie/create`)
    .then((res) =>{
        console.log(res);
        return res // should return json of new movie
    })
    .catch((err)=> console.log(err))
    
}

export async function getMovies() {
    axios.get(`/recentlyreleased`)
    .then((res) =>{
        console.log(res);
        return res // should return json of newly released movies
    })
    .catch((err)=> console.log(err))
    
}

export async function action() {
    const movie = await createMovie();
    return redirect(`/movie/${movie.id}/edit`);
  }

export async function loader() {
    const movies = await getMovies();
    return { movies };
}

export default function Root() {
    const { movies } = useLoaderData();
    Log(`movies array length`)
    console.log(movies)
    return (
        <>
        <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{ width: 280 }}>
            <Link to={`/`} className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <svg className="bi me-2" width="16" height="16"><use xlinkHref="#home"></use></svg>
                <span className="fs-4">MovieDB</span>
            </Link>
            <hr/>
                <ul className="nav nav-pills flex-column mb-auto">
                    <li>
                        <Link to={`/recentlyreleased`}>
                            <svg className="bi me-2" width="16" height="16"><use xlinkHref="#table"></use></svg>
                            Recently Released
                        </Link>
                    </li>
                    <li>
                        <Link to={`/toprated`}>
                            <svg className="bi me-2" width="16" height="16"><use xlinkHref="#speedometer2"></use></svg>
                            Top Rated
                        </Link>
                    </li>
                </ul>
            
        </div>
        <div className="b-example-divider"></div>
        
        <div>
            {movies?.length > 1 ? (
                <ul>
                    {movies.map((movie) => (
                        <li key={movie.id}>
                            <Link to={`movie/${movie.id}`}>{movie.title}</Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>
                    <i>No movies</i>
                </p>
            )}
        </div>

        <div>
            <Form method="post">
                <button type="submit">New</button>
            </Form>
        </div>

        <div id="detail">
            <Outlet/>
        </div>
      </>
    );
  }