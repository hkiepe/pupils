// rrd imports
import { Form } from "react-router-dom";

// Library
import { UserPlusIcon } from "@heroicons/react/24/solid";

// assets
import illustration from "../assets/illustration.jpg";

function Intro() {
  return (
    <div className="intro">
      <div>
        <h1>
          Take responsibility for <span className="accent">Your Dance</span>
        </h1>
        <p>Home training is the secret for growth into your dance. Start your journey today.</p>
        <Form method="post">
          <input type="email" name="userEmail" required placeholder="What is your email?" aria-label="Your email" autoComplete="given-email" />
          <input type="password" name="userPassword" required placeholder="Type your password!" aria-label="Your password" />
          <input type="hidden" name="_action" value="newUser" />
          <button type="submit" className="btn btn--dark">
            <span>Create Account</span>
            <UserPlusIcon width={20} />
          </button>
        </Form>
      </div>
      <img src={illustration} alt="Person width money" width={600} />
    </div>
  );
}

export default Intro;
