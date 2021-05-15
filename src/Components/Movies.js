import { getByDisplayValue } from "@testing-library/dom";
import axios from "axios";
import { useState, useEffect } from "react";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [chosenMovie, setChosenMovie] = useState("");
  const [displayDiv, setDisplayDiv] = useState(false);

  const fetchMovies = async () => {
    try {
      const res = await axios.get("https://ghibliapi.herokuapp.com/films");
      setMovies(res.data);
    } catch (error) {
      setMovies([]);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleChange = async (e) => {
    setChosenMovie(e.target.value);
    try {
      const res = await axios.get(e.target.value);
      setChosenMovie(res.data);
      setDisplayDiv(true);
    } catch (error) {
      setChosenMovie("");
    }
  };

  return (
    <section>
      <h1>Select a Movie</h1>
      <select value={chosenMovie} onChange={handleChange}>
        <option value="" selected></option>
        {movies.map((movieObj) => {
          return (
            <option key={movieObj.id} value={movieObj.url}>
              {movieObj.title}
            </option>
          );
        })}
      </select>
      {displayDiv ? (
        <div>
          <h1> Title: {chosenMovie.title}</h1>
          <p> Release Date: {chosenMovie.release_date}</p>
          <p> Description: {chosenMovie.description}</p>
        </div>
      ) : (
        false
      )}
    </section>
  );
};

export default Movies;