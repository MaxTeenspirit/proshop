import mongoose from 'mongoose';

const connectDB = async () => {
	try {
		const connect = await mongoose.connect(process.env.MONGO_URI);
		console.log(`Mongo DB connected: ${connect.connection.host}`);
	} catch (err) {
		console.log(`Mongo DB error: ${err.message}`);
		process.exit(1);
	}
};

export default connectDB;
