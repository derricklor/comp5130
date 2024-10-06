import { Link, Outlet, useLoaderData, Form, redirect } from "react-router-dom";
import { getMovies, createMovie } from "../movies";

export async function action() {
    const movie = await createMovie();
    return redirect(`/movie/${movie.id}/edit`);
  }

export async function loader() {
    //axios
    const movie = await getMovies();
    return { movie };
}

export default function Root() {
    const { movies } = useLoaderData();
    return (
        <>
        <div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style="width: 280px;">
        <Link to={`/`} class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            <svg class="bi me-2" width="16" height="16"><use xlink:href="#home"></use></svg>
            <span class="fs-4">MovieDB</span>
        </Link>
            <hr>
                <ul class="nav nav-pills flex-column mb-auto">
                    <li>
                        <Link to={`/recentlyreleased`}>
                            <svg class="bi me-2" width="16" height="16"><use xlink:href="#table"></use></svg>
                            Recently Released
                        </Link>
                    </li>
                    <li>
                        <Link to={`/toprated`}>
                            <svg class="bi me-2" width="16" height="16"><use xlink:href="#speedometer2"></use></svg>
                            Top Rated
                        </Link>
                    </li>
                </ul>
            </hr>
        </div>
        <div>
            {movies.length ? (
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

        <div id="detail"></div>
        <Outlet/>
      </>
    );
  }