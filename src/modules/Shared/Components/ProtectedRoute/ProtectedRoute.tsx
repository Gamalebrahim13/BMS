import { useContext, type ReactNode } from "react"
import { AuthContext } from "../../../../context/AuthContext"
import { Navigate } from "react-router-dom";
interface ProtectedRouteProps {
  children:ReactNode;
}
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
 const context = useContext(AuthContext);
  if (!context) {
    return <Navigate to='/login' />;
  }
  const { loginData } = context;
  const token = localStorage.getItem('token')?.trim();
  if (token && loginData) {
    return children; 
  } else {
    return <Navigate to='/login' />;
  }

}


