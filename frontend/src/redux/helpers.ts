import {ICartInitialState} from './types';

const addDecimals = (num: number) => +(Math.round(num * 100) / 100).toFixed(2);

const getCartItemsPrice = (state: ICartInitialState) =>
	addDecimals(state.cartItems.reduce((acc, curr) => acc + curr.price * curr.qty, 0));

const getCartShippingPrice = (state: ICartInitialState) => addDecimals(state.itemsPrice > 100 ? 0 : 10);

const getCartTaxPrice = (state: ICartInitialState) => addDecimals(state.itemsPrice * 0.15);

const getCartTotalPrice = (state: ICartInitialState) =>
	addDecimals(state.itemsPrice + state.shippingPrice + state.taxPrice);

const setToLocalStorage = (name: string, state: any) => localStorage.setItem(name, JSON.stringify(state));

export {addDecimals, getCartTotalPrice, getCartItemsPrice, getCartShippingPrice, getCartTaxPrice, setToLocalStorage};
