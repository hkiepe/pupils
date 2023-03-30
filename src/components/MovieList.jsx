// react imports
import { useState, useEffect } from "react";

// rrd imports
import { Form } from "react-router-dom";

// firebase imports
import { db } from "../firebase-config";
import { getDocs, collection } from "firebase/firestore";

// library imports
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";

const AddBudgetForm = () => {
  const [movieList, setMovieList] = useState([]);

  const moviesCollectionRef = collection(db, "movies");

  useEffect(() => {
    const getMovieList = async () => {
      try {
        const data = await getDocs(moviesCollectionRef);
        const movieData = data.docs.map((movie) => ({ ...movie.data(), id: movie.id }));
        setMovieList(movieData);
      } catch (error) {
        throw new Error("There was a problem fetching the movies from database");
      }
    };

    getMovieList();
  }, []);

  return (
    <div className="form-wrapper">
      <h2 className="h3">Movie List</h2>
      {movieList &&
        movieList.map((movie) => (
          <div>
            <h3>{movie.title}</h3>
            <p>{movie.releaseDate}</p>
          </div>
        ))}
    </div>
  );
};

export default AddBudgetForm;
