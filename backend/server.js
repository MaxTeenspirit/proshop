import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

import connectDB from './config/db.js';

import {productRoutes, userRoutes, orderRoutes} from './routes/index.js';
import {notFound, errorHandler} from './middleware/errorMiddleware.js';

connectDB();

const port = process.env.PORT || '8000';

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Body parser middleware
app.use(cookieParser());

app.get('/', (req, res) => {
	res.send('API is running');
});

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

// Configs
app.get('/api/config/paypal', (req, res) => {
	res.send({clientId: process.env.PAYPAL_CLIENT_ID});
});

// Error middlewares
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
	console.log(`Server is running on ${port}`);
});
