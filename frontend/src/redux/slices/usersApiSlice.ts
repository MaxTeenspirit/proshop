import {USERS_URL} from '../../constants';
import {apiSlice} from './apiSlice';
import {IUser} from '../types';

const usersApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/auth`,
				method: 'POST',
				body: data,
			}),
		}),
		register: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}`,
				method: 'POST',
				body: data,
			}),
		}),
		logout: builder.mutation({
			query: () => ({
				url: `${USERS_URL}/logout`,
				method: 'POST',
			}),
		}),
		profile: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/profile`,
				method: 'PUT',
				body: data,
			}),
		}),
		getUsers: builder.query<IUser[], void>({
			query: () => ({
				url: USERS_URL,
			}),
			keepUnusedDataFor: 5,
			providesTags: ['Users'],
		}),
		getUserById: builder.query<IUser, string>({
			query: (id) => ({
				url: `${USERS_URL}/${id}`,
			}),
			keepUnusedDataFor: 5,
			providesTags: ['User'],
		}),
		deleteUser: builder.mutation<void, string>({
			query: (id) => ({
				url: `${USERS_URL}/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Users', 'User'],
		}),
		updateUser: builder.mutation<void, IUser>({
			query: (data) => ({
				url: `${USERS_URL}/${data._id}`,
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: ['Users', 'User'],
		}),
	}),
});

export const {
	useLoginMutation,
	useLogoutMutation,
	useRegisterMutation,
	useProfileMutation,
	useGetUsersQuery,
	useGetUserByIdQuery,
	useDeleteUserMutation,
	useUpdateUserMutation,
} = usersApiSlice;
