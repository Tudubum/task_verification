import { useContext } from "react";
import UserContext from "../contexts/UserContext";

const UserCard = () => {
    const { users, banOrUnbanUser } = useContext(UserContext);
  
    return (
        <div className="usersList">
          <h1>Users List</h1>
          {users.map((user) => (
              <div className="userCardInList" key={user.id}>
                <img
                  src={user.avatar}
                  alt="useravatar"
                  style={{ width: "30px", height: "auto" }}
                />
                <span>{user.userName}</span>
                <button className="buttonUsersList" onClick={() => banOrUnbanUser(user.id)}>
                  {user.isBanned ? "UnBan" : "Ban"}
                </button>
              </div>
          ))}
        </div>
      );
            
  };
   
export default UserCard;