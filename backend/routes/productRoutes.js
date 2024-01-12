import express from 'express';
import {protect, admin} from '../middleware/authMiddleware.js';

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
router.route('/:id').get(getProductById).put(protect, admin, editProduct).delete(protect, admin, deleteProduct);
router.route('/:id/reviews').post(protect, createProductReview);

export default router;
