import express from 'express';
import {protect, admin} from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

import {
	getProducts,
	getProductById,
	createProduct,
	editProduct,
	deleteProduct,
	createProductReview,
	getTopProducts,
} from '../controllers/index.js';

const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/top').get(getTopProducts);
router
	.route('/:id')
	.get(checkObjectId, getProductById)
	.put(protect, admin, checkObjectId, editProduct)
	.delete(protect, admin, checkObjectId, deleteProduct);
router.route('/:id/reviews').post(checkObjectId, protect, createProductReview);

export default router;
