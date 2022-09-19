const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;

const payiments_json = require("../src/mocks/details.json");

app.use(cors());

app.get("/api/payments", (req, res) => {
  res.json(payiments_json);
});

app.listen(port, () => {
  console.log(`Server started, listening on ${port}`);
});
