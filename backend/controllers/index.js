export {
	getProducts,
	getProductById,
	createProduct,
	editProduct,
	deleteProduct,
	createProductReview,
} from './productController.js';

export {
	authUser,
	registerUser,
	logoutUser,
	updateUser,
	updateUserProfile,
	getUserById,
	getUserProfile,
	getUsers,
	deleteUser,
} from './userController.js';

export {
	addOrderItems,
	getUserOrders,
	getOrderById,
	updateOrderToPaid,
	updateOrderToDelivered,
	getOrders,
} from './orderController.js';
