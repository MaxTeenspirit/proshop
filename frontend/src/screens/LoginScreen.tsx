import {ChangeEvent, FormEvent, useState, useEffect} from 'react';
import {Link, redirect, useLocation, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Form, Button, Row, Col} from 'react-bootstrap';
import {toast} from 'react-toastify';

import {useLoginMutation} from '../redux/slices/usersApiSlice';
import {setCredentials} from '../redux/slices/authSlice';
import {FormContainer, Loader} from '../components';
import {RootState} from '../redux/store';

const LoginScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {search} = useLocation();
	const searchParams = new URLSearchParams(search);
	const redirectSlug = searchParams.get('redirect') || '/';

	const [login, {isLoading}] = useLoginMutation();
	const {userInfo} = useSelector((state: RootState) => state.auth);

	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	useEffect(() => {
		if (userInfo) {
			navigate(redirectSlug);
		}
	}, [userInfo, redirectSlug, navigate]);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const res = await login({email, password}).unwrap();

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

		if (type === 'email') {
			setEmail(value);
		}
		if (type === 'password') {
			setPassword(value);
		}
	};

	return (
		<FormContainer>
			<h1>Sign In</h1>
			<Form onSubmit={handleSubmit}>
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
				<Button disabled={isLoading} type="submit" variant="primary" className="mt-2">
					Sign In
				</Button>
				{!!isLoading && <Loader />}
			</Form>
			<Row className="py-3">
				<Col>
					New Costumer?{' '}
					<Link to={redirectSlug ? `/register?redirect=${redirectSlug}` : '/register'}>Register</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};

export default LoginScreen;
