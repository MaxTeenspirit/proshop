import express from 'express';
import {protect, admin} from '../middleware/authMiddleware.js';

import {getProducts, getProductById, createProduct, editProduct, deleteProduct} from '../controllers/index.js';

const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/:id').get(getProductById).put(protect, admin, editProduct).delete(protect, admin, deleteProduct);

export default router;
