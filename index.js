const express = require("express");
const app = express();
const morgan = require("morgan");
app.use(morgan("dev"));

app.get("/sum", (req, res) => {
  const { a, b } = req.query;
  if (!a || !b) {
    return res.status(404).send("must provide both values");
  }
  const c = parseFloat(a) + parseFloat(b);
  res.send(`The sum of ${a} and ${b} is ${c}`);
});

app.listen(3000, () => console.log("connected on port 3000"));
