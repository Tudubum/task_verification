import PostContext from "../contexts/PostContext";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPostForm = () => {

  const { id } = useParams();

  const { place, updatePlace } = useContext(PostContext);

  const currentPost = place.find(post => post.id.toString() === id) || {};

  const navigation = useNavigate();

  const [formInputs, setFormInputs] = useState({
    title: currentPost.title || "",
    image: currentPost.image || "",
    location: currentPost.location || "",
    about: currentPost.about || ""
  });

  const handleSubmit = e => {
    e.preventDefault();
    
    updatePlace(id, formInputs);
    
    navigation('/');
  }

  return (
    <div className="editPlaceForm">
      <h3>EDIT PLACE</h3>
         <form onSubmit={handleSubmit}>
             <label>
                 Pavadinimas:
                 <input type="text" value={formInputs.title} 
                onChange={(e) => setFormInputs({...formInputs, title:e.target.value})}
                  />
             </label>
             <label>
                 Nuotrauka URL:
                 <input type="text" value={formInputs.image} 
                 onChange={(e)=> setFormInputs({...formInputs, image:e.target.value})} />
             </label>
             <label>
                 Lokacija:
                 <input type="text" value={formInputs.location} 
                 onChange={(e)=> setFormInputs({...formInputs, location:e.target.value})} />
             </label>
             <label>
                 Aprašymas:
                 <input type="text" value={formInputs.about} 
                 onChange={(e)=> setFormInputs({...formInputs, about:e.target.value})}
                 />
             </label>
             <button className="submit" type="submit">Edit place</button>
         </form>
    </div>
  );
}
 
export default EditPostForm;