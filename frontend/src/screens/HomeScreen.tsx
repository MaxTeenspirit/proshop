import {Row, Col} from 'react-bootstrap';
import {useParams, useSearchParams} from 'react-router-dom';

import {Product, Loader, Message, Paginate, Search} from '../components';
import {useGetProductsQuery} from '../redux/slices/productsApiSlice';

const HomeScreen = () => {
	const {pageNumber} = useParams();
	const [getSearchParams] = useSearchParams();
	const searchParams = getSearchParams.get('search');

	const {data, isLoading, error} = useGetProductsQuery({pageNumber, keyword: searchParams || ''});

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
			<Search />
			<Row>
				{!!data?.products?.length ? (
					data.products.map((product) => (
						<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
							<Product product={product} />
						</Col>
					))
				) : (
					<Message>Product not found</Message>
				)}
			</Row>
			<Paginate totalPages={data?.pages} currentPage={data?.pageNumber} />
		</>
	);
};

export default HomeScreen;
