import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Navigate, useLocation } from "react-router-dom";
import { setModalState } from "../redux/slice/modalSlice";
import { useEffect } from "react";

interface protectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<protectedRouteProps> = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(setModalState({ key: "authModal", isOpen: true }));
    }
  }, [isLoggedIn, dispatch]);

  if (isLoggedIn) {
    <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
