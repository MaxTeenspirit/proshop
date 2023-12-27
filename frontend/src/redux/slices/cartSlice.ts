import {createSlice} from '@reduxjs/toolkit';

import {updateCart} from '../helpers';
import {ICartInitialState} from '../types';

const localCart = localStorage.getItem('cart');
const initialState: ICartInitialState = !!localCart
	? JSON.parse(localCart)
	: {cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal'};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action) => {
			const item = action.payload;

			const existItem = state.cartItems.find((cartItem) => cartItem._id === item?._id);

			if (existItem) {
				state.cartItems = state.cartItems.map((cartItem) => (cartItem._id === existItem._id ? item : cartItem));
			} else {
				state.cartItems = [...state.cartItems, item];
			}

			return updateCart(state);
		},
		removeFromCart: (state, action) => {
			const id = action.payload;

			state.cartItems = state.cartItems.filter((item) => item._id !== id);

			return updateCart(state);
		},
		saveShippingAddress: (state, action) => {
			state.shippingAddress = action.payload;

			return updateCart(state);
		},
		savePaymentMethod: (state, action) => {
			state.paymentMethod = action.payload;

			return updateCart(state);
		},
	},
});

export const {addToCart, removeFromCart, saveShippingAddress, savePaymentMethod} = cartSlice.actions;

export default cartSlice.reducer;
