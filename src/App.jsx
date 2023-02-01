import './App.css';
import Header from './components/Header';
import LogIn from './components/LogIn';
import Register from './components/Register';
import NewPostForm from './components/NewPostForm';
import Main from './components/Main';
import UsersPage from './components/UsersPage';
import UserPage from './components/UserPage';
import EditPostForm from './components/EditPostForm';
//import PostCard from './components/PostCard';
//import { UserProvider } from './contexts/UserContext';
import { Routes, Route } from 'react-router-dom';
import LikedPlaces from './components/LikedPlaces';


function App() {
  return (
    <>
    <Header/>
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="/newPost" element={<NewPostForm />}/>
        <Route path="/editPost/:id" element={<EditPostForm />}/>
        <Route path="/user" element={<UserPage />}/>
        <Route path="/users" element={<UsersPage />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<LogIn />}/>
        <Route path="/likedplaces" element={<LikedPlaces/>}/>
      </Routes>
    </>
  );
}

export default App;
