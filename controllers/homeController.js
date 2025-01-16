const getFinancialdataForHome = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    // Determine the start and end of the financial year
    const startYear = currentMonth >= 4 ? currentYear : currentYear - 1;
    const endYear = startYear + 1;

    const financialYearMonths = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];

    // Dummy data for four companies
    const companies = ["Unisol", "Surgisol", "Envirosol", "IgniteSphere"];
    const dummyData = companies.map(company => ({
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

module.exports = { getFinancialdataForHome };
