import {Container, Row, Col} from 'react-bootstrap';
import logo from '../../assets/logo.png';

const Footer = () => {
	const currentYear = new Date().getFullYear();
	return (
		<footer>
			<Container>
				<Row>
					<Col className="text-center py-3">
						<p>
							<img src={logo} alt="ProShop logo" /> ProShop &copy; {currentYear}
						</p>
					</Col>
				</Row>
			</Container>
		</footer>
	);
};

export default Footer;
