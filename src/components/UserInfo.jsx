import UserContext from "../contexts/UserContext";
import { useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';

const UserInfo = () => {
  //Komponentas "UserInfo" yra atsakingas už vartotojo informacijos rodymą ir valdymą. Jis naudoja "UserContext" kontekstą, kad gautų informaciją apie prisijungusį vartotoją ir jį nustatyti iš naujo. Komponentas taip pat naudoja "useNavigate" funkciją, kad galėtų nukreipti vartotoją į pradžios puslapį, kai jis atsijungia. Jei prisijungusiam vartotojui yra "admin" lygmuo, jis mato "Manage Users" nuorodą, kuri leidžia administruoti vartotojus. Komponentas taip pat rodo vartotojo avatarą, vartotojo vardą ir "LogOut" mygtuką, kad vartotojas galėtų atsijungti.

  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  const navigation = useNavigate();

  const logOutUser = () => {
    setLoggedInUser(null);
    navigation('/');
  }

  return (
    <div className="header" style={{display:'flex', justifyContent:'space-between'}}>
      <div className="homeLink" style={{display:'flex', justifyContent:'flex-start'}}>
        <Link to="/">HOME</Link>
      </div>
      <div className="userBox" style={{display:'flex', justifyContent:'flex-end'}}>
        {
          (loggedInUser.level === 'admin') && <Link to="/users">Manage Users</Link>
        }
        <Link 
            className="likedPlacesTitle" 
            to="/likedplaces"> Liked places</Link>
        <Link to="/newPost">Add new post</Link>
        <Link to="/user" className="userName">
          <span>{loggedInUser.userName}</span>
          <img
            src={loggedInUser.avatar}
            alt="user avatar"
            style={{width:'30px', height:'auto'}}
          />
        </Link>
        <button className="logOutBtn" onClick={() => logOutUser()}>LogOut</button>
      </div>
    </div>
  );
}
 
export default UserInfo;