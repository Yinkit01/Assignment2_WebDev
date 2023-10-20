import Product from '../models/product.model.js';
import errorHandler from './error.controller.js';

const create = async (req, res) => {
  const product = new Product(req.body);
  try {
    await product.save();
    return res.status(200).json({
      message: "Product created successfully!",
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
}

const list = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
}

const getProductByID = async (req, res, next, id) => { 
  try {
      let product = await Product.findById(id) 
      if (!product)
          return res.status(400).json( {error: "Product not found"} )
      req.profile = product 
      next()
  } catch (err) {
      return res.status(400).json( {error: "Could not retrieve product"} ) 
  }
}

const update = async (req, res) => {
  try {
    let product = req.product;
    product.set(req.body);
    await product.save();
    res.json(product);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
}

const remove = async (req, res) => {
  try {
    let product = req.product;
    await product.remove();
    res.json(product);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
}

export default { create, list, getProductByID, update, remove };
