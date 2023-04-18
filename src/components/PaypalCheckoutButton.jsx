// react imports
import { useEffect, useContext } from "react";

// context
import AuthContext from "../context/auth-context";

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
          // save into user in database which video he has payed
          toast.success(`Transaction completed by ${details.payer.name.given_name} ${details.payer.name.surname}, Id: ${details.payer.payer_id}`)
        });
      }}
    />
  );
}

export default PaypalCheckoutButton;
