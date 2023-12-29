export interface ICartInitialState {
	cartItems: ICartItem[];
	itemsPrice: number;
	shippingPrice: number;
	taxPrice: number;
	totalPrice: number;
	shippingAddress: any;
	paymentMethod: 'PayPal' | any;
}

export interface ICartItem {
	_id: number;
	price: number;
	qty: number;
	name: string;
	image: string;
	countInStock: number;
	product: string;
}

export interface IProduct {
	_id: string;
	name: string;
	image: string;
	description: string;
	brand: string;
	category: string;
	price: number;
	countInStock: number;
	rating: number;
	numReviews: number;
}

export interface IOrder {
	_id: string;
	name: string;
	image: string;
	price: number;
	qty: number;
	product: string;
}
