const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
const route = express.Router();
const routes = require("./routes");
app.use("/api", route);
const PORT = 3080;

route.use(bodyParser.urlencoded({ extended: true }));
route.use(bodyParser.json());
route.use(cors());
route.use(morgan("dev"));

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Serveur up and running on http://localhost:${PORT}`);
});

routes(route);
