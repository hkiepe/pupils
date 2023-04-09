// react imports
import { useState, useEffect } from "react";

// rrd imports
import { useLoaderData } from "react-router-dom";

// firebase imports
import { auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";

// Components
import Intro from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm";
import MovieList from "../components/MovieList";

// helper functions
import { createBudget, fetchData, registerUser, loginUser } from "../helpers";

// Library
import { toast } from "react-toastify";

// video player
import { Player } from 'video-react';

// loader
export function dashboardLoader() {
  const userEmail = fetchData("userEmail");
  const budgets = fetchData("budgets");
  return { userEmail };
}

// action
export async function dashboardAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  // register user submission
  if (_action === "_registerUser") {
    try {
      const user = await registerUser(values.userEmail, values.userPassword);
      localStorage.setItem("userEmail", JSON.stringify(user.user.email));
      return toast.success(`Welcome, ${values.userEmail}`);
    } catch (error) {
      throw new Error("There was a problem creating your account");
    }
  }

  // register user submission
  if (_action === "_loginUser") {
    try {
      const user = await loginUser(values.userEmail, values.userPassword);
      localStorage.setItem("userEmail", JSON.stringify(user.user.email));
      return toast.success(`Welcome, ${values.userEmail}`);
    } catch (error) {
      throw new Error("There was a problem login to your account");
    }
  }

  // create new budget
  if (_action === "createBudget") {
    try {
      // create budget
      createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
      });

      return toast.success("Budget created!");
    } catch (error) {
      throw new Error("There was a problem creating your budget");
    }
  }
}

const Dashboard = () => {
  const [userIsLoggedIn, setuserIsLoggedIn] = useState(false);
  const { userEmail, budgets } = useLoaderData();

  useEffect(() => {
    onAuthStateChanged(auth, (loggedInUser) => {
      if (loggedInUser) {
        setuserIsLoggedIn(true);
      } else {
        setuserIsLoggedIn(false);
      }
    });
  }, []);

  return (
    <>
      {userIsLoggedIn ? (
        <div className="dashboard">
          <h1>
            Welcome back, <span className="accent">{userEmail}</span>
          </h1>
          <div className="grid--sm">
            {/* {budgets ? () : ()} */}
            <div className="grid-lg">
              <div className="flex-lg">
                <MovieList />
                <Player>
      <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
    </Player>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
};

export default Dashboard;
