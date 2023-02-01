import React, { useContext } from "react";
import Post from "./Post";
import UserContext from "../contexts/UserContext";
import PostContext from "../contexts/PostContext";

const LikedPlaces = () => {
    const { loggedInUser } = useContext(UserContext);
    const { place } = useContext(PostContext);
    
    const likedPlaces = place.filter(post => post.likedBy.includes(loggedInUser.id));

    return (
      <div className="likedPlacesList">
        {likedPlaces.map(post => (
          <Post 
          data={post} 
          key={post.id}
          className="list"
          />
        ))}
      </div>
    );
  };
  
export default LikedPlaces;

