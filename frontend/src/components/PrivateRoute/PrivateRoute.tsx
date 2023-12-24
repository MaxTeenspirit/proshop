import {Outlet, Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';

const PrivateRoute = () => {
	const {userInfo} = useSelector((state: RootState) => state.auth);
	if (!!userInfo) {
		return <Outlet />;
	}
	return <Navigate to="/login" replace />;
};

export default PrivateRoute;
