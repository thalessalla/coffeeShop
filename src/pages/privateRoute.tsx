import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { verifyToken } from "../services/auth";

interface Props {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  return verifyToken() ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
