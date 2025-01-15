const Product = require("../models/productModel");
const Sales = require("../models/saleModel");

const getTopProducts = async (req, res) => {
  try {
    const topProducts = await Sales.aggregate([
      {
        // Group by productName and sum the total noOfProductsSold
        $group: {
          _id: "$productName",
          totalProductsSold: { $sum: { $toDouble: "$noOfProductsSold" } } // Convert noOfProductsSold to an integer and sum
        }
      },
      {
        // Sort the products by the total number of products sold in descending order
        $sort: { totalProductsSold: -1 }
      },
      {
        // Limit the number of top products (optional, you can change the limit)
        $limit: 5
      }
    ]);

    res.status(200).json(topProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
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
    console.log("cccccc")
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
