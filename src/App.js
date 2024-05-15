import { useState, useEffect, createContext, useContext } from "react";

import "./App.css";

import MovieDisplay from "./components/MovieDisplay";
import Form from "./components/Form";

// Create a context
export const MovieContext = createContext();

export default function App() {
  // Constant with your API Key

  const apiKey = "bf11e9de";

  // State to hold movie data
  const [movie, setMovie] = useState(null);

  // Function to get movies
  const getMovie = async (searchTerm) => {
    try {
      // Make fetch request and store the response
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${apiKey}&t=${searchTerm}`
      );
      // Parse JSON response into a JavaScript object
      const data = await response.json();
      // Set the Movie state to the received data
      setMovie(data);
    } catch (e) {
      console.error(e);
    }
  };

  const randomMovie = async () => {
    const response = await fetch(
      `http://www.omdbapi.com/?s=series&apikey=${apiKey}`
    );
    const data = await response.json();
    console.log(data);

    const randomIndex = Math.floor(Math.random() * data.Search.length);

    // Retrieve a random movie based on the random index
    const randomMovie = data.Search[randomIndex];

    // Set the movie state with the selected random movie
    setMovie(randomMovie);
  };

  // This will run on the first render but not on subsquent renders
  useEffect(() => {
    randomMovie();
  }, []);

  // We pass the getMovie function as a prop called moviesearch
  return (
    <MovieContext.Provider value={{ movie, getMovie }}>
      <div className="App">
        <Form />
        <MovieDisplay />
      </div>
    </MovieContext.Provider>
  );
}
