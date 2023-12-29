import {createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom';

import App from '../App';
import {PrivateRoute} from '../components';
import {
	CartScreen,
	HomeScreen,
	ProductScreen,
	LoginScreen,
	RegisterScreen,
	ShippingScreen,
	PaymentScreen,
	PlaceOrderScreen,
	OrderScreen,
} from '../screens';

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route index={true} path="/" element={<HomeScreen />}></Route>
			<Route path="/product/:id" element={<ProductScreen />}></Route>
			<Route path="/cart" element={<CartScreen />}></Route>
			<Route path="/login" element={<LoginScreen />}></Route>
			<Route path="/register" element={<RegisterScreen />}></Route>

			<Route path="" element={<PrivateRoute />}>
				<Route path="/shipping" element={<ShippingScreen />}></Route>
				<Route path="/payment" element={<PaymentScreen />}></Route>
				<Route path="/placeorder" element={<PlaceOrderScreen />}></Route>
				<Route path="/order/:id" element={<OrderScreen />}></Route>
			</Route>
		</Route>,
	),
);
