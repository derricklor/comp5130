import { redirect } from "react-router-dom";
import axios from "axios"

export default async function deleteMovie(id) {
  axios.post(`/movie/${id}/delete`)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err))

    return redirect("/");
}

export async function action({ params }) {
  await deleteMovie(params.id);
  return redirect("/");
}