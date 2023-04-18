// react imports
import { useEffect, useState } from "react";

// rrd imports
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// firebase imports
import { auth } from "./firebase-config";
import { onAuthStateChanged } from "firebase/auth";

// context
import AuthContext from "./context/auth-context";

// actions
import { logoutAction } from "./actions/logout";

// Library
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Video extension
import 'video-react/dist/video-react.css';

// Layouts
import Main, { mainLoader } from "./layouts/Main";

// Routes
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import Error from "./pages/Error";

// Paypal imports
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { fetchUserData } from "./helpers";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Error />,
      },
      { path: "logout", action: logoutAction },
    ],
  },
]);

const initialOptions = {
  "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
  currency: "EUR",
  components: "buttons",
  // "card", "credit", "giropa", "sofort", "sepa", "paylater"
  "disable-funding": ["card", "giropay", "sepa", "sofort"],
  // "enable-funding": []
};

function App() {
  const [loggedInUser, setLoggedInUser] = useState({ isLoggedIn: false, userData: {} })

  const logoutHandler = () => {
    // logout user in authö
  }

  useEffect(() => {
    onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        // get the logged in user data from user table in firestore
        try {
        const userData = await fetchUserData(authUser.uid)
        console.log('userData', userData)
        setLoggedInUser({ isLoggedIn: true, userData })
        } catch (error) {
          throw new Error("There was a problem fetching the user data");
        }
      } else {
        setLoggedInUser({ isLoggedIn: false, userName: {} })
      }
    });
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{
          loggedInUser: { isLoggedIn: loggedInUser.isLoggedIn, userData: loggedInUser.userData },
          onLogout: logoutHandler,
        }}>
        <PayPalScriptProvider options={initialOptions}>
          <RouterProvider router={router} />
          <ToastContainer />
        </PayPalScriptProvider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
