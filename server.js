const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./src/routes");

const app = express();
const port = process.env.PORT || 3000;
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan(":status :method :url :response-time  ms"));
app.use(cors());

app.use("/user", routes.user);
app.use("/discussions", routes.discussions);

app.use((error, req, res, next) => {
  console.log(error);
  if (error.response)
    res.status(error.response.status).send(error.response.data);
  else res.status(500).send(error);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
