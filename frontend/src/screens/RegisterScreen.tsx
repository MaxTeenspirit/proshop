import {ChangeEvent, FormEvent, useState, useEffect} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Form, Button, Row, Col} from 'react-bootstrap';
import {toast} from 'react-toastify';

import {useRegisterMutation} from '../redux/slices/usersApiSlice';
import {setCredentials} from '../redux/slices/authSlice';
import {FormContainer, Loader} from '../components';
import {RootState} from '../redux/store';

const RegisterScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {search} = useLocation();
	const searchParams = new URLSearchParams(search);
	const redirectSlug = searchParams.get('redirect') || '/';

	const [register, {isLoading}] = useRegisterMutation();
	const {userInfo} = useSelector((state: RootState) => state.auth);

	const [name, setName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState<string>('');

	useEffect(() => {
		if (userInfo) {
			navigate(redirectSlug);
		}
	}, [userInfo, redirectSlug, navigate]);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			toast.error('Passwords do not match');
			return;
		}

		try {
			const res = await register({name, email, password}).unwrap();

			dispatch(setCredentials({...res}));
			navigate(redirectSlug);
		} catch (err: unknown) {
			if (err instanceof Error) {
				toast.error(err.message);
			} else {
				const error = err as {data: {message: string}};
				toast.error(error?.data?.message);
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
		<FormContainer>
			<h1>Sign Up</h1>
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId="name" className="my-3">
					<Form.Label>Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter Name"
						value={name}
						onChange={handleInputChange('name')}
					/>
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
				<Button disabled={isLoading} type="submit" variant="primary" className="mt-2">
					Register
				</Button>
				{!!isLoading && <Loader />}
			</Form>
			<Row className="py-3">
				<Col>
					Already have an account?{' '}
					<Link to={redirectSlug ? `/login?redirect=${redirectSlug}` : '/login'}>Login</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};

export default RegisterScreen;
