import express from 'express';
import {protect, admin} from '../middleware/authMiddleware.js';

import {getProducts, getProductById, createProduct, editProduct} from '../controllers/index.js';

const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/:id').get(getProductById).put(protect, admin, editProduct);

export default router;
