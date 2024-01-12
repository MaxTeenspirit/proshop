import {Link} from 'react-router-dom';
import {Carousel as BootstrapCarousel, Image} from 'react-bootstrap';

import {useGetTopProductsQuery} from '../../redux/slices/productsApiSlice';
import Loader from '../Loader';
import Message from '../Message';

const Carousel = () => {
	const {data: topProducts, isLoading, error} = useGetTopProductsQuery();

	if (isLoading) {
		return <Loader />;
	}

	if (error) {
		return <Message>Can't get top products</Message>;
	}

	return (
		<BootstrapCarousel pause="hover" className="bg-primary mb-4">
			{topProducts?.map((product) => (
				<BootstrapCarousel.Item key={product._id}>
					<Link to={`/product/${product._id}`}>
						<Image src={product.image} alt={product.name} fluid />
						<BootstrapCarousel.Caption className="carousel-caption">
							<h3>
								{product.name} {product.price}
							</h3>
						</BootstrapCarousel.Caption>
					</Link>
				</BootstrapCarousel.Item>
			))}
		</BootstrapCarousel>
	);
};

export default Carousel;
