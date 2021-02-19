const client = require("./services/database/client");
const productsController = require("./controllers/products");
const usersController = require("./controllers/users");
const stripeController = require("./controllers/stripe");
const orderController = require("./controllers/orders");

module.exports = function (route) {
  client.connect((err) => {
    if (err) {
      throw Error(err);
    }
    !err && console.log("Successfully connected to database");

    route.get("/", (req, res, next) => {
      res.send("Hello world!");
    });

    /** Product */
    route.get("/products", productsController.getAllProducts);
    route.post("/products/add", productsController.addProduct);

    /** User */
    route.post("/users/add", usersController.add);
    route.get("/user", usersController.get);

    /** Stripe */

    route.post("/create-checkout-session", stripeController.checkout);

    /** Order */

    route.post("/order/add", orderController.add);
  });
};
