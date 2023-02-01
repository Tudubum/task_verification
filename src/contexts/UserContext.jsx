import React, { createContext, useEffect, useState } from "react";

const UserContext = createContext();

const UserProvider = ({children}) => {
    
    const [users, setUsers] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://localhost:8000/users');
            const user = await res.json();
            setUsers(user);
        };
        fetchData();
    },[]);

    const banOrUnbanUser = async (id) => {
        const userToUpdate = users.find(user => user.id.toString() === id.toString());
        userToUpdate.isBanned = !userToUpdate.isBanned;
      
        await fetch(`http://localhost:8000/users/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userToUpdate)
        });
      
        const res = await fetch('http://localhost:8000/users');
        const updatedUsers = await res.json();
        setUsers(updatedUsers);
      };

    // pridedam nauja registruota vartotoja i json user faila
    const addNewUser = async (newUser) => {
        try {
        const res = await fetch('http://localhost:8000/users', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
        });
        const updatedUsers = await res.json();
        setUsers([...users, updatedUsers]);
        localStorage.setItem("users", JSON.stringify([...users, updatedUsers]))
        } catch (err) {
        console.error(err);
        }
        };

  
    return (
        <UserContext.Provider
            value={{
                users,
                addNewUser,
                setUsers,
                banOrUnbanUser,
                loggedInUser,
                setLoggedInUser
                }}
            >
                {children}
        </UserContext.Provider>
    );
}

export {UserProvider};
export default UserContext;