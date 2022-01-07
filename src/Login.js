import React, { useState } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase";

// function Login() {
const Login = () => {
  const history = useHistory(); //Change url programatically
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const signIn = (e) => {
  //   e.preventDefault();
  //   // some fancy firebase login
  //   auth
  //     .signInWithEmailAndPassword(email, password)
  //     .then((auth) => {
  //       history.push("/");
  //     })
  //     .catch((error) => alert(error.message));
  // };

  // const register = (e) => {
  //   e.preventDefault();

  //   auth
  //     .createUserWithEmailAndPassword(email, password)
  //     .then((auth) => {
  //       //   succesfully creates a new user with email and password
  //       // console.log(auth);
  //       if (auth) {
  //         history.push("/");
  //       }
  //     })
  //     .catch((error) => alert(error.message));
  //   //   do some firebase register
  // };

  const emailOnChange = (e) => {
    setEmail(e.target.value);
  };
  const passwordOnChange = (e) => {
    setPassword(e.target.value);
  };

  const signIn = async (e) => {
    e.preventDefault();
    //Firebase Login
    try {
      const authFirebase = await auth.signInWithEmailAndPassword(
        email,
        password
      );
      history.push("/");
    } catch (error) {
      alert(error.message);
    }
  };

  const register = async (e) => {
    e.preventDefault();
    //Firebase Register
    try {
      const authFirebase = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      history.push("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://pngimg.com/uploads/amazon/amazon_PNG6.png"
          alt="Amazon log"
        />
      </Link>

      <div className="login__container">
        <h1>Sign-In</h1>
        <form >
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={emailOnChange}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={passwordOnChange}
          />

          <button
            type="submit"
            onClick={signIn}
            className="login__signInButton"
          >
            Sign In
          </button>
        

        <p>
          By continuing, you agree to Amazon Clone's Conditions of Use and Privacy
          Notice.
        </p>
        <button onClick={register} className="login__registerButton">
          Create your Amazon Account
        </button>
        </form>
      </div>
    </div>
  );
};
export default Login;
