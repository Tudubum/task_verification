import UserContext from "../contexts/UserContext";
import { useContext } from "react";
import UserCard from "./UserCard";

const UsersPage = () => {
    const { users, banOrUnbanUser } = useContext(UserContext);
    const nonAdminUsers = users.filter(user => user.level !== 'admin');
    return (
    <>
    <UserCard
                 users={nonAdminUsers}
                 banOrUnbanUser={banOrUnbanUser}
             />
    </>
    );
    }
    
    export default UsersPage;