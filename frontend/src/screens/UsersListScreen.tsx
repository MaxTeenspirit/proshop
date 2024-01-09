import {toast} from 'react-toastify';
import {LinkContainer} from 'react-router-bootstrap';
import {Table, Button} from 'react-bootstrap';
import {FaCheck, FaTimes, FaEdit, FaTrash} from 'react-icons/fa';

import {useGetUsersQuery, useDeleteUserMutation} from '../redux/slices/usersApiSlice';
import {Loader, Message} from '../components';

const UsersListScreen = () => {
	const {data: users, isLoading, error, refetch} = useGetUsersQuery();
	const [deleteUser, {isLoading: loadingDelete}] = useDeleteUserMutation();

	const handleDelete = (id: string) => async () => {
		if (window.confirm('Are you sure you want to DELETE this user?')) {
			try {
				await deleteUser(id);
				toast.success('User deleted!');
				refetch();
			} catch (err) {
				toast.error('Error on deleting user');
			}
		}
	};

	return (
		<>
			<h1>Users</h1>
			{isLoading || loadingDelete ? (
				<Loader />
			) : error ? (
				<>
					{/* @ts-ignore */}
					<Message variant="danger">{error?.data?.message}</Message>
				</>
			) : (
				<Table striped hover responsive className="table-sm">
					<thead>
						<tr>
							<th>ID</th>
							<th>NAME</th>
							<th>EMAIL</th>
							<th>ADMIN</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{users?.map((user) => (
							<tr key={user._id}>
								<td>{user._id}</td>
								<td>{user.name}</td>
								<td>{user.email}</td>
								<td>{user.isAdmin ? <FaCheck /> : <FaTimes />}</td>
								<td>
									<LinkContainer to={`/admin/user/${user._id}/edit`}>
										<Button variant="light" className="btn-sm">
											<FaEdit />
										</Button>
									</LinkContainer>
									<Button
										disabled={user.isAdmin}
										variant={user.isAdmin ? 'secondary' : 'danger'}
										className="btn-sm mx-3"
										onClick={handleDelete(user._id)}
									>
										<FaTrash style={{color: 'white'}} />
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	);
};

export default UsersListScreen;
