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
	rating?: number;
	numReviews?: number;
	reviews?: IReview[];
}

export interface IProductData {
	pageNumber: number;
	pages: number;
	products: IProduct[];
}

export interface IOrder {
	_id: string;
	name: string;
	image: string;
	price: number;
	qty: number;
	product: string;
	createdAt: string;
	paidAt?: string;
	deliveredAt?: string;
	totalPrice: string;
	isPaid: boolean;
	isDelivered: boolean;
}

export interface IOrdersAdmin extends IOrder {
	user: {_id: string; name: string};
}

export interface IUser {
	_id: string;
	name: string;
	email: string;
	isAdmin: boolean;
}

export interface IReview {
	_id: string;
	user: string;
	name: string;
	rating: number;
	comment: string;
	createdAt: string;
}
