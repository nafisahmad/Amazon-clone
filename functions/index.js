// const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51Jr0UeSDrsL9fezPcwdLly77LPnvrRp5tWSClu6MspMsNQGxoSkNq9Yfx6Px1Fypsk4NDmZhA9ZsiHbTr9eDqSNC00b9T61qN1"
);

// Express APP structure

//  --App config
const app = express();

// ---Midlewares
app.use(cors({ origin: true }));
app.use(express.json());
// ---API Routes
app.get("/", (request, response) =>
  response.status(200).send("hello world from express API")
);

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  // Call Stripe API
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "inr",
    });

    response.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    response.status(404).send({
      error: error.message,
    });
  }
});
// ---Listen Command
exports.api = functions.https.onRequest(app);