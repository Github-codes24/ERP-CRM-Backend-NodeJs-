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
      const hours = Math.floor(
        (diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffTime % (1000 * 60)) / 1000);

      return `${days} days`;
    };

    // Process customers and get time duration
    const result = topCustomers.map((customer) => ({
      workplaceName: customer.workplace1.workplaceName,
      duration: getDuration(customer.createdAt), // Get full duration
    }));

    // Send the result
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching top customers:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const addCustomer = async (req, res) => {
  const {
    workplace1,
    addLead,
    other,
    quotationInTheNameDesignation,
    salesPersonName,
  } = req.body;

  // Add organizationName first and then spread addLead properties
  const updatedAddLead = {
    organizationName: workplace1.workplaceName,
    ...addLead,
  };
  const newCustomer = new Customer({
    workplace1,
    addLead: updatedAddLead,
    other,
    quotationInTheNameDesignation,
    salesPersonName,
  });

  try {
    const savedCustomer = await newCustomer.save();
    res.status(201).json({ success: true, message: "customer added successfully", savedCustomer});
  } catch (error) {
    console.error("Error creating tender:", error);
    return res.status(500).json({ message: error.message });
  }
};

const editCustomerById = async (req, res) => {
  try {
    const { id } = req.params; // Assuming the customer's ID is provided in the route parameter
    const updateData = req.body; // The fields to update are sent in the request body

    // Validate the presence of an ID
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Customer ID is required to update the customer.",
      });
    };

    // Find the customer by ID and update with the provided data
    const updatedCustomer = await Customer.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true } // Return the updated document and validate data
    );

    if (!updatedCustomer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found with the provided ID.",
      });
    }

    // Send the updated customer in the response
    return res.status(200).json({
      success: true,
      message: "Customer updated successfully.",
      updatedCustomer,
    });
  } catch (error) {
    console.error("Error updating customer:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the customer.",
      error: error.message,
    });
  }
};


const getCustomerDetails = async (req, res) => {
  try {
    // Fetch all customer data
    const getData = await Customer.find().sort({ createdAt: -1 });

    // Count total customers in the database
    const totalCustomers = await Customer.countDocuments();

    // Send response with data and total customer count
    res.status(200).json({ totalCustomers, customers: getData });
  } catch (error) {
    console.error("Error creating tender:", error);
    return res.status(500).json({ message: error.message });
  }
};

const getTotalCustomerNo = async (req, res) => {
  try {
    // Fetch all customer data
    const getData = await Customer.find();

    // Count total customers in the database
    const totalCustomers = await Customer.countDocuments();

    // Send response with data and total customer count
    res.status(200).json({ totalCustomers });
  } catch (error) {
    console.error("Error creating tender:", error);
    return res.status(500).json({ message: error.message });
  }
};
const getTotalActiveCustomerNo = async (req, res) => {
  try {
    // Count total customers in the database
    const totalActiveCustomers = await Customer.countDocuments();

    // Send response with data and total customer count
    return res.status(200).json({ totalCustomers: totalActiveCustomers - 1 });
  } catch (error) {
    console.error("Error creating tender:", error);
    return res.status(500).json({ message: error.message });
  }
};

const getTotalInactiveCustomerNo = async (req, res) => {
  try {
    // const totalActiveCustomers = await Customer.countDocuments();

    // Send response with data and total customer count
    return res.status(200).json({ totalInactiveCustomers: 1 });
  } catch (error) {
    console.error("Error creating tender:", error);
    return res.status(500).json({ message: error.message });
  }
};

const getCustomerById = async (req, res) => {
  try {
    // Extract the customer ID from the request parameters
    const { id } = req.params;

    // Fetch customer data by ID
    const customer = await Customer.findById(id);

    // If customer not found, send a 404 response
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Send response with the customer data
    return res.status(200).json(customer);
  } catch (error) {
    console.error("Error creating tender:", error);
    return res.status(500).json({ message: error.message });
  }
};

const getOrganizationNames = async (req, res) => {
  try {
    // Fetch customer names
    const customers = await Customer.find().select({ "workplace1.workplaceName": 1 });

    // If customer not found, send a 404 response
    if (!customers.length) {
      return res.status(404).json({ message: "Customers not found" });
    }

    // Map the response to include _id and organizationName
    const formattedCustomers = customers.map(customer => ({
      _id: customer._id,
      organizationName: customer.workplace1?.workplaceName || "Unknown", // Handle cases where workplace1 or workplaceName might be missing
    }));

    // Send response with the customer data
    return res.status(200).json({ status: true, organizations: formattedCustomers });
  } catch (error) {
    console.error("Error creating tender:", error);
    return res.status(500).json({ message: error.message });
  }
};

const getOrganizationTypes = async (req, res) => {
  try {
    const organizationTypes = [
      "Government",
      "Stand alone",
      "Private",
      "Corporate",
      "other"
    ];
    // Send response with the customer data
    return res.status(200).json({ status: true, organizationTypes: organizationTypes });
  } catch (error) {
    console.error("Error creating tender:", error);
    return res.status(500).json({ message: error.message });
  }
};

const getOrganizationStatus = async (req, res) => {
  try {
    const getOrganizationStatus = [
      "Central",
      "Municipal",
      "Railways",
      "PSU",
      "Defence",
      "Trust",
      "other"
    ];
    // Send response with the customer data
    return res.status(200).json({ status: true, getOrganizationStatus: getOrganizationStatus });
  } catch (error) {
    console.error("Error creating tender:", error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTopCustomer,
  addCustomer,
  editCustomerById,
  getCustomerDetails,
  getCustomerById,
  getOrganizationNames,
  getOrganizationTypes,
  getOrganizationStatus,
  getTotalCustomerNo,
  getTotalActiveCustomerNo,
  getTotalInactiveCustomerNo
};
