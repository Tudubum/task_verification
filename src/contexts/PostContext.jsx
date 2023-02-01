import { createContext, useEffect, useState, useContext } from "react";
import UserContext from "./UserContext";

const PostContext = createContext();

const PostProvider = ({children}) =>{
// 1 pradzia - atvaizduojam duomenis i ekrana
    const [place, setPlace] = useState([]);
    const { loggedInUser } = useContext(UserContext);


    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://localhost:8000/place');
            const data = await res.json();
            setPlace(data);
        };
        fetchData();
    },[]);

// 1 pabaiga.

const addNewPlace = async (newPlace) => {
    const res = await fetch('http://localhost:8000/place', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPlace)
    });
    const data = await res.json();
    setPlace([...place, data]);
}

  
    const deletePlace = async (id) => {
        await fetch(`http://localhost:8000/place/${id}`, {
          method: 'DELETE',
        }).then(res => {
          if(res.ok){
            setPlace(place.filter(place => place.id !== id))
          }
        }).catch(error => console.error(error));
      };


    const updatePlace = async (id, updatedPlace ) => {
        await fetch(`http://localhost:8000/place/${id}`, {
          method: 'PUT',
          body: JSON.stringify(updatedPlace),
          headers: { 'Content-Type': 'application/json' },
        }).then(res => {
          if(res.ok){
            setPlace(place.map(place => place.id.toString() === id? {...place, ...updatedPlace} : place));
          }
        }).catch(error => console.error(error));
      };

      
      const handleLike = async (id) => {
        const updatedPlace = place.find(place => place.id === id);
        updatedPlace.likedBy = updatedPlace.likedBy ?? [];
        if(!updatedPlace.likedBy.includes(loggedInUser.id)) {
            updatedPlace.likedBy.push(loggedInUser.id);
        } else {
            updatedPlace.likedBy = updatedPlace.likedBy.filter(userId => userId !== loggedInUser.id);
        }
        await updatePlace(id, updatedPlace);
    }
      

    return (
        <PostContext.Provider
            value={{
                place,
                addNewPlace,
                deletePlace,
                updatePlace,
                handleLike
                
            }}
            >
            {children}
        </PostContext.Provider>
    )

}

export {PostProvider};
export default PostContext;