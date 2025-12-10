import { Navigate, Outlet } from "react-router";
import { UseAuth } from "../Hook/AuthProvider";


const PrivateRoute = () => {
  const { user } = UseAuth();
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
