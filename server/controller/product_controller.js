const Product = require("../model/product_model");
const jwt = require("jsonwebtoken");

module.exports = {
  addProduct: async (req, res) => {
    try {
      if(req.file){
        console.log(req.file)
        const url_image = `http://localhost:3000/uploads/${req.file.filename}`
        req.body.product_image = url_image
      }
   
      const { product_name, product_price , categories } = req.body;


     const parseCategory = JSON.parse(req.body.categories)

      if (!product_name || !product_price || !categories) {
        throw new Error("name and price missing");
      }

      const newProduct = new Product({
        ...req.body,categories:parseCategory
      });
      await newProduct.save();

      return res.status(200).json({
        message: "successfully to add product",
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        message: "error in add product",
        success: false,
        error: error.message,
      });
    }
  },
  getAllProducts:async (req, res) => {
    try {

      const products = await Product.find().populate("categories").exec();
    
      return res.status(200).json({
        message: "successfully to get products",
        success: true,
        products
      });
    } catch (error) {
      return res.status(500).json({
        message: "error in get products",
        success: false,
        error: error.message,
      });
    }
  },
};
