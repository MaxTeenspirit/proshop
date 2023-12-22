import {Badge, Nav, Navbar, Container} from 'react-bootstrap';
import {FaShoppingCart, FaUser} from 'react-icons/fa';
import {LinkContainer} from 'react-router-bootstrap';
import {useSelector} from 'react-redux';

import {RootState} from '../../redux/store';
import logo from '../../assets/logo.png';

const Header = () => {
	const {cartItems} = useSelector((state: RootState) => state.cart);
	const cartItemsCount = cartItems.length ? cartItems.reduce((acc, curr) => acc + curr.qty, 0) : 0;

	return (
		<header>
			<Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
				<Container>
					<LinkContainer to="/">
						<Navbar.Brand>
							<img src={logo} alt="ProShop logo" />
							ProShop
						</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ms-auto">
							<LinkContainer to="/cart">
								<Nav.Link>
									<FaShoppingCart /> Cart
									{!!cartItemsCount && (
										<Badge pill bg="success" style={{marginLeft: '5px'}}>
											{cartItemsCount}
										</Badge>
									)}
								</Nav.Link>
							</LinkContainer>
							<LinkContainer to="/login">
								<Nav.Link>
									<FaUser /> LogIn
								</Nav.Link>
							</LinkContainer>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
