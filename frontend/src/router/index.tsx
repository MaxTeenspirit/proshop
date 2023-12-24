import {createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom';

import App from '../App';
import {CartScreen, HomeScreen, ProductScreen, LoginScreen} from '../screens';

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route index={true} path="/" element={<HomeScreen />}></Route>
			<Route path="/product/:id" element={<ProductScreen />}></Route>
			<Route path="/cart" element={<CartScreen />}></Route>
			<Route path="/login" element={<LoginScreen />}></Route>
		</Route>,
	),
);
