

export default function Home() {
    return (
        <>  
            <main>
                <div className="px-4 py-5 my-5 text-center">
                    
                    <h1 className="display-5 fw-bold text-body-emphasis">Welcome to MovieDB</h1>
                    <div className="col-lg-6 mx-auto">
                        
                        <p className="lead mb-4">
                        A movie database website should provide a seamless user experience, allowing users to easily discover, 
                        explore, and engage with films.
                        </p>
                        <ul className="list-group">
                            <li className="list-group-item">Movie Search and Discovery</li>
                            <li className="list-group-item">Recently Released and Top Rated</li>
                            <li className="list-group-item">Detailed Movie Information</li>
                            <li className="list-group-item">Register and login to join the community</li>
                        </ul>
                        
                    </div>
                </div>

            </main>
        </>
    );
}

/* for testing post method to server
<form method="POST" action="http://localhost:4000/api/mssg">
        <label htmlFor="mssg"></label>
        <input type="text" id="mssg" name="mssg" placeholder="send post req to server" />
        <label htmlFor="pw"></label>
        <input type="text" id="pw" name="pw" placeholder="pass" />
        <button className="btn btn-primary" type="submit">submit</button>
      </form>
*/