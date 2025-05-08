import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails } from "../../redux/actions";

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      dispatch(fetchUserDetails(token));
    }
  }, [dispatch, token]);

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
