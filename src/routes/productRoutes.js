import express from 'express';
import formidable from 'express-formidable';
import { authenticate, authorizeAdmin } from '../middlewares/auth.js';
import checkId from '../middlewares/checkId.js';
import createProduct from '../controllers/Product/createProduct.js';
import getProduct from '../controllers/Product/getProduct.js';
import updateProduct from '../controllers/Product/updateProduct.js';
import deleteProduct from '../controllers/Product/deleteProduct.js';
import getAllProduct from '../controllers/Product/getAllProduct.js';
import getProductById from '../controllers/Product/getProductById.js';
import createProductReview from '../controllers/Product/createProductReview.js';
import getTopProduct from '../controllers/Product/getTopProduct.js';
import getNewProduct from '../controllers/Product/getNewProduct.js';
const router = express.Router();

router
  .route('/')
  .get(getProduct)
  .post(authenticate, authorizeAdmin, formidable(), createProduct);

router.route('/allproduct').get(getAllProduct);
router.route('/review/:id').post(authenticate, checkId, createProductReview);

router.route('/topproduct').get(getTopProduct);
router.route('/newproduct').get(getNewProduct);

router
  .route('/:id')
  .get(getProductById)
  .put(authenticate, authorizeAdmin, formidable(), updateProduct)
  .delete(authenticate, authorizeAdmin, deleteProduct);

export default router;
