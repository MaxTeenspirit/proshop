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

// @desc Create new product
// @route POST /api/products
// @access Private/Admin
const createProduct = asyncHandler(async (req, res, next) => {
	const product = new ProductModel({
		name: 'New product',
		price: 0,
		user: req.user._id,
		image: '/images/sample.jpg',
		brand: 'Sample brand',
		category: 'Sample category',
		countInStock: 0,
		numReviews: 0,
		description: 'Sample description',
	});

	const newProduct = await product.save();
	res.status(201).json(newProduct);
});

// @desc Edit product
// @route PUT /api/products/:id
// @access Private/Admin
const editProduct = asyncHandler(async (req, res, next) => {
	const {id} = req.params;
	const {name, price, image, brand, category, countInStock, description} = req.body;
	const product = await ProductModel.findById(id);

	if (product) {
		product.name = name;
		product.price = price;
		product.image = image;
		product.brand = brand;
		product.category = category;
		product.countInStock = countInStock;
		product.description = description;

		const updatedProduct = await product.save();
		res.status(200).json(updatedProduct);
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

// @desc Delete product
// @route DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res, next) => {
	const {id} = req.params;
	const product = await ProductModel.findById(id);

	if (product) {
		await ProductModel.deleteOne({_id: product._id});
		res.status(200).json({message: 'Product deleted!'});
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

export {getProducts, getProductById, createProduct, editProduct, deleteProduct};
