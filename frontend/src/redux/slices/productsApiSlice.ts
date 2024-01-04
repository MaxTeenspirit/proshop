import {PRODUCTS_URL, UPLOAD_URL} from '../../constants';
import {apiSlice} from './apiSlice';
import {IProduct} from '../types';

export const productsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProducts: builder.query<IProduct[], void>({
			query: () => ({
				url: PRODUCTS_URL,
			}),
			providesTags: ['Products'],
			keepUnusedDataFor: 5,
		}),
		getProductDetail: builder.query<IProduct, string>({
			query: (id) => ({
				url: `${PRODUCTS_URL}/${id}`,
			}),
			providesTags: ['Product'],
			keepUnusedDataFor: 5,
		}),
		createProduct: builder.mutation<void, void>({
			query: () => ({
				url: PRODUCTS_URL,
				method: 'POST',
			}),
			invalidatesTags: ['Product'],
		}),
		updateProduct: builder.mutation<IProduct, IProduct>({
			query: (data) => ({
				url: `${PRODUCTS_URL}/${data._id}`,
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: ['Product', 'Products'],
		}),
		uploadProductImage: builder.mutation({
			query: (data) => ({
				url: UPLOAD_URL,
				method: 'POST',
				body: data,
			}),
		}),
	}),
});

export const {
	useGetProductsQuery,
	useGetProductDetailQuery,
	useCreateProductMutation,
	useUpdateProductMutation,
	useUploadProductImageMutation,
} = productsApiSlice;
