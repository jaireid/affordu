import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { currentUser } = useContext(AuthContext);
  let location = useLocation();

  // Navigate to the login page if not current user
  if (!currentUser) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}
