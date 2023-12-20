import {Row, Col} from 'react-bootstrap';

import {Product, Loader, Message} from '../components';
import {useGetProductsQuery} from '../redux/slices/productsApiSlice';

const HomeScreen = () => {
	const {data: products, isLoading, error} = useGetProductsQuery();

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

	return (
		<>
			<h1>Latest Products</h1>
			<Row>
				{products?.length &&
					products.map((product) => (
						<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
							<Product product={product} />
						</Col>
					))}
			</Row>
		</>
	);
};

export default HomeScreen;
