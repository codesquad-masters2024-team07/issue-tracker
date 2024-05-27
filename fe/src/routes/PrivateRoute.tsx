import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const isLogin = !!sessionStorage.getItem("token");
    return isLogin ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
