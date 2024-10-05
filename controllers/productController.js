const Product = require("../models/productModel");
const Sales = require("../models/saleModel");

const getTopProducts = async (req, res) => {
  try {
    const topProducts = await Sales.aggregate([
      {
        // Group by productName and sum the total noOfProductsSold
        $group: {
          _id: "$productName",
          totalProductsSold: { $sum: { $toInt: "$noOfProductsSold" } } // Convert noOfProductsSold to an integer and sum
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

module.exports = {
  getTopProducts,
  earningPerProduct,
};
