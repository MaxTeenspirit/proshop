import React from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider} from 'react-router-dom';
import {Provider} from 'react-redux';
import {PayPalScriptProvider} from '@paypal/react-paypal-js';

import store from './redux/store';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';

import {router} from './router';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
		<Provider store={store}>
			{/* @ts-ignore */}
			<PayPalScriptProvider>
				<RouterProvider router={router} />
			</PayPalScriptProvider>
		</Provider>
	</React.StrictMode>,
);
