import { Route, Routes } from "react-router-dom";
import './App.css';
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Error from "../Error/Error"

function App() {
  return (
    <div className="App">
      
      <main>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/signup" element={<Register/>}/>
          <Route path="/signin" element={<Login/>}/>
          <Route path="/movies" element={<Movies/>}/>
          <Route path="/saved-movies" element={<SavedMovies/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="*" element={<Error/>}/>
        </Routes>
      </main>

    </div>
  );
}

export default App;
