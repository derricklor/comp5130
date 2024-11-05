

export default function Home() {
  return (
    <>
      <h1>This is home</h1>
      <form method="POST" action="http://localhost:4000/api/mssg">
        <label htmlFor="mssg"></label>
        <input type="text" id="mssg" name="mssg" placeholder="send post req to server" />
        <label htmlFor="pw"></label>
        <input type="text" id="pw" name="pw" placeholder="pass" />
        <button className="btn btn-primary" type="submit">submit</button>
      </form>
    </>
  );
}