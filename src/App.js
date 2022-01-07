// import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import Payment from "./Payment";
import { auth } from "./firebase";
// import { useStateValue } from "./StateProvider";
// import { loadStripe } from "@stripe/stripe-js";

/*Stripe Element required import */
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Orders";
import { useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
/*Import stripe library */
import { stripePromise } from "./stripe";

// const promise = loadStripe(
//   "pk_test_51Jr0UeSDrsL9fezP8dfaONXvvVtxGiZ4ZLjoqu7t4AKInxSZhoVxzdEjhnO8ulKlykqtxxR3eCYPpj5Ps4w3vrt300fn2M4jC0"
// );

function App() {
  //Use Auth Context to get and update User Context prop to tell if User is login or not
  const [user, setUser] = useContext(AuthContext);
  // const [{}, dispatch] = useStateValue();

  useEffect(() => {
    // runs only once when the app component loads
    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>>", authUser);

      //     if (authUser) {
      //       // the user logged in / user was logged in
      //       dispatch({
      //         type: "SET_USER",
      //         user: authUser,
      //       });
      //     } else {
      //       // the user is logged out
      //       dispatch({
      //         type: "SET_USER",
      //         user: null,
      //       });
      //     }
      //   });
      // }, []);
      if (authUser) {
        //User is loggend in: put user in context Layer AuthContext to all children componenets as props
        setUser(authUser);
      } else {
        //User is not logged in
        setUser(null);
      }
    });
  }, []);

  return (
    // BEM
    <Router>
      <div className="app">
        <Switch>
          <Route path="/login">
            {/* <h1>Login Page</h1> */}
            {/* <Login /> */}
            <Login />
          </Route>
          <Route path="/orders">
            {/* Orders Component */}
            <Header />
            <Orders />
          </Route>
          {/* Header */}
          <Route path="/checkout">
            {/* Checkout Component */}
            <Header />
            <Checkout />
          </Route>

          <Route path="/payment">
            {/* Payment Component */}
            <Header />
            {/* <h2>Paymentpage </h2> */}
            <Elements stripe={stripePromise}>
              <Payment />
            </Elements>
          </Route>

          <Route path="/">
            {/* Header Component */}
            <Header />
            {/* Home Component */}
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
