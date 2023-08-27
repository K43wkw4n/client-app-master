import express from "express";
import Stripe from "stripe";

const stripe = new Stripe(
  "pk_test_51Lq9trE8AQKqEHqvWZ6liOQFIVy4sPEcDLnUTJzsr1DjfYvobGuHzyGgEPEvThhqsAnA2Azl919xlC1SGOqOPDZV00eYsnkeD8",
  {
    apiVersion: "2022-11-15",
    typescript: true,
  }
);

const app = express();
app.use(express.json());

app.post("/create-patment-intent", async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 5000,
    currency: "usd",
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(3000, () => console.log("Running!..."));
