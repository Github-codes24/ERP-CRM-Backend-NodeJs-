const getFinancialdataForHome = async (req, res) => {
  try {
    const { filterBy } = req.query; // 'monthly', 'quarterly', or 'yearly'
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    // Determine the start and end of the financial year
    const startYear = currentMonth >= 4 ? currentYear : currentYear - 1;
    const endYear = startYear + 1;

    // Define months and quarters
    const financialYearMonths = [
      "Apr", "May", "Jun", "Jul", "Aug", "Sep",
      "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"
    ];
    const quarters = [
      "Apr-Jun",
      "Jul-Sep",
      "Oct-Dec",
      "Jan-Mar",
    ];;

    // Dummy data for four companies
    const companies = ["Unisol", "Surgisol", "Envirosol", "IgniteSphere"];
    const dummyData = companies.map((company) => {
      // Generate monthly data
      const monthlyData = Array.from({ length: 12 }, (_, i) => ({
        month: financialYearMonths[i],
        totalBillAmount: Math.floor(Math.random() * 10000 + 5000), // Random value between 5000 and 15000
      }));

      // Aggregate data based on the requested filter level
      let aggregatedData;
      switch (filterBy) {
        case 'quarterly':
          aggregatedData = quarters.map((quarter, index) => {
            const quarterMonths = monthlyData.slice(index * 3, index * 3 + 3);
            const totalBillAmount = quarterMonths.reduce((sum, data) => sum + data.totalBillAmount, 0);
            return { quarter, totalBillAmount };
          });
          break;
        case 'yearly':
          const totalBillAmount = monthlyData.reduce((sum, data) => sum + data.totalBillAmount, 0);
          aggregatedData = [{ year: `${startYear}-${endYear}`, totalBillAmount }];
          break;
        case 'monthly':
        default:
          aggregatedData = monthlyData;
          break;
      }

      return {
        companyName: company,
        financialYear: `${startYear}-${endYear}`,
        data: aggregatedData,
      };
    });

    // Send dummy data as response
    res.status(200).json({ data: dummyData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getCalendarYearDataForHome = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();

    const calendarYearMonths = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Dummy data for four companies
    const companies = ["Unisol", "Surgisol", "Envirosol", "IgniteSphere"];
    const dummyData = companies.map((company) => ({
      companyName: company,
      calendarYear: `${currentYear}`,
      monthlyData: Array.from({ length: 12 }, (_, i) => ({
        month: calendarYearMonths[i],
        totalBillAmount: Math.floor(Math.random() * 10000 + 5000), // Random value between 5000 and 15000
      })),
    }));

    // Send dummy data as response
    res.status(200).json({ data: dummyData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTopProductsForHome = async (req, res) => {
  try {
    // Define companies and their respective products
    const companyProducts = [
      { companyName: "Unisol", productNames: ["Solar Panel Pro"] },
      { companyName: "Surgisol", productNames: ["Surgical Kit Advanced"] },
      { companyName: "Envirosol", productNames: ["Eco Cleaner Max"] },
      { companyName: "IgniteSphere", productNames: ["Ignition Spark 3000"] },
    ];

    // Generate random sales data for each product
    const dummyData = companyProducts.flatMap((company) =>
      company.productNames.map((productName) => {
        const noOfProductsSold = Math.floor(Math.random() * 500 + 100); // Random no. of products sold: 100 to 600
        const popularity = noOfProductsSold; // Popularity is set as the total no. of products sold
        const salesPercentage = Math.random() * 100; // Random sales percentage: 0 to 100

        return {
          companyName: company.companyName,
          productName,
          noOfProductsSold, // Add the no. of products sold
          popularity, // Add the popularity
          salesPercentage: salesPercentage.toFixed(2), // Keep sales percentage
        };
      })
    );

    res.status(200).json({ data: dummyData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const earningByCompany = async (req, res) => {
  try {
    // Define dummy data for each company and product
    const companyEarnings = [
      {
        companyName: "Unisol",
        productName: "Solar Panel Pro",
        earning: Math.floor(Math.random() * 5000 + 1000), // Remove decimals
      },
      {
        companyName: "Surgisol",
        productName: "Surgical Kit Advanced",
        earning: Math.floor(Math.random() * 5000 + 1000), // Remove decimals
      },
      {
        companyName: "Envirosol",
        productName: "Eco Cleaner Max",
        earning: Math.floor(Math.random() * 5000 + 1000), // Remove decimals
      },
      {
        companyName: "IgniteSphere",
        productName: "HeatWave Generator",
        earning: Math.floor(Math.random() * 5000 + 1000), // Remove decimals
      },
    ];

    // Send the result back with earnings grouped by product and company
    return res.status(200).json({ data: companyEarnings });
  } catch (error) {
    console.error("Error calculating total paid amount:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const getSalesReportForHome = async (req, res) => {
  try {
    // Define the dummy data for each company with the same salespeople
    const dummyData = [
      {
        companyName: "Unisol",
        salesPeople: [
          {
            name: "Pallav Kr Gopal",
            designation:"Business Head",
            totalSales: 5000,
            salesInPercentage: "21.65",
            noOfProductsSold: 100,
          },
          {
            name: "Vaibhav Shukla",
            designation:"Sales Manager (Mumbai)",
            totalSales: 3000,
            salesInPercentage: "12.99",
            noOfProductsSold: 60,
          },
          {
            name: "Amit Patil",
            designation:"Sales Manager (Nagpur)",
            totalSales: 2000,
            salesInPercentage: "8.66",
            noOfProductsSold: 40,
          },
          // {
          //   name: "Narendra",
          //   totalSales: 4000,
          //   salesInPercentage: "17.32",
          //   noOfProductsSold: 80,
          // },
          {
            name: "Kishan Mathankar",
            designation:"Sales Manager (Yavatmal)",
            totalSales: 2500,
            salesInPercentage: "10.82",
            noOfProductsSold: 50,
          },
          {
            name: "Mayur Dhandale",
            designation:"Sales and Admin (Nagpur)",
            totalSales: 3500,
            salesInPercentage: "15.15",
            noOfProductsSold: 70,
          },
          {
            name: "Company",
            totalSales: 3500,
            salesInPercentage: "15.15",
            noOfProductsSold: 70,
          },
        
          // {
          //   name: "Aishwarya",
          //   totalSales: 3100,
          //   salesInPercentage: "13.42",
          //   noOfProductsSold: 45,
          // },
        ],
      },
      {
        companyName: "Surgisol",
        salesPeople: [
          {
            name: "Pallav Kr Gopal",
            designation:"Business Head",
            totalSales: 5000,
            salesInPercentage: "21.65",
            noOfProductsSold: 100,
          },
          {
            name: "Vaibhav Shukla",
            designation:"Sales Manager (Mumbai)",
            totalSales: 3000,
            salesInPercentage: "12.99",
            noOfProductsSold: 60,
          },
          {
            name: "Amit Patil",
            designation:"Sales Manager (Nagpur)",
            totalSales: 2000,
            salesInPercentage: "8.66",
            noOfProductsSold: 40,
          },
          // {
          //   name: "Narendra",
          //   totalSales: 4000,
          //   salesInPercentage: "17.32",
          //   noOfProductsSold: 80,
          // },
          {
            name: "Kishan Mathankar",
            designation:"Sales Manager (Yavatmal)",
            totalSales: 2500,
            salesInPercentage: "10.82",
            noOfProductsSold: 50,
          },
          {
            name: "Mayur Dhandale",
            designation:"Sales and Admin (Nagpur)",
            totalSales: 3500,
            salesInPercentage: "15.15",
            noOfProductsSold: 70,
          },
          {
            name: "Company",
            totalSales: 3500,
            salesInPercentage: "15.15",
            noOfProductsSold: 70,
          },
        
          // {
          //   name: "Aishwarya",
          //   totalSales: 3100,
          //   salesInPercentage: "13.42",
          //   noOfProductsSold: 45,
          // },
        ],
      },
      {
        companyName: "Envirosol",
        salesPeople:[
          {
            name: "Pallav Kr Gopal",
            designation:"Business Head",
            totalSales: 5000,
            salesInPercentage: "21.65",
            noOfProductsSold: 100,
          },
          {
            name: "Vaibhav Shukla",
            designation:"Sales Manager (Mumbai)",
            totalSales: 3000,
            salesInPercentage: "12.99",
            noOfProductsSold: 60,
          },
          {
            name: "Amit Patil",
            designation:"Sales Manager (Nagpur)",
            totalSales: 2000,
            salesInPercentage: "8.66",
            noOfProductsSold: 40,
          },
          // {
          //   name: "Narendra",
          //   totalSales: 4000,
          //   salesInPercentage: "17.32",
          //   noOfProductsSold: 80,
          // },
          {
            name: "Kishan Mathankar",
            designation:"Sales Manager (Yavatmal)",
            totalSales: 2500,
            salesInPercentage: "10.82",
            noOfProductsSold: 50,
          },
          {
            name: "Mayur Dhandale",
            designation:"Sales and Admin (Nagpur)",
            totalSales: 3500,
            salesInPercentage: "15.15",
            noOfProductsSold: 70,
          },
          {
            name: "Company",
            totalSales: 3500,
            salesInPercentage: "15.15",
            noOfProductsSold: 70,
          },
        
          // {
          //   name: "Aishwarya",
          //   totalSales: 3100,
          //   salesInPercentage: "13.42",
          //   noOfProductsSold: 45,
          // },
        ],
      },
      {
        companyName: "IgniteSphere",
        salesPeople: [
          {
            name: "Pallav Kr Gopal",
            designation:"Business Head",
            totalSales: 5000,
            salesInPercentage: "21.65",
            noOfProductsSold: 100,
          },
          {
            name: "Vaibhav Shukla",
            designation:"Sales Manager (Mumbai)",
            totalSales: 3000,
            salesInPercentage: "12.99",
            noOfProductsSold: 60,
          },
          {
            name: "Amit Patil",
            designation:"Sales Manager (Nagpur)",
            totalSales: 2000,
            salesInPercentage: "8.66",
            noOfProductsSold: 40,
          },
          // {
          //   name: "Narendra",
          //   totalSales: 4000,
          //   salesInPercentage: "17.32",
          //   noOfProductsSold: 80,
          // },
          {
            name: "Kishan Mathankar",
            designation:"Sales Manager (Yavatmal)",
            totalSales: 2500,
            salesInPercentage: "10.82",
            noOfProductsSold: 50,
          },
          {
            name: "Mayur Dhandale",
            designation:"Sales and Admin (Nagpur)",
            totalSales: 3500,
            salesInPercentage: "15.15",
            noOfProductsSold: 70,
          },
          {
            name: "Company",
            totalSales: 3500,
            salesInPercentage: "15.15",
            noOfProductsSold: 70,
          },
        
          // {
          //   name: "Aishwarya",
          //   totalSales: 3100,
          //   salesInPercentage: "13.42",
          //   noOfProductsSold: 45,
          // },
        ],
      },
    ];

    // Send the dummy data in the response
    return res.status(200).json({ data: dummyData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getTopCustomerForHome = async (req, res) => {
  try {
    // Dummy data for the companies, their workplaces, and their images
    const companyDetails = {
      Unisol: { workplace: "Workplace A", image: "https://res.cloudinary.com/dyiz5cqbl/image/upload/v1737379512/Audit_Project/djhd8wcozmsntvvymqsy.svg" },
      Surgisol: { workplace: "Workplace X", image: "https://res.cloudinary.com/dyiz5cqbl/image/upload/v1737380491/Audit_Project/uymwe0rvp7gvmmtssies.svg" },
      Envirosol: { workplace: "Workplace 1", image: "https://res.cloudinary.com/dyiz5cqbl/image/upload/v1737380667/Audit_Project/zxbuouz2wxl8boduceiz.svg" },
      IgniteSphere: { workplace: "Workplace Alpha", image: "https://res.cloudinary.com/dyiz5cqbl/image/upload/v1737380758/Audit_Project/urkez94s2xfensq8brvf.svg" }
    };

    // Function to convert milliseconds to a duration breakdown
    const getDuration = (startDate) => {
      const now = new Date();
      const diffTime = Math.abs(now - new Date(startDate));

      // Calculate breakdown
      const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      return `${days} days`; // Simplified to just days
    };

    // Generate dummy data for each company
    const result = Object.entries(companyDetails).map(([company, details]) => {
      // Generating random createdAt dates for each workplace (within the last year)
      const randomDate = new Date(
        Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000) // Random date within the last year
      );

      return {
        companyName: company,
        workplaceName: details.workplace,
        duration: getDuration(randomDate), // Get the duration based on createdAt
        image: details.image // Add the company's image
      };
    });

    // Send the result
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching top customers:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};


const totalSalesOfAllCompanies = async (req, res) => {
  try {
    const totalSales = "8468000";

    return res.status(200).json({ success: true, totalSales });
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {
  getFinancialdataForHome,
  getCalendarYearDataForHome,
  getTopProductsForHome,
  earningByCompany,
  getSalesReportForHome,
  getTopCustomerForHome,
  totalSalesOfAllCompanies
};
