import PostContext from "../contexts/PostContext";
import UserContext from "../contexts/UserContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const NewPostForm = () => {
  //Tai yra React komponentas, kuris atvaizduoja formą naujo pranešimo sukūrimui. Jis naudoja "useState" mešką, kad laikytųsi formos įvesties reikšmių, kurios pradžioje yra tuščios. Jis taip pat naudoja "useContext" mešką, kad pasiektų "PostContext" ir "UserContext" kontekstus. Naudoja "useNavigate" mešką, kad perkelti į pagrindinį puslapį, kai forma yra pateikta. Formos pateikimo metu jis sukuria naują pranešimą, kuriame yra formos įvesties reikšmės, unikalus ID (nuo dabartinio laiko) ir prisijungusio vartotojo ID. Tada jis vykdo "addNewPost" funkciją iš konteksto, perduodant naują pranešimą kaip argumentą.

  const [formInputs, setFormInputs] = useState({
    title: '',
    image: '',
    location: '',
    about: ''
  });

  const { addNewPlace } = useContext(PostContext);
  const { loggedInUser } = useContext(UserContext);

  const navigation = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    const newPost = {
      title: formInputs.title,
      image: formInputs.image,
      location: formInputs.location,
      about: formInputs.about,
      id: Date.now(),
      userId: loggedInUser.id
    };

    addNewPlace(newPost);
    navigation('/');
  }

  return (
     <>
     <div className="placeForm">
     <h3>ADD NEW PLACE</h3>
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
             <button className="submit" type="submit">Add new place</button>
         </form>
     </div>
 </> );
}
 
export default NewPostForm;