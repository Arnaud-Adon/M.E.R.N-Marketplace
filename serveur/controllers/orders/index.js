const client = require("../../services/database/client");

exports.add = function (req, res, next) {
  const orders = client.db("marketplace").collection("orders");

  orders.insertOne(req.body).then((results, err) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.send(`Order successsfuly created`);
  });
};
