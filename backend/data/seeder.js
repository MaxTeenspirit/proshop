import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

import users from './users.js';
import products from './products.js';

import connectDB from '../config/db.js';
import {UserModel, ProductModel, OrderModel} from '../models/index.js';

dotenv.config();

connectDB();

const importData = async () => {
	try {
		await OrderModel.deleteMany();
		await ProductModel.deleteMany();
		await UserModel.deleteMany();

		const createdUsers = await User.insertMany(users);

		const adminUserId = createdUsers[0]._id;

		const sampleProducts = products.map((product) => {
			return {...product, user: adminUserId};
		});

		await ProductModel.insertMany(sampleProducts);

		console.log('Data Imported!'.green.inverse);
		process.exit();
	} catch (err) {
		console.log(`Import data error: ${err}`.red.inverse);
		process.exit(1);
	}
};

const destroyData = async () => {
	try {
		await OrderModel.deleteMany();
		await ProductModel.deleteMany();
		await UserModel.deleteMany();

		console.log('Data Destroyed!'.green.inverse);
		process.exit();
	} catch (err) {
		console.log(`Destroy data error: ${err}`.red.inverse);
		process.exit(1);
	}
};

if (process.argv[2] === '-d') {
	destroyData();
} else if (process.argv[2] === '-i') {
	importData();
}
