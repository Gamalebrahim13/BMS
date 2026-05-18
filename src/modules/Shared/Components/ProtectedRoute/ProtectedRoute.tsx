
import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = localStorage.getItem('token')?.trim();

  if (token) {
    return <>{children}</>;
  } else {
    return <Navigate to='/login' replace />;
  }
}

