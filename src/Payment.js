import React, { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import {
  ProductBasketContext,
  getBasketTotalPrice,
} from "./ProductBasketContext";
import CheckoutProduct from "./CheckoutProduct";
import "./Payment.css";
// import { useStateValue } from "./StateProvider";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
// import { getBasketTotal } from "./reducer";
import axios from "./axios";
// import instance from "./axios";
import { db } from "./firebase";

function Payment() {
  // const [{ basket, user }, dispatch] = useStateValue();
  //Get browser history
  const history = useHistory();

  //Get Contexts
  const [user] = useContext(AuthContext);
  const [productBasket, setProductBasket] = useContext(ProductBasketContext);

  //Stripe vars
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState(true);

  //Validation Vars
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    // generate the special stripe secret which allows us to charge a customer
    const getClientSecret = async () => {
      try {
        const response = await axios({
          method: "post",
          // Stripe expects the total in a currencies subunits
          url: `/payments/create?total=${Math.trunc(
            getBasketTotalPrice(productBasket) * 100
          )}`,
        });
        //Set Client Secret
        setClientSecret(response.data.clientSecret);
      } catch (error) {}
    };

    getClientSecret();
  }, [productBasket]);

  console.log("The secret is >>>", clientSecret);
  console.log("👱", user);

  //Vars for form error and
  //Handle Stripe Payment
  const handlePayment = async (e) => {
    //   payment form processing
    e.preventDefault();
    //Prevent to click Buy Now Button Again
    setProcessing(true);

    //Confirm Payment wit Stripe
    try {
      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      console.log(payload.paymentIntent);

      // .then(({ paymentIntent }) => {
      // paymentIntent = payment confirmation

      //Create a document inside orders collection of the user with id, basket, amount and created fields
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .doc(payload.paymentIntent.id)
        .set({
          basket: productBasket,
          amount: payload.paymentIntent.amount,
          created: payload.paymentIntent.created,
        });

      setSucceeded(true);
      setError(null);

      //   //Empty the basket
      //   setProcessing(false);

      //   dispatch({
      //     type: "EMPTY_BASKET",
      //   });

      //   history.replace("/orders");
      // });

      //Empty the basket
      setProductBasket([]);

      //Replace User Page to Orders Page
      history.replace("/orders");
    } catch (error) {
      setError(error.message);
    }
    setProcessing(false);
  };

  // const handleChange = (event) => {
  //   //   listen for changes in the card elements
  //   //   and disply any error as the customer types their card details
  //   setDisabled(event.empty);
  //   setError(event.error ? event.error.message : "");
  // };

  //OnChage Event for Stripe Card Element; dipay any errors as agent fills card details
  const onCardChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        {/* item number */}
        <h1>
          Checkout (<Link to="/checkout">{productBasket?.length} items</Link>)
        </h1>
        {/* payment section - delivery */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123, Hosur Road</p>
            <p>Bangalore, KA-560068</p>
          </div>
        </div>
        {/* payment section - review */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items & delivery</h3>
          </div>
          <div className="payment__items">
            {/*Get Products from the basket */}
            {productBasket.map((product, index) => (
              <CheckoutProduct
                key={index}
                id={product.id}
                title={product.title}
                image={product.image}
                price={product.price}
                rating={product.rating}
              />
            ))}
          </div>
        </div>
        {/* payment section - payment */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            {/* stripe magic */}
            <form onSubmit={handlePayment}>
              <CardElement onChange={onCardChange} />

              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total : {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotalPrice(productBasket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  thousandSpacing={"2s"}
                  prefix={"₹ "}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {/* Handling errors */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
