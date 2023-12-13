import {Container} from 'react-bootstrap';
import {Header, Footer} from './components';
import {Outlet} from 'react-router-dom';

function App() {
	return (
		<>
			<Header />
			<main className="py-3">
				<Container>
					<Outlet />
				</Container>
			</main>
			<Footer />
		</>
	);
}

export default App;
