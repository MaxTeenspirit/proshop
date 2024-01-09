import {useState, useEffect, FormEvent, ChangeEvent} from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {Form, Button} from 'react-bootstrap';

import {useGetUserByIdQuery, useUpdateUserMutation} from '../redux/slices/usersApiSlice';
import {Loader, Message, FormContainer} from '../components';

const UserEditScreen = () => {
	const navigate = useNavigate();
	const {id} = useParams();
	const {data: user, isLoading, error} = useGetUserByIdQuery(id || '');
	const [updateUser, {isLoading: loadingUpdate}] = useUpdateUserMutation();

	const [name, setName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [isAdmin, setIsAdmin] = useState<boolean>(false);

	useEffect(() => {
		if (user) {
			setName(user.name);
			setEmail(user.email);
			setIsAdmin(user.isAdmin);
		}
	}, [user]);

	const handleInputChange = (type: string) => (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;

		switch (type) {
			case 'name':
				setName(value);
				break;
			case 'email':
				setEmail(value);
				break;
			case 'isAdmin':
				setIsAdmin(e.target.checked);
				break;
		}
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const updatedUser = {
			_id: user?._id,
			name,
			email,
			isAdmin,
		};

		//@ts-ignore
		const result = await updateUser(updatedUser);

		//@ts-ignore
		if (result.error) {
			toast.error('Not updated');
		} else {
			toast.success('User updated');
			navigate('/admin/userlist');
		}
	};

	return (
		<>
			<Link to="/admin/userlist" className="btn btn-light my-3">
				Go Back
			</Link>

			{isLoading || loadingUpdate ? (
				<Loader />
			) : error ? (
				<Message variant="danger">User not found</Message>
			) : (
				<FormContainer>
					<h1>Edit User</h1>
					<Form onSubmit={handleSubmit}>
						<Form.Group controlId="name" className="my-3">
							<Form.Label>Name</Form.Label>
							<Form.Control
								onChange={handleInputChange('name')}
								type="text"
								placeholder="Enter name"
								value={name}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId="email" className="my-3">
							<Form.Label>Email</Form.Label>
							<Form.Control
								onChange={handleInputChange('email')}
								type="text"
								placeholder="Enter email"
								value={email}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId="isAdmin" className="my-3">
							<Form.Label>Admin</Form.Label>
							<Form.Check
								onChange={handleInputChange('isAdmin')}
								type="switch"
								checked={isAdmin}
								id="isAdmin"
								label="Is Admin user"
							/>
						</Form.Group>
						<Button type="submit" variant="primary" className="my-2 px-4">
							Update
						</Button>
					</Form>
				</FormContainer>
			)}
		</>
	);
};

export default UserEditScreen;
