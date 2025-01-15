const Product = require("../models/productModel");
const Sales = require("../models/saleModel");

const getTopProducts = async (req, res) => {
  try {
    const salesData = await Sales.aggregate([
      {
        // Group by productName and sum the total noOfProductsSold
        $group: {
          _id: "$productName",
          totalProductsSold: { $sum: { $toDouble: "$noOfProductsSold" } }, // Convert to double and sum
        },
      },
      {
        // Add a field to store the product's popularity (totalProductsSold)
        $addFields: { popularity: "$totalProductsSold" },
      },
      {
        // Sort by total number of products sold in descending order
        $sort: { totalProductsSold: -1 },
      },
    ]);

    // Calculate the total sales across all products
    const totalSales = salesData.reduce(
      (acc, product) => acc + product.totalProductsSold,
      0
    );

    const maxPopularity = Math.max(...salesData.map((product) => product.popularity));

    const formattedData = salesData.map((product) => ({
      productName: product._id,
      popularity: product.popularity,
      normalizedPopularity: (product.popularity / maxPopularity) * 100, // Normalized to max
      salesPercentage: ((product.totalProductsSold / totalSales) * 100).toFixed(2),
    }));

    // Optionally limit the top products
    const topProducts = formattedData.slice(0, 5); // Adjust limit as needed

    res.status(200).json(topProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};



const earningPerProduct = async (req, res) => {
  const products = await Product.find({});

  const earningPerProduct = products.map((product) => {
    console.log(product.price);
    const earnings = product.price * (product.salesPercentage / 100);
    return {
      name: product.name,
      earnings: earnings,
    };
  });
  res.status(200).json(earningPerProduct);
};

const earningByItem = async (req, res) => {
  try {
    // Use Mongoose aggregation to group by productName and sum the paidAmount
    const totalPaidAmount = await Sales.aggregate([
      {
        // Group by productName
        $group: {
          _id: "$productName",  // Group by productName field
          totalPaidAmount: {
            $sum: { $toDouble: "$paidAmount" }  // Convert paidAmount from string to integer and sum it
          }
        }
      }
    ]);

    // Format the response
    const formattedResult = totalPaidAmount.map(item => ({
      productName: item._id,
      totalPaidAmount: item.totalPaidAmount
    }));

    // Send the result back
    return res.status(200).json(formattedResult);
  } catch (error) {
    console.error('Error calculating total paid amount:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};


module.exports = {
  getTopProducts,
  earningPerProduct,
  earningByItem
};
