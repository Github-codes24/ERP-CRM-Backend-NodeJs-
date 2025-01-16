const getFinancialdataForHome = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    // Determine the start and end of the financial year
    const startYear = currentMonth >= 4 ? currentYear : currentYear - 1;
    const endYear = startYear + 1;

    const financialYearMonths = [
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
      "Jan",
      "Feb",
      "Mar",
    ];

    // Dummy data for four companies
    const companies = ["Unisol", "Surgisol", "Envirosol", "IgniteSphere"];
    const dummyData = companies.map((company) => ({
      companyName: company,
      financialYear: `${startYear}-${endYear}`,
      monthlyData: Array.from({ length: 12 }, (_, i) => ({
        month: financialYearMonths[i],
        totalBillAmount: Math.floor(Math.random() * 10000 + 5000), // Random value between 5000 and 15000
      })),
    }));

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
        earning: Math.random() * 5000 + 1000,
      },
      {
        companyName: "Surgisol",
        productName: "Surgical Kit Advanced",
        earning: Math.random() * 5000 + 1000,
      },
      {
        companyName: "Envirosol",
        productName: "Eco Cleaner Max",
        earning: Math.random() * 5000 + 1000,
      },
      {
        companyName: "IgniteSphere",
        productName: "HeatWave Generator",
        earning: Math.random() * 5000 + 1000,
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
            name: "Pallav",
            totalSales: 5000,
            salesInPercentage: "25.00",
            noOfProductsSold: 100,
          },
          {
            name: "Vaibhav",
            totalSales: 3000,
            salesInPercentage: "15.00",
            noOfProductsSold: 60,
          },
          {
            name: "Amit",
            totalSales: 2000,
            salesInPercentage: "10.00",
            noOfProductsSold: 40,
          },
          {
            name: "Narendra",
            totalSales: 4000,
            salesInPercentage: "20.00",
            noOfProductsSold: 80,
          },
          {
            name: "Kishan",
            totalSales: 2500,
            salesInPercentage: "12.50",
            noOfProductsSold: 50,
          },
          {
            name: "Company",
            totalSales: 3500,
            salesInPercentage: "17.50",
            noOfProductsSold: 70,
          },
        ],
      },
      {
        companyName: "Surgisol",
        salesPeople: [
          {
            name: "Pallav",
            totalSales: 5500,
            salesInPercentage: "27.50",
            noOfProductsSold: 110,
          },
          {
            name: "Vaibhav",
            totalSales: 3200,
            salesInPercentage: "16.00",
            noOfProductsSold: 64,
          },
          {
            name: "Amit",
            totalSales: 2200,
            salesInPercentage: "11.00",
            noOfProductsSold: 44,
          },
          {
            name: "Narendra",
            totalSales: 4200,
            salesInPercentage: "21.00",
            noOfProductsSold: 84,
          },
          {
            name: "Kishan",
            totalSales: 2700,
            salesInPercentage: "13.50",
            noOfProductsSold: 54,
          },
          {
            name: "Company",
            totalSales: 3800,
            salesInPercentage: "19.00",
            noOfProductsSold: 76,
          },
        ],
      },
      {
        companyName: "Envirosol",
        salesPeople: [
          {
            name: "Pallav",
            totalSales: 4800,
            salesInPercentage: "24.00",
            noOfProductsSold: 96,
          },
          {
            name: "Vaibhav",
            totalSales: 2900,
            salesInPercentage: "14.50",
            noOfProductsSold: 58,
          },
          {
            name: "Amit",
            totalSales: 1900,
            salesInPercentage: "9.50",
            noOfProductsSold: 38,
          },
          {
            name: "Narendra",
            totalSales: 4100,
            salesInPercentage: "20.50",
            noOfProductsSold: 82,
          },
          {
            name: "Kishan",
            totalSales: 2600,
            salesInPercentage: "13.00",
            noOfProductsSold: 52,
          },
          {
            name: "Company",
            totalSales: 3600,
            salesInPercentage: "18.00",
            noOfProductsSold: 72,
          },
        ],
      },
      {
        companyName: "IgniteSphere",
        salesPeople: [
          {
            name: "Pallav",
            totalSales: 4900,
            salesInPercentage: "24.50",
            noOfProductsSold: 98,
          },
          {
            name: "Vaibhav",
            totalSales: 3100,
            salesInPercentage: "15.50",
            noOfProductsSold: 62,
          },
          {
            name: "Amit",
            totalSales: 2100,
            salesInPercentage: "10.50",
            noOfProductsSold: 42,
          },
          {
            name: "Narendra",
            totalSales: 4300,
            salesInPercentage: "21.50",
            noOfProductsSold: 86,
          },
          {
            name: "Kishan",
            totalSales: 2800,
            salesInPercentage: "14.00",
            noOfProductsSold: 56,
          },
          {
            name: "Company",
            totalSales: 3700,
            salesInPercentage: "18.50",
            noOfProductsSold: 74,
          },
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
    // Dummy data for the companies and their respective single workplace
    const companyWorkplaces = {
      Unisol: "Workplace A",
      Surgisol: "Workplace X",
      Envirosol: "Workplace 1",
      IgniteSphere: "Workplace Alpha"
    };

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

      return `${days} days`; // Simplified to just days
    };

    // Generate dummy data for each company and their single workplace
    const result = Object.entries(companyWorkplaces).map(([company, workplace]) => {
      // Generating random createdAt dates for each workplace (within the last year)
      const randomDate = new Date(
        Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000) // Random date within the last year
      );

      return {
        companyName: company,
        workplaceName: workplace,
        duration: getDuration(randomDate), // Get the duration based on createdAt
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


module.exports = {
  getFinancialdataForHome,
  getCalendarYearDataForHome,
  getTopProductsForHome,
  earningByCompany,
  getSalesReportForHome,
  getTopCustomerForHome,
};
