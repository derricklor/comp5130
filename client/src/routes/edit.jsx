import { Form, useLoaderData, redirect , useNavigate} from "react-router-dom"
import { updateMovie } from "../movies";

export async function action({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateMovie(params.id, updates);
    return redirect(`/movie/${params.id}`);
  }

export default function EditMovie() {
    const navigate = useNavigate();
    const { movie } = useLoaderData();
    const ex_movie = {
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

  return (
    <Form method="post" id="movie-form">
    <p>
        <span>Title</span>
        <input type="text" name="title" placeholder="Title" defaultValue={"sample title"} />
    </p>
    <label>
        <span>Released</span>
        <input type="number" name="released" placeholder="YYYYMMDD" defaultValue={55556677} />
    </label>
    <label>
        <span>Runtime</span>
        <input type="number" name="runtime" placeholder="# in minutes" defaultValue={5} />
    </label>
    <label>
        <span>Director</span>
        <input type="text" name="director" placeholder="director name" defaultValue="sample director" />
    </label>
    <label>
        <span>Rating</span>
        <input type="number" name="rating" placeholder="0.0-10.0" defaultValue={5} />
    </label>
    <label>
        <span>Genre</span>
        <input type="text" name="plot" placeholder="less than 255 chars" defaultValue="sample genre" />
    </label>
    <label>
        <span>Plot</span>
        <textarea name="plot" placeholder="less than 255 chars" defaultValue="sample plot" rows={3} />
    </label>
    <label>
        <span>Actors</span>
        <input type="text" name="actors" placeholder="less than 255 chars" defaultValue="sample actor" />
    </label>
    <label>
        <span>Poster URL</span>
        <input type="text" name="poster" placeholder="less than 255 chars" defaultValue="sample poster" />
    </label>
    <p>
        <button type="submit">Save</button>
        <button type="button" onClick={() => { navigate(-1); }}>Cancel</button>
    </p>
    </Form>
  );
}