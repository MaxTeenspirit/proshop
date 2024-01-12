import {useState, useEffect, FormEvent, ChangeEvent} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {LinkContainer} from 'react-router-bootstrap';
import {toast} from 'react-toastify';
import {Table, Form, Button, Row, Col} from 'react-bootstrap';
import {FaTimes, FaCheck} from 'react-icons/fa';

import {RootState} from '../redux/store';
import {useProfileMutation} from '../redux/slices/usersApiSlice';
import {useGetMyOrdersQuery} from '../redux/slices/orderApiSlice';
import {setCredentials} from '../redux/slices/authSlice';
import {Message, Loader, Meta} from '../components';

const ProfileScreen = () => {
	const dispatch = useDispatch();

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const {userInfo} = useSelector((state: RootState) => state.auth);

	const [updateProfile, {isLoading: isUpdateProfileLoading}] = useProfileMutation();

	const {data: orders, isLoading, error} = useGetMyOrdersQuery();

	useEffect(() => {
		if (userInfo) {
			setName(userInfo.name);
			setEmail(userInfo.email);
		}
	}, [userInfo]);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			toast.error('Passwords do not match');
		} else {
			try {
				const res = await updateProfile({
					_id: userInfo._id,
					name,
					email,
					password: password || userInfo.password,
				}).unwrap();

				dispatch(setCredentials(res));
				toast.success('Profile updated successfully');
			} catch (err) {
				//@ts-ignore
				toast.error(err?.data?.message || err?.message || err?.error);
			}
		}
	};

	const handleInputChange = (type: string) => (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;

		if (type === 'name') {
			setName(value);
		}
		if (type === 'email') {
			setEmail(value);
		}
		if (type === 'password') {
			setPassword(value);
		}
		if (type === 'confirmPassword') {
			setConfirmPassword(value);
		}
	};

	return (
		<Row>
			<Meta title="Your ProShop Profile" />
			<Col md={3}>
				<h2>User Profile</h2>

				<Form onSubmit={handleSubmit}>
					<Form.Group controlId="name" className="my-2">
						<Form.Label>Name</Form.Label>
						<Form.Control
							type="name"
							placeholder="Enter name"
							value={name}
							onChange={handleInputChange('name')}
						></Form.Control>
					</Form.Group>
					<Form.Group controlId="email" className="my-3">
						<Form.Label>Email Address</Form.Label>
						<Form.Control
							type="email"
							placeholder="Enter Email"
							value={email}
							onChange={handleInputChange('email')}
						/>
					</Form.Group>
					<Form.Group controlId="password" className="my-3">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Enter Password"
							value={password}
							onChange={handleInputChange('password')}
						/>
					</Form.Group>
					<Form.Group controlId="confirmPassword" className="my-3">
						<Form.Label>Password Confirmation</Form.Label>
						<Form.Control
							type="password"
							placeholder="Confirm Password"
							value={confirmPassword}
							onChange={handleInputChange('confirmPassword')}
						/>
					</Form.Group>
					{!!isUpdateProfileLoading && <Loader />}
					<Button disabled={isUpdateProfileLoading} type="submit" variant="primary" className="mt-2">
						Update
					</Button>
				</Form>
			</Col>
			<Col md={9}>
				<h2>Orders</h2>
				{!!isLoading ? (
					<Loader />
				) : !!error ? (
					<Message variant="danger">ERROR</Message>
				) : (
					<Table striped hover responsive className="table-sm">
						<thead>
							<tr>
								<th>ID</th>
								<th>DATE</th>
								<th>TOTAL</th>
								<th>PAID</th>
								<th>DELIVERED</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{orders?.map((order) => (
								<tr key={order._id}>
									<td>{order._id}</td>
									<td>{order.createdAt.substring(0, 10)}</td>
									<td>{order.totalPrice}</td>
									<td>
										{!!order.isPaid ? (
											<FaCheck style={{color: 'green'}} />
										) : (
											<FaTimes style={{color: 'red'}} />
										)}
									</td>
									<td>
										{!!order.isDelivered ? (
											<FaCheck style={{color: 'green'}} />
										) : (
											<FaTimes style={{color: 'red'}} />
										)}
									</td>
									<td>
										<LinkContainer to={`/order/${order._id}`}>
											<Button variant="light" className="btn-sm">
												Details
											</Button>
										</LinkContainer>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				)}
			</Col>
		</Row>
	);
};

export default ProfileScreen;
