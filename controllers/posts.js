const  Company =  require('../models/company.js');
const  Finance =  require('../models/finance.js');
const Sale = require('../models/saleModel.js');

const setCompany = async (req, res) => {
    const { companyName } = req.body; 
    try {
        let company = await Company.findOne({ companyName });
        
        if (!company) {
            company = new Company(req.body); 
            await company.save();
        }
        
        res.status(200).json(company);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' }); 
    }
};

const getFinancialdata = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear(); // Get the current year

    const salesData = await Sale.aggregate([
      {
        // Match records where 'createdAt' is within the current year
        $match: {
          createdAt: {
            $gte: new Date(`${currentYear}-01-01`), // Start of the current year
            $lte: new Date(`${currentYear}-12-31`)  // End of the current year
          }
        }
      },
      {
        // Project a new field for month and cast 'billAmount' to number
        $project: {
          month: { $month: "$createdAt" }, // Extract the month from the 'createdAt' field
          billAmount: { $toDouble: "$billAmount" }, // Cast 'billAmount' to a number
        }
      },
      {
        // Group by month and sum the 'billAmount' for each month
        $group: {
          _id: { month: "$month" },
          totalBillAmount: { $sum: "$billAmount" }, // Sum the billAmount for each month
          count: { $sum: 1 } // Count the number of documents (invoices) for each month
        }
      },
      {
        // Sort the result by month in ascending order (Jan to Dec)
        $sort: { "_id.month": 1 }
      }
    ]);
    // Define an array of month names
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Format the response for all months (January to December)
    const monthlyData = Array.from({ length: 12 }, (_, i) => ({
      month: monthNames[i], // Months: 1 (January) to 12 (December)
      totalBillAmount: 0, // Default to 0 if no data for the month
    }));

    // Update the monthlyData array with actual results
    salesData.forEach(data => {
      const monthIndex = data._id.month - 1; // Get the correct index for the month
      monthlyData[monthIndex].totalBillAmount = data.totalBillAmount;
    });

    res.status(200).json({ year: currentYear, monthlyData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCalenderdata = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear(); // Get the current year
    const lastFiveYearsStart = currentYear - 4; // Start year for the last 5 years

    // Pre-fill an array of years for the last 5 years and previous 5 years
    const years = Array.from({ length: 10 }, (_, i) => currentYear - 9 + i); // Years from (currentYear - 9) to currentYear

    // Aggregate for the last 5 and previous 5 years (within the last 10 years)
    const financialData = await Sale.aggregate([
      {
        // Match records where 'createdAt' is within the last 10 years
        $match: {
          createdAt: {
            $lte: new Date(`${currentYear}-12-31`) // End of the current year
          }
        }
      },
      {
        // Project a new field for year and cast 'billAmount' to number
        $project: {
          year: { $year: "$createdAt" }, // Extract the year from the 'createdAt' field
          billAmount: { $toDouble: "$billAmount" }, // Cast 'billAmount' to a number
        }
      },
      {
        // Group by year and sum the 'billAmount' for each year
        $group: {
          _id: { year: "$year" },
          totalBillAmount: { $sum: "$billAmount" }, // Sum the billAmount for each year
          count: { $sum: 1 } // Count the number of documents (invoices) for each year
        }
      },
      {
        // Sort the result by year in ascending order
        $sort: { "_id.year": 1 }
      }
    ]);

    // Initialize a dictionary with all years set to 0 for billAmount and count
    const yearlyData = years.map(year => ({
      year,
      totalBillAmount: 0,
      totalInvoices: 0
    }));

    // Update the yearlyData array with actual results from the aggregation
    financialData.forEach(data => {
      const index = yearlyData.findIndex(entry => entry.year === data._id.year);
      if (index !== -1) {
        yearlyData[index].totalBillAmount = data.totalBillAmount;
        yearlyData[index].totalInvoices = data.count;
      }
    });

    // Separate the data into last 5 years and previous 5 years
    const lastFiveYearsData = yearlyData.filter(entry => entry.year >= lastFiveYearsStart);

    // Prepare the final response with both last 5 years and previous 5 years data
    res.status(200).json({
      lastFiveYearsData,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const addSalesReport = async (req, res) => {
  const { organizationName } = req.body;

  try {
    // Check if the sales report already exists
    let salesReport = await Sale.findOne({ organizationName });

    if (!salesReport) {
      // Create a new sales report if it doesn't exist
      salesReport = new Sale(req.body);
      await salesReport.save();

      return res.status(201).json({
        success: true,
        message: 'Sales report created successfully',
        data: salesReport,
      });
    }

    // If the sales report exists, return a message
    return res.status(400).json({
      success: false,
      message: 'Sales report already exists with same organization name',
    });
  } catch (error) {
    // Log the error and return a 500 response
    console.error('Error adding sales report:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};



const getSalesReport = async (req,res)=>{
  try {
    const salesReport = await Sale.find(); 
    
    return res.status(200).json(salesReport);
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' }); 
}
}

const getTotalbill=async(req,res)=>{
    try {
      const salesdata = await Sale.find();
      const totalBill = salesdata.reduce((acc, sale) => {
        return acc + parseFloat(sale.billAmount) || 0;
    }, 0);

    return res.status(200).json({ data: totalBill });

} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
}

}
const getClearedbill=async(req,res)=>{
  try {
    const salesdata = await Sale.find();
    const clearedBill = salesdata.reduce((acc, sale) => {
      return acc + parseFloat(sale.paidAmount) || 0;
  }, 0);

  return res.status(200).json({ data: clearedBill });

} catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Internal server error' }); 
}

}
const getPendingbill=async(req,res)=>{
  try {
    const salesdata = await Sale.find();
    const pendingBill = salesdata.reduce((acc, sale) => {
      return acc + parseFloat(sale.unclearedAmount) || 0;
  }, 0);

  return res.status(200).json({ data: pendingBill });

} catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Internal server error' }); 
}

}



module.exports= {setCompany,getFinancialdata,getCalenderdata,addSalesReport, getSalesReport, getTotalbill, getClearedbill,getPendingbill};