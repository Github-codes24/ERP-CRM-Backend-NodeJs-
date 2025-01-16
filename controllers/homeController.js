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
      { companyName: "IgniteSphere", productNames: ["Ignition Spark 3000"] }
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

module.exports = { getFinancialdataForHome, getCalendarYearDataForHome, getTopProductsForHome };
