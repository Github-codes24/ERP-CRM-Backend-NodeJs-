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
    const currentMonth = new Date().getMonth() + 1; // Get the current month (0-indexed, so add 1)
    
    // Determine the start and end of the financial year
    const startYear = currentMonth >= 4 ? currentYear : currentYear - 1; // If April or later, startYear is the current year; otherwise, it's the previous year
    const endYear = startYear + 1;

    const startDate = new Date(`${startYear}-04-01`); // Financial year starts in April
    const endDate = new Date(`${endYear}-03-31`);    // Financial year ends in March

    const salesData = await Sale.aggregate([
      {
        // Match records where 'createdAt' is within the financial year
        $match: {
          createdAt: {
            $gte: startDate, // Start of the financial year
            $lte: endDate    // End of the financial year
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

    // Define an array of financial year month names (April to March)
    const financialYearMonths = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];

    // Format the response for the financial year (April to March)
    const monthlyData = Array.from({ length: 12 }, (_, i) => ({
      month: financialYearMonths[i], // Financial year months
      totalBillAmount: 0, // Default to 0 if no data for the month
    }));

    // Update the monthlyData array with actual results
    salesData.forEach(data => {
      const monthIndex = (data._id.month >= 4 ? data._id.month - 4 : data._id.month + 8); // Adjust index for financial year
      monthlyData[monthIndex].totalBillAmount = data.totalBillAmount;
    });

    res.status(200).json({ financialYear: `${startYear}-${endYear}`, monthlyData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getCalenderdata = async (req, res) => {
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



// const getSalesReport = async (req,res)=>{
//   try {
//     const salesReport = await Sale.find(); 
    
//     return res.status(200).json(salesReport);
// } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' }); 
// }
// }

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

const getSalesReport = async (req, res) => {
  try {
    // Define the dummy data
    const dummyData = [
      {
        name: "Pallav",
        totalSales: 5000,
        salesInPercentage: "21.65",
        noOfProductsSold: 100,
      },
      {
        name: "Vaibhav",
        totalSales: 3000,
        salesInPercentage: "12.99",
        noOfProductsSold: 60,
      },
      {
        name: "Amit",
        totalSales: 2000,
        salesInPercentage: "8.66",
        noOfProductsSold: 40,
      },
      {
        name: "Narendra",
        totalSales: 4000,
        salesInPercentage: "17.32",
        noOfProductsSold: 80,
      },
      {
        name: "Kishan",
        totalSales: 2500,
        salesInPercentage: "10.82",
        noOfProductsSold: 50,
      },
      {
        name: "Company",
        totalSales: 3500,
        salesInPercentage: "15.15",
        noOfProductsSold: 70,
      },
      {
        name: "Aishwarya",
        totalSales: 3100,
        salesInPercentage: "13.42",
        noOfProductsSold: 45,
      },
    ];

    // Send the dummy data in the response
    return res.status(200).json({ data: dummyData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


module.exports= {setCompany,getFinancialdata,getCalenderdata,addSalesReport, getSalesReport, getTotalbill, getClearedbill,getPendingbill};