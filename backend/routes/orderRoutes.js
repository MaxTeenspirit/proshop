import express from 'express';

import {protect, admin} from '../middleware/authMiddleware.js';
import {
	addOrderItems,
	getUserOrders,
	getOrderById,
	updateOrderToPaid,
	updateOrderToDelivered,
	getOrders,
} from '../controllers/index.js';

const router = express.Router();

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/mine').get(protect, getUserOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').get(protect, updateOrderToPaid);
router.route('/:id/deliver').get(protect, admin, updateOrderToDelivered);

export default router;
