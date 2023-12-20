import {createSlice} from '@reduxjs/toolkit';

import {
	getCartItemsPrice,
	getCartShippingPrice,
	getCartTaxPrice,
	getCartTotalPrice,
	setToLocalStorage,
} from '../helpers';
import {ICartInitialState} from '../types';

const localCart = localStorage.getItem('cart');
const initialState: ICartInitialState = !!localCart ? JSON.parse(localCart) : {cartItems: []};

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

			state.itemsPrice = getCartItemsPrice(state);

			state.shippingPrice = getCartShippingPrice(state);

			state.taxPrice = getCartTaxPrice(state);

			state.totalPrice = getCartTotalPrice(state);

			setToLocalStorage('cart', state);
		},
	},
});

export const {addToCart} = cartSlice.actions;

export default cartSlice.reducer;
