import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails, LOGOUT } from "../../redux/actions";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      dispatch(fetchUserDetails(token));
    } else {
      dispatch({ type: LOGOUT });
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [dispatch, token, navigate]);

  if (!user) {
    return <p>Caricamento in corso...</p>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <h3>Benvenuto, {user.username}</h3>
      {user.roles?.includes("ROLE_ADMIN") && <h3>Admin</h3>}
      {user.roles?.includes("ROLE_USER") && <h3>User</h3>}
    </div>
  );
};

export default Dashboard;
