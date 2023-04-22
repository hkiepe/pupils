// react imports
import { useEffect, useContext } from "react";

// context
import AuthContext from "../context/auth-context";

// fb imports
import { collection, addDoc, doc, arrayUnion, updateDoc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

// paypal Imports
import { PayPalButtons, PayPalScriptProvider, usePayPalScriptReducer } from "@paypal/react-paypal-js";

// Library
import { toast } from "react-toastify";

function PaypalCheckoutButton({ movie }) {
  const [{ options }, dispatch] = usePayPalScriptReducer();
  const context = useContext(AuthContext)

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: "EUR",
      },
    });
  }, []);

  return (
    <PayPalButtons
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              description: movie.title,
              amount: {
                value: +movie.price,
              },
            },
          ],
        });
      }}
      onApprove={(data, actions) => {
        return actions.order.capture().then((details) => {
          console.log('details', details)
          console.log('movie', movie)
          console.log('context', context)

          
          
          // update user entry with purchased courses
          const usersRef = doc(db, "users", context.loggedInUser.userData.authId);
          updateDoc(usersRef, {
            purchasedCourses: arrayUnion({course: movie.id, purchaseId: details.id})
          });

          // create enztry in purchases table for the purchase of the course
          addDoc(collection(db, "purchases"), {
            details: details, course: movie, user: context.loggedInUser.userData
          })

          // save into user in database which video was payed
          toast.success(`Transaction completed by ${details.payer.name.given_name} ${details.payer.name.surname}, Id: ${details.payer.payer_id}`)
        });
      }}
    />
  );
}

export default PaypalCheckoutButton;
