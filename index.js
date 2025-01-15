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
const postRouter = require("./routes/sales.js");
const companyRouter = require("./routes/companyRoutes.js");
const connectDB = require("./config/db.js");
const { mURL } = require("./controllers/companyController.js");

const app = express();

const corsOptions = {
  origin: "*",
  methods: ["GET","POST","PUT","DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200
};


app.use(express.json());
// app.use(cors(corsOptions));
app.use(cors(corsOptions))


app.get("/", (req, res) => {
  res.send(`
    <html>
      <head><title>Inventory</title></head>
      <body>
        <h1>Welcome to CRM</h1>
      </body>
    </html>
  `);
});

app.use("/api/post", postRouter);
app.use("/api/superAdmin", superAdminRoutes);

app.use("/api/customer", customerRouter);
app.use("/api/product", productRouter);
app.use("/api/lead", leadRouter);
app.use("/api/company", companyRouter);

// 404 Middleware for handling routes that don't exist
app.use((req, res, next) => {
  res.status(404).json({ status: false, message: "Route not found" });
});
;
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
// Create a function to handle dynamic MongoDB connections
const connectToMongoDB = async (mongoURI) => {
  try {
    console.log("inde")
    // Check if already connected to MongoDB, if so, disconnect
    if (mongoose.connection.readyState === 1 || mongoose.connection.readyState === 2) {
      await mongoose.disconnect();
      console.log('Disconnected from the previous MongoDB cluster');
    }

    // Connect to the new MongoDB URI
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log(`Connected to new MongoDB`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    throw error;
  }
};


const port = process.env.PORT || 7000;

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});

// Export connectToMongoDB function to be used in other files (like routes)
// module.exports = { connectToMongoDB };
