import { Navigate, Outlet } from "react-router";
import { UseAuth } from "./context/AuthContext";

function ProtectedRoutes() {
  const { loading, isAuthenticated } = UseAuth();

  if (loading) return <h1>Loading...</h1>;
  if (!loading && !isAuthenticated) return <Navigate to={"/login"} replace />;
  return <Outlet />;
}

export default ProtectedRoutes;
