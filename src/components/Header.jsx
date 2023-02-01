import UserInfo from '../components/UserInfo';
import UserContext from "../contexts/UserContext";
import React, { useContext } from "react";
import { Link, Outlet } from 'react-router-dom';

const Header = () => {

    const { loggedInUser } = useContext(UserContext);
  
    return (
        <>
          {
             loggedInUser !== null ? 
            <UserInfo user={loggedInUser} /> :
            <div className="loginRegister">
              <Link to='/login'>Login</Link>
              <br />
              <Link to='/register'>Register</Link>
            </div>
          }
          
          <Outlet />
        </>
      );
      }
      
      export default Header;
      
      
      
