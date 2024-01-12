import express from 'express';

import {protect, admin} from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';
import {
	authUser,
	registerUser,
	logoutUser,
	updateUser,
	updateUserProfile,
	getUserById,
	getUserProfile,
	getUsers,
	deleteUser,
} from '../controllers/index.js';

const router = express.Router();

router.route('/auth').post(authUser);
router.route('/').post(registerUser);
router.route('/logout').post(logoutUser);
router.route('/profile').get(protect, getUserProfile);
router.route('/profile').put(protect, updateUserProfile);
router.route('/').get(protect, admin, getUsers);
router.route('/:id').get(checkObjectId, protect, admin, getUserById);
router.route('/:id').delete(checkObjectId, protect, admin, deleteUser);
router.route('/:id').put(checkObjectId, protect, admin, updateUser);

export default router;
