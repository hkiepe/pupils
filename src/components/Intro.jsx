// react imports
import { useState } from "react";

// rrd imports
import { Form } from "react-router-dom";

// firebaeImports
import { auth, googleProvider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";

// Library
import { UserPlusIcon } from "@heroicons/react/24/solid";

// assets
import illustration from "../assets/illustration.jpg";

function Intro() {
  const [register, setRegister] = useState(false);

  const handleCheckbox = () => setRegister(!register);

  const signInWithGoogle = () => {
    try {
      signInWithPopup(auth, googleProvider);
    } catch (error) {
      throw new Error("There was a problem creating your account with google login.");
    }
  };

  return (
    <div className="intro">
      <div>
        <h1>
          Take responsibility for <span className="accent">Your Dance</span>
        </h1>
        <p>Home training is the secret for growth into your dance. Start your journey today.</p>
        <Form method="post">
          <input type="name" name="userName" required placeholder="What is your name?" aria-label="Your name" autoComplete="given-name" />
          <input type="email" name="userEmail" required placeholder="What is your email?" aria-label="Your email" autoComplete="given-email" />
          <input type="password" name="userPassword" required placeholder="Type your password!" aria-label="Your password" />
          <input type="hidden" name="_action" value={register ? "_registerUser" : "_loginUser"} />
          <label htmlFor="register">Or do you want to register an account?</label>
          <input
            type="checkbox"
            name="register"
            id="register"
            placeholder="Do you want to register?"
            aria-label="Register"
            autoComplete="false"
            checked={register}
            onChange={handleCheckbox}
          />
          <button type="submit" className="btn btn--dark">
            <span>{register ? "Create Account" : "Log In"}</span>
            <UserPlusIcon width={20} />
          </button>
        </Form>
        <p>Or sign in with google:</p>
        <button onClick={signInWithGoogle} type="submit" className="btn btn--dark">
          <span>Sign in with google</span>
          <UserPlusIcon width={20} />
        </button>
      </div>
      <img src={illustration} alt="Person width money" width={600} />
    </div>
  );
}

export default Intro;
