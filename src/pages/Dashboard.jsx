// react imports
import {useContext} from "react"

// Components
import Intro from "../components/Intro";
import MovieList from "../components/MovieList";

// helper functions
import { createBudget, fetchData, registerUser, loginUser, createUserInFirestore } from "../helpers";

// Library
import { toast } from "react-toastify";
import AuthContext from "../context/auth-context";

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
      const userTable = await createUserInFirestore(user, values.userName)
      return toast.success(`Welcome, ${values.userName}`);
    } catch (error) {
      throw new Error("There was a problem creating your account");
    }
  }

  // login user submission
  if (_action === "_loginUser") {
    try {
      const user = await loginUser(values.userEmail, values.userPassword);
      return toast.success(`Welcome, ${user.userName}`);
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
  const context = useContext(AuthContext)

  return (
    <>
      {context.loggedInUser.isLoggedIn ? (
        <div className="dashboard">
          <div className="grid--sm">
            {/* {budgets ? () : ()} */}
            <div className="grid-lg">
              <div className="flex-lg">
                <MovieList />
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
