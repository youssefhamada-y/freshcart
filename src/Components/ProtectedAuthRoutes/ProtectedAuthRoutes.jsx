import React, { useContext } from "react";
import { AuthContext } from "./../../Contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedAuthRoutes({ children }) {
  const { usertoken } = useContext(AuthContext);
  return <>{!usertoken ? children : <Navigate to={"/"} />}</>;
}
