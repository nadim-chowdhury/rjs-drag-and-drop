import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../utils/useAuth";

export default function PrivateRoute() {
  const auth = useAuth();

  return auth ? <Outlet /> : <Navigate to="/" />;
}
