const Customer = require("../models/customerModel");

const getTopCustomer = async (req, res) => {
  try {
    // Find customers, sort by createdAt, and limit to 5
    const topCustomers = await Customer.find({})
      .sort({ createdAt: 1 })
      .limit(5)
      .select("workplace1.workplaceName createdAt");

    // Function to convert milliseconds to a duration breakdown
    const getDuration = (startDate) => {
      const now = new Date();
      const diffTime = Math.abs(now - new Date(startDate));

      // Calculate breakdown
      const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffTime % (1000 * 60)) / 1000);

      return `${days} days`;
    };

    // Process customers and get time duration
    const result = topCustomers.map((customer) => ({
      workplaceName: customer.workplace1.workplaceName,
      duration: getDuration(customer.createdAt),  // Get full duration
    }));

    // Send the result
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching top customers:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
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
        console.error('Error creating tender:', error); 
        return res.status(500).json({ message: error.message }); 
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
        console.error('Error creating tender:', error); 
        return res.status(500).json({ message: error.message }); 
    }
};

const getCustomerById = async (req, res) => {
  try {
    // Extract the customer ID from the request parameters
    const {id} = req.params;

    // Fetch customer data by ID
    const customer = await Customer.findById(id);

    // If customer not found, send a 404 response
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Send response with the customer data
    return res.status(200).json(customer);
  } catch (error) {
        console.error('Error creating tender:', error); 
        return res.status(500).json({ message: error.message }); 
    }
};


module.exports={
    getTopCustomer, addCustomer, getCustomerDetails, getCustomerById,
}