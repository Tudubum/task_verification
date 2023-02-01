import PostContext from "../contexts/PostContext";
import UserContext from "../contexts/UserContext";
import { useContext } from "react";
import Post from "./Post";

const Posts = () => {
    // Naudojame context, kad gautume informaciją apie vietas ir vartotojus
    const { place } = useContext(PostContext);
    const { users } = useContext(UserContext);
  
    // Filtruojame vartotojus, kurie yra užbaninti
    const bannedUsers = users.filter(user => user.isBanned).map(user => user.id);
  
    // Filtruojame vietas, kurios yra susietos su užbanintu vartotoju
    const availablePosts = place.filter(place => !bannedUsers.includes(place.userId));
  
    // Grąžiname tik laisvas vietas
    return (
      <div className="allUserCards">
        {
          availablePosts.map((place)=> 
            <Post 
              key={place.id}
              data={place}
            />  
          )
        }
      </div>
    );
  }
   
  export default Posts;