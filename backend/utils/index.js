import jwt from 'jsonwebtoken';
import path from 'path';

const generateToken = (res, userId) => {
	const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '3d'});

	// Set JWT as HTTP-Only cookie
	res.cookie('jwt', token, {
		httpOnly: true,
		secure: process.env.NODE_ENV !== 'development',
		sameSite: 'strict',
		maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
	});
};

const checkFileType = (file, cb) => {
	const fileTypes = /jpg|jpeg|png/;
	const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
	const mimetype = fileTypes.test(file.mimetype);

	if (extname && mimetype) {
		return cb(null, true);
	} else {
		cb('Images only!');
	}
};

export {generateToken, checkFileType};
