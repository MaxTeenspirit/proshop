import {PRODUCTS_URL} from '../../constants';
import {apiSlice} from './apiSlice';
import {IProduct} from '../types';

export const productsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProducts: builder.query<IProduct[], void>({
			query: () => ({
				url: PRODUCTS_URL,
			}),
			keepUnusedDataFor: 15,
		}),
		getProductDetail: builder.query<IProduct, string>({
			query: (id) => ({
				url: `${PRODUCTS_URL}/${id}`,
			}),
			keepUnusedDataFor: 15,
		}),
	}),
});

export const {useGetProductsQuery, useGetProductDetailQuery} = productsApiSlice;
