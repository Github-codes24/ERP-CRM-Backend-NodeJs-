const Product = require("../models/productModel");

const getTopProducts = async (req, res) => {
  const topProducts = await Product.find({})
    .sort({
      projects: -1,
      popularity: -1,
    })
    .limit(5);
  res.status(200).json(topProducts);
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
