export interface ICartInitialState {
	cartItems: {_id: number; price: number; qty: number}[];
	itemsPrice: number;
	shippingPrice: number;
	taxPrice: number;
	totalPrice: number;
}
