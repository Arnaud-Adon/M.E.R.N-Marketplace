const client = require("../services/database/client");
// const DATABASE = "marketplace";

exports.getAllProducts = function (req, res, next) {
  const products = client.db("marketplace").collection("products");
  products
    .find()
    .toArray()
    .then((err, results) => {
      if (err) {
        return res.send(err);
      }
      return res.status(200).send({ results });
    })
    .catch((err) => res.send({ err: err }));
};

exports.addProduct = function (req, res, next) {
  const products = client.db("marketplace").collection("products");
  products
    .insertOne(req.body)
    .then(() => res.status(200).send(`Successful inserted new Document`))
    .catch((err) => {
      return res.send(err);
    });
};
