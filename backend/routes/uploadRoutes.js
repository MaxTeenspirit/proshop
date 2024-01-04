import express from 'express';
import path from 'path';
import multer from 'multer';

import {checkFileType} from '../utils/index.js';

const router = express.Router();
const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, 'uploads/');
	},
	filename(req, file, cb) {
		cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
	},
});

const upload = multer({storage, checkFileType});

router.post('/', upload.single('image'), (req, res, next) => {
	res.status(200).send({
		message: 'Image uploaded!',
		image: `/${req.file.path}`,
	});
});

export default router;
