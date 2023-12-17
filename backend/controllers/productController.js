import asyncHandler from '../middleware/asyncHandler.js';
import {ProductModel} from '../models/index.js';

// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res, next) => {
	const products = await ProductModel.find({});
	res.json(products);
});

// @desc Fetch one product by ID
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res, next) => {
	const product = await ProductModel.findById(req.params.id);

	if (product) {
		return res.json(product);
	} else {
		res.status(404);
		throw new Error('Product Not Found');
	}
});

export {getProducts, getProductById};
