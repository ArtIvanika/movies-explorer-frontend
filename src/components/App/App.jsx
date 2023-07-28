import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Header from "../Header/Header";
import Profile from "../Profile/Profile";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Error from "../Error/Error";
import Footer from "../Footer/Footer";
import { routesWithHeader, routesWithFooter } from "../../utils/constantas";

function App() {
  const { pathname } = useLocation();
  const headerRoutes = routesWithHeader.find((item) => {
    return item === pathname;
  });
  const footerRoutes = routesWithFooter.find((item) => {
    return item === pathname;
  });

  return (
    <div className="App">
      {headerRoutes ? <Header /> : ""}
      <main>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/saved-movies" element={<SavedMovies />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </main>
      {footerRoutes ? <Footer /> : ""}
    </div>
  );
}

export default App;
