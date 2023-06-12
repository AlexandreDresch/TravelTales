import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";

import UserContext from "../../contexts/UserContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const userContext = useContext(UserContext);
  const userData = userContext ? userContext.userData : null;

  if (!userData) {
    return <Navigate to="/sign-in" />;
  }

  return <>{children}</>;
}
