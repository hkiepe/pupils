// rrd imports
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
  return (
    <div className="App">
      <PayPalScriptProvider options={initialOptions}>
        <RouterProvider router={router} />
        <ToastContainer />
      </PayPalScriptProvider>
    </div>
  );
}

export default App;
