// react imports
import {useContext} from "react"

// rrd imports
import { Form, NavLink } from "react-router-dom";

// Context
import AuthContext from "../context/auth-context";

// library
import { TrashIcon } from "@heroicons/react/24/solid";

// assets
import logomark from "../assets/logomark.svg";

const Nav = () => {
  const context = useContext(AuthContext)

  return (
    <nav>
      <NavLink to="/" aria-label="Go to home">
        <img src={logomark} alt="" height={30} />
        <span>OnlineZoukSchool</span>
      </NavLink>
      {context.loggedInUser.isLoggedIn && (
        <Form
          method="post"
          action="logout"
          onSubmit={(event) => {
            // eslint-disable-next-line no-restricted-globals
            if (!confirm("Logout from your account?")) {
              event.preventDefault();
            }
          }}
        >
          <button type="submit" className="btn btn--warning">
            <span>Logout</span>
            <TrashIcon width={20} />
          </button>
        </Form>
      )}
    </nav>
  );
};
export default Nav;
