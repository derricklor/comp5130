import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom"
import axios from "axios"


export async function updateMovie(id, updates) {
    axios.post(`/movie/${id}/edit`, updates)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => console.log(err))
}

export async function action({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateMovie(params.id, updates);
    return redirect(`/movie/${params.id}`);
}

export default function EditMovie() {
    const navigate = useNavigate();
    //const { movie } = useLoaderData();
    const exmovie = {
        title: "sample title",
        released: 55556677,
        runtime: 5,
        director: "sample director",
        id: 5,
        rating: 5.0,
        genre: "sample genre",
        plot: "sample plot",
        actors: "sample actors",
        poster: "sample poster",
    };
    // <Form> for router
    return (
        <>
            <form method="post" id="movie-form">
                <p>
                    <span>Title</span>
                    <input type="text" name="title" placeholder="Title" defaultValue={exmovie.title} />
                </p>
                <label>
                    <span>Released</span>
                    <input type="number" name="released" placeholder="YYYYMMDD" defaultValue={exmovie.released} />
                </label>
                <label>
                    <span>Runtime</span>
                    <input type="number" name="runtime" placeholder="# in minutes" defaultValue={exmovie.runtime} />
                </label>
                <label>
                    <span>Director</span>
                    <input type="text" name="director" placeholder="director name" defaultValue={exmovie.director} />
                </label>
                <label>
                    <span>Rating</span>
                    <input type="number" name="rating" placeholder="0.0-10.0" defaultValue={exmovie.rating} />
                </label>
                <label>
                    <span>Genre</span>
                    <input type="text" name="plot" placeholder="less than 255 chars" defaultValue={exmovie.genre} />
                </label>
                <label>
                    <span>Plot</span>
                    <textarea name="plot" placeholder="less than 255 chars" defaultValue={exmovie.plot} rows={3} />
                </label>
                <label>
                    <span>Actors</span>
                    <input type="text" name="actors" placeholder="less than 255 chars" defaultValue={exmovie.actors} />
                </label>
                <label>
                    <span>Poster URL</span>
                    <input type="text" name="poster" placeholder="less than 255 chars" defaultValue={exmovie.poster} />
                </label>
                <p>
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => { navigate(-1); }}>Cancel</button>
                </p>
            </form>
        </>
    );
}