export interface ICartInitialState {
	cartItems: ICartItem[];
	itemsPrice: number;
	shippingPrice: number;
	taxPrice: number;
	totalPrice: number;
}

export interface ICartItem {
	_id: number;
	price: number;
	qty: number;
	name: string;
	image: string;
	countInStock: number;
}
