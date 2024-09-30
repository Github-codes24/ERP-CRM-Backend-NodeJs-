const Customer = require("../models/customerModel");
const getTopCustomer = async (req, res) => {
  const topCustomer = await Customer.find({})
    .sort({
      customerSince: -1,
    })
    .limit(5);

  res.status(200).json(topCustomer);
};


module.exports={
    getTopCustomer   
}