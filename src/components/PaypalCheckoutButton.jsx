// react imports
import { useState, useEffect } from "react";

// paypal Imports
import { PayPalButtons, PayPalScriptProvider, usePayPalScriptReducer } from "@paypal/react-paypal-js";

function PaypalCheckoutButton({ movie }) {
  const [{ options }, dispatch] = usePayPalScriptReducer();

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
          const name = "Henrik";
          alert(`Transaction completed by ${name}`);
        });
      }}
    />
  );
}

export default PaypalCheckoutButton;
