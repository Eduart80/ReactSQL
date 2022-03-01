import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [userIn, setuserIn] = useState("");
  const [userRevieu, setUserRevieu] = useState("");
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/getAll").then((res) => {
      setMovieList(res.data);
    });
  }, []);
  // send post to back-end
  const postInput = (e) => {
    // e.preventDefault();
    axios
      .post("http://localhost:3001/api/insert", {
        movieName: userIn,
        movieComment: userRevieu,
      })
      .then(() => {
        alert("successfuly enterd");
      });
  };
  const deleteAll = (e) => {
    axios
      .delete(`http://localhost:3001/api/delete/${e.target.value}`)
      .then(() => {
        alert("successfuly deleted");
      });
  };

  return (
    <div className="App">
      <div>
        <h1>Welcome</h1>
        <form className="form">
          <label className="labels">Movie name</label>
          <input
            type="text"
            className="mvName"
            placeholder="Enter Movie Name"
            onChange={(e) => {
              setuserIn(e.target.value);
            }}
          />
          <label className="labels">Comments</label>
          <input
            type="text"
            className="mvComm"
            placeholder="Enter Comment"
            onChange={(e) => {
              setUserRevieu(e.target.value);
            }}
          />
          <button className="btn" onClick={postInput} value="">
            Send to server
          </button>
        </form>
        <h3>Find Movie</h3>
        <form>
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => {
              setuserIn(e.target.value);
            }}
          />
          <button type="submit" class="btn" value="">
            Send
          </button>
        </form>
        {movieList.map((movie) => {
          return (
            <p className="movieList">
              {movie.movieName}, {movie.movieComment}
              <button
                className="btnDel"
                onClick={deleteAll}
                value={movie.movieName}
              >
                Delete
              </button>
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default App;
