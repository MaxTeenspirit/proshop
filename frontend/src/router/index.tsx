import {createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom';

import App from '../App';
import {HomeScreen, ProductScreen} from '../screens';

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route index={true} path="/" element={<HomeScreen />}></Route>
			<Route path="/product/:id" element={<ProductScreen />}></Route>
		</Route>,
	),
);
