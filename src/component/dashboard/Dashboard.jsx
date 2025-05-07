import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails } from "../../redux/actions";

const Dashboard = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const token = localStorage.getItem("token");

    

    useEffect(() => {
        dispatch(fetchUserDetails(token));
    }, [dispatch, token]); 

    return (
        console.log(token),
        console.log(user),
        <div>
            <h1>Dashboard</h1>
            <h3>{user?.username}</h3>
            {user.roles.find((role) => role === "ROLE_ADMIN") && (
                <h3>Admin</h3>
            )}
            {user.roles.find((role) => role === "ROLE_USER") && (
                <h3>User</h3>
            )}
            <h3></h3>
        </div>
    );
};

export default Dashboard;