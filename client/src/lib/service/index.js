import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

export const getProducts = () => {
  return new Promise((onSuccess, onFail) => {
    axios
      .get("/api/products")
      .then((response, error) => {
        if (!response || error) {
          onFail(`Response failure ${error}`);
        }
        onSuccess(response);
      })
      .catch((err) => onFail(err));
  });
};

export const addUsers = (body) => {
  return new Promise((onSuccess, onFail) => {
    axios
      .post("/api/users/add", body)
      .then((response, error) => {
        if (!response || error) onFail(`Response failure ${error}`);
        onSuccess(`user profile successfully created`);
      })
      .catch((err) => onFail(err));
  });
};

export const getUser = (body) => {
  return new Promise((onSuccess, onFail) => {
    axios
      .get("/api/user", body.email)
      .then((response, error) => {
        if (!response || error) return onFail(error);
        onSuccess(response.data);
      })
      .catch((err) => onFail(err));
  });
};

export const processPayment = async (body) => {
  var stripePromise = loadStripe(
    "pk_test_51IJ3lIBXZoAeHsm3rZdL9z6ZLJcDKj8Zuh6BrgPothtaBC6CTUhZDDF3YjPOzu3UJ CPkgE056EpxPjH4Ygcuwkdf00UWW4yNQ0"
  );
  const stripe = await stripePromise;

  axios.post("/api/create-checkout-session", body).then(async (response) => {
    const sessionID = response.data.id;
    return stripe.redirectToCheckout({ sessionId: sessionID });
  });
};

export const addOrder = (body) => {
  return new Promise((onSuccess, onFail) => {
    axios
      .post("/api/order/add", body)
      .then((response, error) => {
        if (!response || error) onFail(`Response failure : ${error}`);
        onSuccess(`Order Successfully added`);
      })
      .catch((error) => onFail(error));
  });
};
