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

// helper functions
import { createBudget, fetchData, registerUser } from "../helpers";

// Library
import { toast } from "react-toastify";

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

  // new user submission
  if (_action === "newUser") {
    try {
      const user = await registerUser(values.userEmail, values.userPassword);
      localStorage.setItem("userEmail", JSON.stringify(user.user.email));
      return toast.success(`Welcome, ${values.userEmail}`);
    } catch (error) {
      throw new Error("There was a problem creating your account");
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
      console.log("loggedInUser :>> ", loggedInUser);
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
                <AddBudgetForm />
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
