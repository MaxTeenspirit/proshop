import React, {useState, FormEvent} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams, useNavigate, useLocation} from 'react-router-dom';
import {Row, Col, Image, ListGroup, Card, Button, Form} from 'react-bootstrap';
import {toast} from 'react-toastify';

import {useGetProductDetailQuery, useCreateReviewMutation} from '../redux/slices/productsApiSlice';
import {addToCart} from '../redux/slices/cartSlice';
import {Rating, Loader, Message, Meta} from '../components';
import {RootState} from '../redux/store';

const ProductScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const {id: productId} = useParams();
	const {userInfo} = useSelector((state: RootState) => state.auth);

	const {data: product, isLoading, refetch, error} = useGetProductDetailQuery(productId || '');
	const [createReview, {isLoading: loadingCreateReview}] = useCreateReviewMutation();

	const [qty, setQty] = useState(1);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState('');

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

	const handleSubmitReview = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			await createReview({productId, rating, comment}).unwrap();
			refetch();
			toast.success('Added review');
			setRating(0);
			setComment('');
		} catch (err) {
			//@ts-ignore
			toast.error(err?.data?.message || "Can't submit review");
		}
	};

	const goBack = () => {
		if (location.key !== 'default') {
			navigate(-1);
		} else {
			navigate('/');
		}
	};

	return (
		<>
			<Button onClick={goBack} className="btn btn-light my-3">
				Go Back
			</Button>
			{!!product && (
				<>
					<Meta title={product.name} />
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
												<strong>
													{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
												</strong>
											</Col>
										</Row>
									</ListGroup.Item>

									{!!product.countInStock && (
										<ListGroup.Item>
											<Row>
												<Col>Quantity:</Col>
												<Col>
													<Form.Control
														as="select"
														value={qty}
														onChange={handleQuantityChange}
													>
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
					<Row className="review">
						<Col className="md-6">
							<h2>Reviews</h2>
							{(!product?.reviews || !product?.reviews.length) && <Message>No reviews</Message>}
							<ListGroup variant="flush">
								{!!product.reviews &&
									product.reviews.map((rev) => (
										<ListGroup.Item key={rev._id}>
											<strong>{rev.name}</strong>
											<Rating value={rev.rating} />
											<p>{rev.createdAt.substring(0, 10)}</p>
											<p>{rev.comment}</p>
										</ListGroup.Item>
									))}
								<ListGroup.Item>
									<h3>Write a review</h3>
									{!!loadingCreateReview && <Loader />}
									{userInfo ? (
										<Form onSubmit={handleSubmitReview}>
											<Form.Group controlId="rating" className="my-2">
												<Form.Label>Rating</Form.Label>
												<Form.Control
													as="select"
													value={rating}
													onChange={(e) => setRating(Number(e.target.value))}
												>
													<option value={''}>Select</option>
													<option value={'1'}>1 - Poor</option>
													<option value={'2'}>2 - Fair</option>
													<option value={'3'}>3 - Good</option>
													<option value={'4'}>4 - Very good</option>
													<option value={'5'}>5 - Excellent</option>
												</Form.Control>
											</Form.Group>
											<Form.Group controlId="comment" className="my-2">
												<Form.Label>Comment</Form.Label>
												<Form.Control
													value={comment}
													as="textarea"
													rows={3}
													onChange={(e) => setComment(e.target.value)}
												/>
											</Form.Group>
											<Button type="submit" disabled={loadingCreateReview || rating === 0}>
												Submit review
											</Button>
										</Form>
									) : null}
								</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>
				</>
			)}
		</>
	);
};

export default ProductScreen;
