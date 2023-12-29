import {ORDERS_URL} from '../../constants';
import {apiSlice} from './apiSlice';
import {IOrder} from '../types';

const orderApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createOrder: builder.mutation({
			query: (order) => ({
				url: `${ORDERS_URL}`,
				method: 'POST',
				body: {...order},
			}),
		}),
		getOrderDetails: builder.query({
			query: (orderId) => ({
				url: `${ORDERS_URL}/${orderId}`,
			}),
			keepUnusedDataFor: 30,
		}),
	}),
});

export const {useCreateOrderMutation, useGetOrderDetailsQuery} = orderApiSlice;
