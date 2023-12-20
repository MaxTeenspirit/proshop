import {Spinner} from 'react-bootstrap';

const loaderStyles = {display: 'block', width: '100px', height: '100px', margin: 'auto'};

const Loader = () => {
	return <Spinner animation="border" role="status" style={loaderStyles} />;
};

export default Loader;
