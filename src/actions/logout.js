// rrd imports
import { redirect } from "react-router-dom";

// Library
import { toast } from "react-toastify";

// helpers
import { logOut } from "../helpers";

export async function logoutAction() {
  // delete the user
  await logOut({ key: "userEmail" });
  toast.success("You´ve logged out from your account");
  return redirect("/");
}
