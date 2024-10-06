import { redirect } from "react-router-dom";
import { deleteMovie } from "../movies";

export async function action({ params }) {
  await deleteMovie(params.id);
  return redirect("/");
}