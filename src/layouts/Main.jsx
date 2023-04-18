// rrd imports
import { Outlet, useLoaderData } from "react-router-dom";

// assets
import wave from "../assets/wave.svg";

// components
import Nav from "../components/Nav";

// helper functions
import { fetchData } from "../helpers";

export function mainLoader() {
  const userEmail = fetchData("userEmail");
  return { userEmail };
}

const Main = () => {
  const { userEmail } = useLoaderData();

  return (
    <div className="layout">
      <Nav />
      <main>
        <Outlet />
      </main>
      <img src={wave} alt="" />
    </div>
  );
};

export default Main;
