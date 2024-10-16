const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

//adding  routes
const superAdminRoutes = require("./routes/superAdminRoutes.js")
const customerRouter = require("./routes/customerRoutes.js");
const productRouter = require("./routes/productRoutes.js");
const leadRouter = require("./routes/leadRoutes.js");
const postRouter = require("./routes/posts.js");
const companyRouter = require("./routes/companyRoutes.js")

const app = express();

const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5174'],
  methods: ["GET","POST","PUT","DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200
};


app.use(express.json());
// app.use(cors(corsOptions));
app.options("*", cors(corsOptions))

app.use("/api/post", postRouter);
app.use("/api/superAdmin", superAdminRoutes);

app.use("/api/customer", customerRouter);
app.use("/api/product", productRouter);
app.use("/api/lead", leadRouter);
app.use("/api/company", companyRouter);

//adding default error handling

app.use((err, req, res) => {
  res.status(500).json({ error: err.message });
});

mongoose
  .connect(process.env.MONGO,
    { useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const port = process.env.PORT || 7000;

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});

