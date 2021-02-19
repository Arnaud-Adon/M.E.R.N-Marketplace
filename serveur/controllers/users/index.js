const client = require("../../services/database/client");

exports.add = function (req, res) {
  const users = client.db("marketplace").collection("users");

  users
    .insertOne(req.body)
    .then(() => res.status(200).send("user successfully added"))
    .catch((err) => res.send(err));
};

exports.get = function (req, res) {
  const users = client.db("marketplace").collection("users");
  users
    .findOne(req.body)
    .then((err, results) => {
      if (err) return res.send(err);
      return res.status(200).send(results.data);
    })
    .catch((err) => res.send(err));
};
