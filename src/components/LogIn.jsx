import { useContext, useState } from "react";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";


const LogIn = () => {
    const [userInfo, setUserInfo] = useState({
        userName: '',
        password: ''
    });

    const {users, setLoggedInUser} = useContext(UserContext);

    const [failedLogIn, setFailedLogIn] = useState(false);

    

    const navigation = useNavigate();

    const [userIsBanned, setUserIsBanned] = useState(false);
    const hanldeSubmit = async (e) => {
        e.preventDefault();
        const loggedInUser = users.find(user => user.userName === userInfo.userName && user.password === userInfo.password);

        if(!loggedInUser.isBanned){
            setLoggedInUser(loggedInUser);
            navigation('/');
          } else if(loggedInUser.isBanned){
            setUserIsBanned(true);
          } else {
            setFailedLogIn(true);
          }
        } 


    return ( 
        <div>
            <form className="loginForm" onSubmit={hanldeSubmit}>
                <h3>LOG IN</h3>
                <label>
                    UserName:
                    <input type="text" name="userName"
                        value={userInfo.userName}
                        onChange={(e)=>setUserInfo({...userInfo, userName:e.target.value})}
                    />
                </label>
                <label>
                    Password:
                    <input type="password" name="password"
                        value={userInfo.password}
                        onChange={(e)=>setUserInfo({...userInfo, password:e.target.value})}
                    />
                </label>
                <input type="submit" className="submit" value="Log In" />

                { 
                    failedLogIn && <span>Wrong log in info</span> }
                {
                    userIsBanned && <span>Your user has been banned</span>
                }
            </form>
        </div>
    );
}
 
export default LogIn;