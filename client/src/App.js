import "./App.css";

function App() {
  return (
    <div className="App">
      <div>
        <h1>Welcome ...</h1>
        <div className="form">
          <label className="labels">Movie name</label>
          <input type="text" name="movieName" className="mvName" />
          <label className="labels">Comments</label>
          <input type="text" name="movieComment" className="mvComm" />
        </div>
        <button className="btn" type="submit" onClick="##">
          Check Movie
        </button>
        <h3>Wellcome</h3>
        <form action="/api/submit" method="post">
          <input type="text" name="userEntry" />
          <button type="submit" class="btn">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
