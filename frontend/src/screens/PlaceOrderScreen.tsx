import {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {toast, ToastContent} from 'react-toastify';
import {Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap';

import {RootState} from '../redux/store';
import {useCreateOrderMutation} from '../redux/slices/orderApiSlice';
import {clearCartItems} from '../redux/slices/cartSlice';
import {CheckoutSteps, Message, Loader} from '../components';

const PlaceOrderScreen = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [createOrder, {isLoading, error}] = useCreateOrderMutation();

	const {shippingAddress, paymentMethod, cartItems, itemsPrice, shippingPrice, taxPrice, totalPrice} = useSelector(
		(state: RootState) => state.cart,
	);

	useEffect(() => {
		if (!shippingAddress?.address) {
			navigate('/shipping');
		} else if (!paymentMethod) {
			navigate('/payment');
		}
	}, [navigate, shippingAddress?.address, paymentMethod]);

	const handlePlaceOrder = async () => {
		try {
			const res = await createOrder({
				orderItems: cartItems,
				shippingAddress,
				paymentMethod,
				itemsPrice,
				shippingPrice,
				taxPrice,
				totalPrice,
			}).unwrap();

			dispatch(clearCartItems());
			navigate(`/order/${res._id}`);
		} catch (err) {
			toast.error(err as ToastContent<unknown>);
		}
	};

	return (
		<>
			<CheckoutSteps signIn shipping payment placeOrder />
			<Row>
				<Col md={8}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<strong>Address:</strong>
								{shippingAddress.address}, {shippingAddress.city} {shippingAddress.postalCode},{' '}
								{shippingAddress.country}
							</p>
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Payment method</h2>
							<p>
								<strong>Method: </strong>
								{paymentMethod}
							</p>
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Order items</h2>
							{!!cartItems?.length ? (
								<ListGroup variant="flush">
									{cartItems.map((item, index) => (
										<ListGroup.Item key={index}>
											<Row>
												<Col md={1}>
													<Image src={item.image} alt={item.name} fluid rounded />
												</Col>
												<Col>
													<Link to={`/product/${item._id}`}>{item.name}</Link>
												</Col>
												<Col md={4}>
													{item.qty} * {item.price} = {item.qty * item.price};
												</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							) : (
								<Message>Your cart is empty</Message>
							)}
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={4}>
					<Card>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<h2>Order Summary</h2>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Items: </Col>
									<Col>{itemsPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Shipping: </Col>
									<Col>{shippingPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Tax: </Col>
									<Col>{taxPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Total: </Col>
									<Col>{totalPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								{!!error && (
									// @ts-ignore
									<Message variant="danger">{error?.data?.message || error?.message}</Message>
								)}
							</ListGroup.Item>
							<ListGroup.Item>
								<Button
									type="button"
									className="btn-block"
									disabled={cartItems?.length === 0 || isLoading}
									onClick={handlePlaceOrder}
								>
									Place Order
								</Button>
								{!!isLoading && <Loader />}
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default PlaceOrderScreen;
