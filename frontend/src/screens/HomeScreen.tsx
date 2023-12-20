import {Row, Col} from 'react-bootstrap';

import {Product} from '../components';
import {useGetProductsQuery} from '../redux/slices/productsApiSlice';

const HomeScreen = () => {
	const {data: products, isLoading, error} = useGetProductsQuery();

	if (isLoading) {
		return <h2>Loading...</h2>;
	}

	if (!!error && 'data' in error) {
		// @ts-ignore
		return <div>{error?.data?.message}</div>;
	}

	if (!!error && 'error' in error) {
		return <div>{error.error}</div>;
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
