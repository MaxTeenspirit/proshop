import asyncHandler from '../middleware/asyncHandler.js';
import {UserModel} from '../models/index.js';
import {generateToken} from '../utils/index.js';

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res, next) => {
	const {email, password} = req.body;

	const user = await UserModel.findOne({email});
	const isUser = user ? await user.matchPassword(password) : false;

	if (isUser) {
		generateToken(res, user._id);

		res.status(200).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(401);
		throw new Error('Invalid email or password');
	}
});

// @desc Register user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res, next) => {
	const {name, email, password} = req.body;

	const userExists = await UserModel.findOne({email});

	if (userExists) {
		res.status(400);
		throw new Error('User already exists');
	}

	const user = await UserModel.create({name, email, password});

	if (user) {
		generateToken(res, user._id);
		res.status(201).json({_id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});

// @desc Logout user & clear cookie
// @route POST /api/users/logout
// @access Private
const logoutUser = asyncHandler(async (req, res, next) => {
	res.cookie('jwt', '', {httpOnly: true, expiresIn: new Date(0)});
	res.status(200).json({message: 'Logged out successfully'});
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res, next) => {
	if (req.user) {
		const {name, email, isAdmin, _id} = req.user;

		res.status(200).json({_id, name, email, isAdmin});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res, next) => {
	const user = await UserModel.findById(req.user._id);

	if (user) {
		const {name, email, password} = req.body;
		user.name = name || user.name;
		user.email = email || user.email;

		if (password) {
			user.password = password;
		}

		const updatedUser = await user.save();

		res.status(200).json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

// @desc Get users
// @route GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res, next) => {
	res.send('Get users');
});

// @desc Get user by ID
// @route GET /api/users/:id
// @access Private/Admin
const getUserById = asyncHandler(async (req, res, next) => {
	res.send('Get user by ID');
});

// @desc Delete user
// @route DELETE /api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res, next) => {
	res.send('Delete users');
});

// @desc Update user
// @route PUT /api/users/:id
// @access Private/Admin
const updateUser = asyncHandler(async (req, res, next) => {
	res.send('Update user');
});

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
};
