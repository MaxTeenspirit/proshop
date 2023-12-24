import {FormEvent, ChangeEvent, useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {FormContainer, CheckoutSteps} from '../components';
import {RootState} from '../redux/store';
import {saveShippingAddress} from '../redux/slices/cartSlice';

const ShippingScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {shippingAddress} = useSelector((state: RootState) => state.cart);

	const [address, setAddress] = useState<string>(shippingAddress?.address || '');
	const [postalCode, setPostalCode] = useState<string>(shippingAddress?.postalCode || '');
	const [city, setCity] = useState<string>(shippingAddress?.city || '');
	const [country, setCountry] = useState<string>(shippingAddress?.country || '');

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(saveShippingAddress({address, postalCode, country, city}));
		navigate('/payment');
	};

	const handleInputChange = (type: string) => (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;

		switch (type) {
			case 'address':
				setAddress(value);
				break;
			case 'postalCode':
				setPostalCode(value);
				break;
			case 'city':
				setCity(value);
				break;
			case 'country':
				setCountry(value);
				break;
		}
	};

	return (
		<FormContainer>
			<CheckoutSteps signIn shipping />
			<h1>Shipping</h1>
			<Form onSubmit={handleSubmit}>
				<Form.Group className="my-2" controlId="address">
					<Form.Label>Address</Form.Label>
					<Form.Control
						type="text"
						onChange={handleInputChange('address')}
						placeholder="Enter Address"
						value={address}
					></Form.Control>
				</Form.Group>
				<Form.Group className="my-2" controlId="postalCode">
					<Form.Label>Postal Code</Form.Label>
					<Form.Control
						type="text"
						onChange={handleInputChange('postalCode')}
						placeholder="Enter Postal Code"
						value={postalCode}
					></Form.Control>
				</Form.Group>
				<Form.Group className="my-2" controlId="city">
					<Form.Label>City</Form.Label>
					<Form.Control
						type="text"
						onChange={handleInputChange('city')}
						placeholder="Enter City"
						value={city}
					></Form.Control>
				</Form.Group>
				<Form.Group className="my-2" controlId="country">
					<Form.Label>Country</Form.Label>
					<Form.Control
						type="text"
						onChange={handleInputChange('country')}
						placeholder="Enter Country"
						value={country}
					></Form.Control>
				</Form.Group>
				<Button type="submit" variant="primary" className="my-2">
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default ShippingScreen;
