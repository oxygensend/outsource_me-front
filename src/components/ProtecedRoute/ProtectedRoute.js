import { Navigate, Outlet, useParams } from 'react-router-dom';
import { PageUnauthorizated } from '../../pages/pageUnauthorizated';
import { PageAccessDenied } from '../../pages/pageAccessDenied';
import { checkUserRoles } from '../../services/utils';

export const ProtectedRoute = ({ checkRoles, isAuthorizated, redirect, children }) => {
    const { id } = useParams();

    if (!isAuthorizated) {
        return redirect ? <Navigate to={redirect} /> : <PageUnauthorizated />;
    } else if (checkRoles && !checkUserRoles(checkRoles, id)) {
        return <PageAccessDenied />;
    } else {
        return children ? children : <Outlet />;
    }
};
