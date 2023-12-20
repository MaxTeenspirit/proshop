import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useParams, Link, useNavigate} from 'react-router-dom';
import {Row, Col, Image, ListGroup, Card, Button, Form} from 'react-bootstrap';

import {useGetProductDetailQuery} from '../redux/slices/productsApiSlice';
import {addToCart} from '../redux/slices/cartSlice';
import {Rating, Loader, Message} from '../components';

const ProductScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {id: productId} = useParams();
	const {data: product, isLoading, error} = useGetProductDetailQuery(productId || '');

	const [qty, setQty] = useState(1);

	if (isLoading) {
		return <Loader />;
	}

	if (!!error && 'data' in error) {
		// @ts-ignore
		return <Message variant="danger">{error?.data?.message}</Message>;
	}

	if (!!error && 'error' in error) {
		return <Message variant="danger">{error.error}</Message>;
	}

	const options = Array.from({length: product?.countInStock || 1}, (_, index) => index + 1);

	const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => setQty(+event.target.value);

	const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
		dispatch(addToCart({...product, qty}));
		navigate('/cart');
	};

	return (
		<>
			<Link to="/" className="btn btn-light my-3">
				Go Back
			</Link>
			{!!product && (
				<Row>
					<Col md={5}>
						<Image src={product.image} alt={product.name} fluid />
					</Col>
					<Col md={4}>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<h3>{product.name}</h3>
							</ListGroup.Item>
							<ListGroup.Item>
								<Rating value={product.rating} text={`${product.numReviews} reviews`} />
							</ListGroup.Item>
							<ListGroup.Item>Price: {product.price}</ListGroup.Item>
							<ListGroup.Item>Description: {product.description}</ListGroup.Item>
						</ListGroup>
					</Col>
					<Col md={3}>
						<Card>
							<ListGroup variant="flush">
								<ListGroup.Item>
									<Row>
										<Col>Price:</Col>
										<Col>
											<strong>{product.price}</strong>
										</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Status:</Col>
										<Col>
											<strong>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</strong>
										</Col>
									</Row>
								</ListGroup.Item>

								{!!product.countInStock && (
									<ListGroup.Item>
										<Row>
											<Col>Quantity:</Col>
											<Col>
												<Form.Control as="select" value={qty} onChange={handleQuantityChange}>
													{options.map((el) => (
														<option key={el} value={el}>
															{el}
														</option>
													))}
												</Form.Control>
											</Col>
										</Row>
									</ListGroup.Item>
								)}

								<ListGroup.Item>
									<Button
										onClick={handleAddToCart}
										className="btn-block"
										type="button"
										disabled={!product.countInStock}
									>
										Add To Cart
									</Button>
								</ListGroup.Item>
							</ListGroup>
						</Card>
					</Col>
				</Row>
			)}
		</>
	);
};

export default ProductScreen;
