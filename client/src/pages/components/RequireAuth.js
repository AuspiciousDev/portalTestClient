import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();
  console.log("Allowed Roles = ", allowedRoles);
  console.log(
    "User Roles = ",
    auth?.roles?.map((role) => {
      return role;
    })
  );
  return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.username ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );

  //
  // return auth?.username ? (
  //   <Outlet />
  // ) : (
  //   <Navigate to="/unauthorized" state={{ from: location }} replace />
  // );
};
export default RequireAuth;
