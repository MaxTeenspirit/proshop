import jwt from 'jsonwebtoken';

import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

// Protected routes
const protect = asyncHandler(async (req, res, next) => {
	let token;

	// Read the JWT from cookie
	token = req.cookies.jwt;

	if (token) {
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			req.user = await User.findById(decoded.userId).select('-password');
			next();
		} catch (err) {
			res.status(401);
			console.log(err);
			throw new Error('Token failed, not authorized');
		}
	} else {
		res.status(401);
		throw new Error('No token, not authorized');
	}
});

// Admin middleware
const admin = (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		next();
	} else {
		res.status(401);
		throw new Error('Not authorized as Admin');
	}
};

export {protect, admin};
