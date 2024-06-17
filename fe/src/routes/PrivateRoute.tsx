import { Navigate, Outlet } from "react-router-dom";
import ThemeSwitch from "../components/ThemeSwitch/ThemeSwitch";

const PrivateRoute = () => {
    const isLogin = !!sessionStorage.getItem("token");
    return isLogin ? <>
    <ThemeSwitch />
    <Outlet />
    </> : <Navigate to="/" />;
};

export default PrivateRoute;
