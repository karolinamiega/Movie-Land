import { useEffect, useState } from "react";

import MovieCard from "./MovieCard";
import "./App.css";
import SearchIcon from "./search.svg";

const API_URL = "https://www.omdbapi.com/?i=tt3896198&apikey=a5e43c36";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };
  useEffect(() => {
    searchMovies("Shrek");
  }, []);
  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <img src={SearchIcon} alt="search" onClick={() => searchMovies(searchTerm)} />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie}></MovieCard>
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
