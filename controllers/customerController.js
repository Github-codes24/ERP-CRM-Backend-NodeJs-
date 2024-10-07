const Customer = require("../models/customerModel");
const getTopCustomer = async (req, res) => {
  const topCustomer = await Customer.find({})
    .sort({
      customerSince: -1,
    })
    .limit(5);

  res.status(200).json(topCustomer);
};

const addCustomer= async (req, res) => {
  const {
    workplace1,
    workplace2,
    addHod,
    other,
    quotationInTheNameDesignation,
    salesPersonName
  } = req.body;

  const newCustomer = new Customer({
    workplace1,
    workplace2,
    addHod,
    other,
    quotationInTheNameDesignation,
    salesPersonName
  });

  try {
    const savedCustomer = await newCustomer.save();
    res.status(201).json(savedCustomer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getCustomerDetails = async (req, res) => {
  try {
    // Fetch all customer data
    const getData = await Customer.find();
    
    // Count total customers in the database
    const totalCustomers = await Customer.countDocuments();

    // Send response with data and total customer count
    res.status(200).json({ totalCustomers, customers: getData });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


module.exports={
    getTopCustomer, addCustomer, getCustomerDetails
}