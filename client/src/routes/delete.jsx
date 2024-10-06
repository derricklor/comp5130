import { redirect } from "react-router-dom";
import axios from "axios"

export async function deleteMovie(id){
  axios.post(`/movie/${id}/delete`)
    .then((res) =>{
        console.log(res);
    })
    .catch((err)=> console.log(err))
}

export async function action({ params }) {
  await deleteMovie(params.id);
  return redirect("/");
}