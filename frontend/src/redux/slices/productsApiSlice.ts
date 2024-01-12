import {PRODUCTS_URL, UPLOAD_URL} from '../../constants';
import {apiSlice} from './apiSlice';
import {IProduct, IProductData} from '../types';

export const productsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProducts: builder.query<IProductData, {pageNumber?: string | number; keyword: string | null}>({
			query: ({pageNumber, keyword}) => ({
				url: PRODUCTS_URL,
				params: {pageNumber, keyword},
			}),
			providesTags: ['Products'],
			keepUnusedDataFor: 30,
		}),
		getTopProducts: builder.query<IProduct[], void>({
			query: () => ({
				url: `${PRODUCTS_URL}/top`,
			}),
			providesTags: ['Products'],
			keepUnusedDataFor: 30,
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
		deleteProduct: builder.mutation({
			query: (id) => ({
				url: `${PRODUCTS_URL}/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Products'],
		}),
		createReview: builder.mutation({
			query: (data) => ({
				url: `${PRODUCTS_URL}/${data.productId}/reviews`,
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Product'],
		}),
	}),
});

export const {
	useGetProductsQuery,
	useGetTopProductsQuery,
	useGetProductDetailQuery,
	useCreateProductMutation,
	useUpdateProductMutation,
	useUploadProductImageMutation,
	useDeleteProductMutation,
	useCreateReviewMutation,
} = productsApiSlice;
