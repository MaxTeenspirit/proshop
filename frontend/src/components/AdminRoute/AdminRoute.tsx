import {Outlet, Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';

const AdminRoute = () => {
	const {userInfo} = useSelector((state: RootState) => state.auth);
	if (!!userInfo && !!userInfo.isAdmin) {
		return <Outlet />;
	}
	return <Navigate to="/login" replace />;
};

export default AdminRoute;
