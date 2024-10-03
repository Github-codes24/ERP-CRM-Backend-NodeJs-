require("./connect");

const express = require("express");
const Product = require("./model/productModel");
const Customer = require("./model/customerModel");
const Lead = require("./model/leadModel");
const Report = require("./model/addReportModel");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/getTopProducts", async (req, res) => {
  const topProducts = await Product.find({})
    .sort({
      projects: -1,
      popularity: -1,
    })
    .limit(5);

  res.status(200).json(topProducts);
});

app.get("/getTopCustomer", async (req, res) => {
  const topCustomer = await Customer.find({})
    .sort({
      customerSince: -1,
    })
    .limit(5);

  res.status(200).json(topCustomer);
});

app.get("/earningPerProduct", async (req, res) => {
  const products = await Product.find({});

  const earningPerProduct = products.map((product) => {
    const earnings = product.price * (product.salesPercentage / 100);
    return {
      name: product.name,
      earnings: earnings,
    };
  });

  res.status(200).json(earningPerProduct);
});

app.post("/addLead", async (req, res) => {
  const leadData = req.body;
  const lead = new Lead(leadData);
  const datasave = await lead.save();

  res.status(200).json(datasave);
});

app.get("/getLeads", async (req, res) => {
  const data = await Lead.find({}).select(
    "organizationName lastMeeting nextFollowUp targetDepartment leadOwner"
  );

  res.status(200).json(data);
});

app.get("/trackLead/:id", async (req, res) => {
  const id = req.params.id;
  const result = await Lead.findById({ _id: id }).select(
    "organizationName lastMeeting nextFollowUp status salesExpected category"
  );
  res.status(200).json(result);
});

app.post("/addReport", async (req, res) => {
  try {
    const reportData = req.body;

    const {
      employeeFirstName,
      employeeLastName,
      productName,
      date,
      organizationName,
      email,
      contact,
      region,
      state,
      district,
      billAmount,
      paidAmount,
      unclearedAmount,
      noOfProductSold,
      billStatus,
    } = reportData;

    if (
      !employeeFirstName ||
      !employeeLastName ||
      !productName ||
      !date ||
      !organizationName ||
      !email ||
      !contact ||
      !region ||
      !state ||
      !district ||
      !billAmount ||
      !paidAmount ||
      !unclearedAmount ||
      !noOfProductSold ||
      !billStatus ||
      !Array.isArray(billStatus)
    ) {
      return res.status(400).json({ message: "All fields are mandatory." });
    }

    const report = new Report(reportData);

    const reportSave = await report.save();

    res.status(200).json(reportSave);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error saving the report", error: error.message });
  }
});

app.get("/getReport", async (req, res) => {
  try {
    const data = await Report.find({}).select(
      "employeeFirstName productName date noOfProductSold billAmount paidAmount unclearedAmount billStatus"
    );

    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching reports", error: error.message });
  }
});

app.get("/getTotalBillAmount", async (req, res) => {
  try {
    const reports = await Report.find({}).select("billAmount");

    const totalAmount = reports.reduce((total, report) => {
      const billAmount = parseFloat(report.billAmount);
      return total + (isNaN(billAmount) ? 0 : billAmount);
    }, 0);

    res.status(200).json({ totalAmount });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error calculating total bill amount",
        error: error.message,
      });
  }
});

app.get("/totalClearedBills", async (req, res) => {
  try {
    const reports = await Report.find({});

    const totalClearedBills = reports.reduce((total, report) => {
      const paidAmount = parseFloat(report.paidAmount) || 0;
      return total + paidAmount;
    }, 0);

    res.status(200).json({ totalClearedBills });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching total cleared bills",
        error: error.message,
      });
  }
});

app.get("/totalClearedBills", async (req, res) => {
  try {
    const reports = await Report.find({});

    const totalClearedBills = reports.reduce((total, report) => {
      const paidAmount = parseFloat(report.paidAmount) || 0;
      return total + paidAmount;
    }, 0);

    res.status(200).json({ totalClearedBills });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching total cleared bills",
        error: error.message,
      });
  }
});

app.get("/totalPendingBills", async (req, res) => {
  try {
    const reports = await Report.find({});

    const totalPendingBills = reports.reduce((total, report) => {
      const UnPaidAmount = parseFloat(report.unclearedAmount) || 0;
      return total + UnPaidAmount;
    }, 0);

    res.status(200).json({ totalPendingBills });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching total  Uncleared bills",
        error: error.message,
      });
  }
});



app.listen(3000, () => {
  console.log("connected");
});
