// react imports
import { useState, useEffect, useContext } from "react";

// firebase imports
import { db } from "../firebase-config";
import { getDocs, collection } from "firebase/firestore";

// context
import AuthContext from "../context/auth-context";

// library imports
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import PaypalCheckoutButton from "./PaypalCheckoutButton";

// Paypal Imports
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

// Video player
import { Player } from 'video-react';

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);
  const context = useContext(AuthContext)

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
    <div >
      <h2 className="h3">Movie List</h2>
      {movieList &&
        movieList.map((movie) => {
          console.log('movie', movie)
          console.log('context', context)
          if (context.loggedInUser.userData.purchasedCourses.filter(course => {
            console.log('COURSE', course)
            return (course.course !== movie.id)})) {
            return (<div className="form-wrapper">
              <h3>Title: {movie.title}</h3>
              <p>Price: {movie.price}</p>
              <Player>
                    <source src={movie.trailerUrl} />
              </Player>
              <PaypalCheckoutButton movie={movie} />
            </div>)
          } else {
            return (<div className="form-wrapper">
              <h3>Title: {movie.title}</h3>
              <Player>
                    <source src={movie.videoUrl} />
              </Player>
            </div>)
          }
        })}
    </div>
  );
};

export default MovieList;
