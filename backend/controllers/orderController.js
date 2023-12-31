import asyncHandler from '../middleware/asyncHandler.js';
import {OrderModel} from '../models/index.js';

// @desc Create new order
// @route POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res, next) => {
	const {orderItems, shippingAddress, paymentMethod, taxPrice, itemsPrice, shippingPrice, totalPrice} = req.body;
	const userId = req.user._id;

	if (orderItems && orderItems.length === 0) {
		res.status(400);
		throw new Error('No order items');
	} else {
		const order = new OrderModel({
			orderItems: orderItems.map((or) => ({...or, product: or._id, _id: undefined})),
			user: userId,
			shippingAddress,
			paymentMethod,
			taxPrice,
			itemsPrice,
			shippingPrice,
			totalPrice,
		});

		const createdOrder = await order.save();

		res.status(201).json(createdOrder);
	}
});

// @desc Get user orders
// @route GET /api/orders/mine
// @access Private
const getUserOrders = asyncHandler(async (req, res, next) => {
	const orders = await OrderModel.find({user: req.user._id});
	res.status(200).json(orders);
});

// @desc Get order by ID
// @route GET /api/orders/:id
// @access Private/Admin
const getOrderById = asyncHandler(async (req, res, next) => {
	const {id} = req.params;
	const order = await OrderModel.findById(id).populate('user', 'name email');

	if (order) {
		res.status(200).json(order);
	} else {
		res.status(404);
		throw new Error('Order not found');
	}
});

// @desc Update order to paid
// @route PUT /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res, next) => {
	const {id} = req.params;

	const order = await OrderModel.findById(id);

	if (order) {
		order.isPaid = true;
		order.paidAt = Date.now();
		order.paymentResult = {
			id: req.body.id,
			status: req.body.status,
			update_time: req.body.update_time,
			email_address: req.body.email_address,
		};

		const updatedOrder = order.save();

		res.status(200).json(updatedOrder);
	} else {
		res.status(404);
		throw new Error('Order not found');
	}
});

// @desc Update order to delivered
// @route PUT /api/orders/:id/deliver
// @access Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res, next) => {
	const {id} = req.params;
	const order = await OrderModel.findById(id);

	if (order) {
		order.isDelivered = true;
		order.deliveredAt = Date.now();

		const updatedOrder = await order.save();

		res.status(200).json(updatedOrder);
	} else {
		res.status(404);
		throw new Error('Order not found');
	}
});

// @desc Get all orders
// @route GET /api/orders
// @access Private/Admin
const getOrders = asyncHandler(async (req, res, next) => {
	const orders = await OrderModel.find({}).populate('user', 'id name');
	res.status(200).json(orders);
});

export {addOrderItems, getUserOrders, getOrderById, updateOrderToPaid, updateOrderToDelivered, getOrders};
