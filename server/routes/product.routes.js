import express from 'express';
import productCtrl from '../controllers/product.controller.js';
const router = express.Router();

// Routes for product CRUD operations
router.route('/api/products')
  .get(productCtrl.list)
  .post(productCtrl.create);

router.route('/api/products/:productId')
  .get(productCtrl.getProductByID)
  .put(productCtrl.update)
  .delete(productCtrl.remove);

router.param('productId', productCtrl.getProductByID);

export default router;
