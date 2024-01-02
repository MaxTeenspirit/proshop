import {Badge, Nav, Navbar, Container, NavDropdown} from 'react-bootstrap';
import {FaShoppingCart, FaUser} from 'react-icons/fa';
import {LinkContainer} from 'react-router-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import logo from '../../assets/logo.png';
import {useLogoutMutation} from '../../redux/slices/usersApiSlice';
import {logout} from '../../redux/slices/authSlice';
import {RootState} from '../../redux/store';

const Header = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [logoutApiCall] = useLogoutMutation();

	const {userInfo} = useSelector((state: RootState) => state.auth);
	const {cartItems} = useSelector((state: RootState) => state.cart);

	const cartItemsCount = cartItems.length ? cartItems.reduce((acc, curr) => acc + curr.qty, 0) : 0;

	const handleLogout = async () => {
		try {
			await logoutApiCall({}).unwrap();
			dispatch(logout());
			navigate('/');
		} catch (err) {
			console.log(err);
		}
	};

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
							{userInfo ? (
								<NavDropdown title={userInfo.name} id="username">
									<LinkContainer to="/profile">
										<NavDropdown.Item>Profile</NavDropdown.Item>
									</LinkContainer>
									<NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
								</NavDropdown>
							) : (
								<LinkContainer to="/login">
									<Nav.Link>
										<FaUser /> LogIn
									</Nav.Link>
								</LinkContainer>
							)}
							{userInfo?.isAdmin ? (
								<NavDropdown title="Admin menu" id="adminmenu">
									<LinkContainer to="/admin/productlist">
										<NavDropdown.Item>Product List</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to="/admin/userlist">
										<NavDropdown.Item>User List</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to="/admin/orderlist">
										<NavDropdown.Item>Order List</NavDropdown.Item>
									</LinkContainer>
								</NavDropdown>
							) : null}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
