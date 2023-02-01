import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import PostContext from "../contexts/PostContext";

const Post = ({ data }) => {

    const { users, loggedInUser } = useContext(UserContext);
    const { deletePlace, handleLike } = useContext(PostContext);
    
    const postOwner = users.find(user => user.id === data.userId);
    
    if (!postOwner || !data) {
        return <div>kazkas ne ok galimai</div>;
    }
      
    
    return (
    <div className="allUserCards"> 
      <div className="card">
        <div className="userioInfoPriePost">
          <img
            src={postOwner.avatar}
            alt="CiaTuretuButiAvataras"
            style={{ width: "30px", height: "auto" }}
          />
          <span>{postOwner.userName}</span>
          {loggedInUser && loggedInUser.id === data.userId && (
            <>
              <button onClick={() => deletePlace(data.id)}>Delete</button>
              <button>
                <Link to={`/editPost/${data.id}`}>Edit</Link>
              </button>
           
            </>
          )}
        {
           loggedInUser && 
            <button onClick={() => handleLike(data.id)} className="likeButton">
            {data.likedBy.includes(loggedInUser.id) ? <i className="fa fa-heart"></i> : <i className="fa fa-heart-o"></i>
            }
            </button>
        }
        </div>
        <div className="cardInfo">
            <img src={data.image} alt={data.title} />
            <div className="info">
                 <p>{data.location}</p>
                <h3>{data.title}</h3>
                <p>{data.about}</p>
            </div>
        </div>
        </div>
    </div> 
    );
    
    
  };

  export default Post;
