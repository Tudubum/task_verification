import Post from "../components/Post";
import PostContext from "../contexts/PostContext";
import UserContext from "../contexts/UserContext";
import { useContext } from "react";

const UserPosts = () => {
  //Komponentas "UserPosts" naudoja "useContext" Hook'ą kad gautų informaciją apie prisijungusį vartotoją ir visus post'us. Tada jis filtruoja post'us pagal prisijungusio vartotojo id ir atvaizduoja juos su "Post" komponentu.

  const { loggedInUser } = useContext(UserContext);
  const { place } = useContext(PostContext);

  if (!loggedInUser || !place) {
    return null;
  }

  return (
    <>
      {
        place
          .filter(place => place.userId === loggedInUser.id)
          .map(place => 
            <Post 
              key={place.id}
              data={place}
            />  
          )
      }
    </>
  );
}
 
export default UserPosts;