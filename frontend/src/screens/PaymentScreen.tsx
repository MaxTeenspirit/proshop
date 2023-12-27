import {useState, useEffect, ChangeEvent, FormEvent} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {Form, Button, Col} from 'react-bootstrap';

import {savePaymentMethod} from '../redux/slices/cartSlice';
import {RootState} from '../redux/store';
import {CheckoutSteps, FormContainer} from '../components';

const PaymentScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {shippingAddress} = useSelector((state: RootState) => state.cart);

	const [paymentMethod, setPaymentMethod] = useState('PayPal');

	useEffect(() => {
		if (!shippingAddress) {
			navigate('/shipping');
		}
	}, [navigate, shippingAddress]);

	const handlePaymentMethod = (e: ChangeEvent<HTMLInputElement>) => {
		setPaymentMethod(e.target.value);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		navigate('/placeorder');
	};

	return (
		<FormContainer>
			<CheckoutSteps signIn shipping payment />
			<h1>Payment Method</h1>
			<Form onSubmit={handleSubmit}>
				<Form.Group>
					<Form.Label as="legend">Select Method</Form.Label>
					<Col>
						<Form.Check
							type="radio"
							className="my-2"
							id="paypal"
							label="Paypal or Credit Card"
							name="paypalMethod"
							value="PayPal"
							checked
							onChange={handlePaymentMethod}
						></Form.Check>
					</Col>
				</Form.Group>
				<Button type="submit" variant="primary">
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default PaymentScreen;
