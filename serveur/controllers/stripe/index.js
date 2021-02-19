const stripe = require("stripe")(process.env.SECRET_KEY);
const YOUR_DOMAIN = "http://localhost:3000";

exports.checkout = async function (req, res, next) {
  try {
    const session = await stripe.checkout.sessions.create({
      success_url: `${YOUR_DOMAIN}/success`,
      cancel_url: `${YOUR_DOMAIN}/cancel`,
      payment_method_types: ["card"],
      line_items: req.body,
      mode: "payment",
    });

    res.send({ id: session.id });
  } catch (error) {
    console.log(error);
    return res.status(500).send(`Failed to process payment: ${error}`);
  }
};
