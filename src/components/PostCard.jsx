import React, { useContext } from "react";
import PostContext from "../contexts/PostContext";
import UserContext from "../contexts/UserContext";
import { Link } from "react-router-dom";

const PostCard = () => {
  const { place, deletePlace } = useContext(PostContext);
  const { users, loggedInUser } = useContext(UserContext);

  return (
    <>
      <div className="placeCard">
        {place.map(p => {
          const postOwner = users.find(user => user.id === p.userId);

          return (
            <div className="card" key={p.id}>
              <div className="user">
                {postOwner && (
                  <>
                    <img src={postOwner.avatar} alt="avatar" style={{ width: "30px", height: "auto" }} />
                    <span>{postOwner.userName}</span>
                    {
                        loggedInUser && loggedInUser.id === postOwner.id && 
                        <>
                        <button onClick={() => deletePlace(p.id)}>Delete</button>
                        <button><Link to={`/editPost/${p.id}`}>Edit</Link></button>
                        </>
                    }
                    <hr />
                  </>
                )}
              </div>
              <img src={p.image} alt="place" />
              <div className="info">
                <p>{p.location}</p>
                <h3>{p.title}</h3>
                <p>{p.about}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PostCard;
