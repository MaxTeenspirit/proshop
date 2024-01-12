import asyncHandler from '../middleware/asyncHandler.js';
import {ProductModel} from '../models/index.js';

// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res, next) => {
	const pageSize = 8;
	const pageNumber = Number(req.query.pageNumber) || 1;

	const keyword = req.query.keyword;
	const search = keyword ? {name: {$regex: keyword, $options: 'i'}} : {};

	const count = await ProductModel.countDocuments({...search});

	const products = await ProductModel.find({...search})
		.limit(pageSize)
		.skip(pageSize * (pageNumber - 1));
	res.json({products, pageNumber, pages: Math.ceil(count / pageSize)});
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

// @desc Create a review
// @route POST /api/products/:id/reviews
// @access Private
const createProductReview = asyncHandler(async (req, res, next) => {
	const {id} = req.params;
	const {rating, comment} = req.body;

	const product = await ProductModel.findById(id);

	if (product) {
		const alreadyReviewed = product.reviews.find((rev) => rev.user.toString() === req.user._id.toString());

		if (alreadyReviewed) {
			res.status(400);
			throw new Error('Product is already reviewed');
		}

		const review = {
			name: req.user.name,
			rating: Number(rating),
			comment,
			user: req.user._id,
		};

		product.reviews.push(review);

		product.numReviews = product.reviews.length;

		product.rating = product.reviews.reduce((acc, cur) => acc + cur.rating, 0) / product.reviews.length;

		await product.save();

		res.status(200).json({message: 'Review added!'});
	} else {
		res.status(404);
		throw new Error('Review not added');
	}
});

// @desc Get top rated products
// @route GET /api/products/top
// @access Public
const getTopProducts = asyncHandler(async (req, res, next) => {
	const products = await ProductModel.find({}).sort({rating: -1}).limit(3);

	res.status(200).json(products);
});

export {getProducts, getProductById, createProduct, editProduct, deleteProduct, createProductReview, getTopProducts};
