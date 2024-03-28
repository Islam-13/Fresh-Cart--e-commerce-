import { useAuthContext } from "../context/AuthContext";
import Login from "../pages/Login";

function ProtectedRoutes({ children }) {
  const { isLoggedIn } = useAuthContext();
  return <div>{isLoggedIn ? children : <Login />}</div>;
}

export default ProtectedRoutes;
