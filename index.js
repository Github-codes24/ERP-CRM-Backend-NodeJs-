const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

//adding  routes
const customerRouter = require("./routes/customerRoutes.js");
const productRouter = require("./routes/productRoutes.js");
const leadRouter = require("./routes/leadRoutes.js");
const postRouter = require("./routes/posts.js");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/finance", postRouter);

app.use("/api/customer", customerRouter);
app.use("/api/product", productRouter);
app.use("/api/lead", leadRouter);

//adding default error handling

app.use((err, req, res) => {
  res.status(500).json({ error: err.message });
});

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(7000, () => {
  console.log(`server is running on localhost:7000`);
});
