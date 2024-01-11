import {Row, Col} from 'react-bootstrap';
import {useParams} from 'react-router-dom';

import {Product, Loader, Message, Paginate} from '../components';
import {useGetProductsQuery} from '../redux/slices/productsApiSlice';

const HomeScreen = () => {
	const {pageNumber} = useParams();
	const {data, isLoading, error} = useGetProductsQuery(pageNumber);

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
				{data?.products?.length &&
					data.products.map((product) => (
						<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
							<Product product={product} />
						</Col>
					))}
			</Row>
			<Paginate totalPages={data?.pages} currentPage={data?.pageNumber} />
		</>
	);
};

export default HomeScreen;
