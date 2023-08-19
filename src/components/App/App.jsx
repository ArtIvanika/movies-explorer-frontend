import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
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
import {
  routesWithHeader,
  routesWithFooter,
  MOVIES_URL,
} from "../../utils/constants";
import * as moviesApi from "../../utils/MoviesApi";
import * as mainApi from "../../utils/MainApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { resetForm } = useFormAndValidation();

  const [loggedIn, setLoggedIn] = useState(false);
  const [infoUser, setInfoUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorProfile, setErrorProfile] = useState("");
  const [errorLogin, setErrorLogin] = useState("");
  const [errorReg, setErrorReg] = useState("");
  const [textError, setTextError] = useState("");
  const [textErrorUser, setTextErrorUser] = useState("");
  const [errorSearch, setErrorSearch] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  // фильмы
  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filteredShortMovies, setFilteredShortMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  const [preloader, setPreloader] = useState(false);
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [searchText, setSearchText] = useState("");

  //                                      Логин, Регистрация, Пользователь
  useEffect(() => {
    setIsWaiting(true);
    if (loggedIn) {
      Promise.all([mainApi.getUserInfo(), mainApi.getSavedMovies()])
        .then(([userData, movies]) => {
          setInfoUser(userData);
          setSavedMovies(movies.reverse());
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setIsWaiting(false);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    if (token) {
      mainApi
        .checkToken(token)
        .then((res) => {
          navigate(pathname, { replace: true });
          if (res) {
            setLoggedIn(true);
            setIsLoading(false);
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  function handleRegister(name, email, password) {
    setIsWaiting(true);
    mainApi
      .register(name, email, password)
      .then(() => {
        handleLogin(email, password);
      })
      .catch((err) => {
        setErrorReg(err);
      })
      .finally(() => {
        resetForm();
        setIsWaiting(false);
      });
  }

  function handleLogin(email, password) {
    setIsWaiting(true);
    mainApi
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          setLoggedIn(true);
          navigate("/movies", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorLogin(err);
      })
      .finally(() => {
        resetForm();
        setIsWaiting(false);
      });
  }

  function handleUpdateUser(name, email) {
    setIsWaiting(true);
    mainApi
      .updateUserInfo(name, email)
      .then((res) => {
        setInfoUser(res);
        setTextErrorUser("Профиль успешно обнавлен")
      })
      .catch((err) => {
        setErrorProfile(err);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
        setIsWaiting(false);
      });
  }

  function signOut() {
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/", { replace: true });
  }

  //                           Поиск фильмов

  function checkLocalStorage() {
    const AllMovies = localStorage.getItem("allMovies");
    if (AllMovies) {
      setAllMovies(JSON.parse(AllMovies));
      searchMovies(allMovies);
    }
    takeAllMovies();
  }
  // Получение фильмов с сервера
  function takeAllMovies() {
    const moviesBeatFilm = [];
    moviesApi
      .getAllMovies()
      .then((data) => {
        data.forEach((movie) => {
          moviesBeatFilm.push(confertAllMovies(movie));
        });
        localStorage.setItem("allMovies", JSON.stringify(moviesBeatFilm));
        setAllMovies(moviesBeatFilm);
        searchMovies(moviesBeatFilm);
      })
      .catch((err) => console.log(err));
  }

  // конвертация данных в формат БД
  function confertAllMovies(movie) {
    const newList = {};
    newList.country = movie.country;
    newList.director = movie.director;
    newList.duration = movie.duration;
    newList.year = movie.year;
    newList.description = movie.description;
    newList.image = `${MOVIES_URL}${movie.image.url}`;
    newList.trailerLink = movie.trailerLink;
    newList.thumbnail = `${MOVIES_URL}${movie.image.formats.thumbnail.url}`;
    newList.movieId = movie.id;
    newList.nameRU = movie.nameRU;
    newList.nameEN = movie.nameEN;
    return newList;
  }

  function searchMovies(data) {
    setPreloader(true);
    localStorage.setItem("moviesSearchText", JSON.stringify(searchText));
    checkCheckbox(data)
    setPreloader(false);
  }
// useEffect(()=>{
//   checkCheckbox(JSON.parse(localStorage.getItem("allMovies")))
// }, [isShortMovies])

  function checkCheckbox(data){
      const allFilteredMovies = [];
      const shortMovies = [];
      setErrorSearch(false);
      // фильтр фильмов
      const filteredMovies = handleSearch(data, searchText);
      if (filteredMovies.length !== 0) {
        allFilteredMovies.push(filteredMovies);
      }
      if (filteredMovies.length === 0) {
        setErrorSearch(true);
        setTextError("Ничего не найдено");
      }
      localStorage.setItem("filteredMovies", JSON.stringify(allFilteredMovies));
      setFilteredMovies(allFilteredMovies);
      // короткометражки
      const filteredShortMovies = allFilteredMovies
        .flat()
        .filter((film) => film.duration <= 40);
      shortMovies.push(filteredShortMovies);
      localStorage.setItem("filteredShortMovies", JSON.stringify(shortMovies));
      setFilteredShortMovies(shortMovies);
  
  }

  // function searchMovies(data) {
  //   setPreloader(true);
  //   console.log(allMovies);
  //   localStorage.setItem("moviesSearchText", JSON.stringify(searchText));
  //   const allFilteredMovies = [];
  //   const shortMovies = [];
  //   setErrorSearch(false);
  //   // фильтр фильмов
  //   const filteredMovies = handleSearch(data, searchText);
  //   if (filteredMovies.length !== 0) {
  //     allFilteredMovies.push(filteredMovies);
  //   }
  //   if (filteredMovies.length === 0) {
  //     setErrorSearch(true);
  //     setTextError("Ничего не найдено");
  //   }
  //   localStorage.setItem("filteredMovies", JSON.stringify(allFilteredMovies));
  //   setFilteredMovies(allFilteredMovies);
  //   // короткометражки
  //   const filteredShortMovies = allFilteredMovies
  //     .flat()
  //     .filter((film) => film.duration <= 40);
  //   shortMovies.push(filteredShortMovies);
  //   localStorage.setItem("filteredShortMovies", JSON.stringify(shortMovies));
  //   setFilteredShortMovies(shortMovies);
  //   setPreloader(false);
  // }

  function handleSearch(allMovies, searchText) {
    return allMovies?.filter((movie) => {
      return (
        movie.nameRU.toLowerCase().includes(searchText.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(searchText.toLowerCase())
      );
    });
  }

  useEffect(() => {
    setPreviousSearch();
  }, [pathname]);

  // Предыдущий поиск
  function setPreviousSearch() {
    if (pathname === "/movies") {
      const checkBox = JSON.parse(localStorage.getItem("isShortMovies"));
      setSearchText(JSON.parse(localStorage.getItem("moviesSearchText")));
      setIsShortMovies(checkBox);
      // checkCheckbox(allMovies)
      setFilteredShortMovies(
        JSON.parse(localStorage.getItem("filteredShortMovies"))
      );
      setFilteredMovies(JSON.parse(localStorage.getItem("filteredMovies")));
    }
  }

  const [savedCardsList, setSavedCardsList] = useState([]);

  useEffect(() => {
    setSavedCardsList(savedMovies);
  }, [savedMovies]);

  useEffect(() => {
    filterSavedFilms();
  }, [, isShortMovies]);

  useEffect(() => {
    if (searchText?.length === 0 && pathname === "/saved-movies") {
      setSavedCardsList(savedMovies);
    }
  }, [searchText]);

  // Поиск по сохраненым фильмам
  function searchSavedMovies() {
    if (searchText.trim() === "") {
      setTextError("Нужно ввести ключевое слово");
      return;
    }
    setTextError("");
    filterSavedFilms();
    if (filteredShortMovies.length === 0) {
      setErrorSearch(true);
      setTextError("Ничего не найдено");
    }
  }
  useEffect(()=>{
    filterSavedFilms()
  }, [isShortMovies])

  // Фильтр сохраненых фильмов
  function filterSavedFilms() {
    const filteredMovies = handleSearch(savedMovies, searchText);
    const filteredShortMovies = isShortMovies
      ? filteredMovies.filter((film) => film.duration <= 40)
      : filteredMovies;
    setSavedCardsList(filteredShortMovies);
  }

  function saveCard(card) {
    setIsWaiting(true);
    mainApi
      .saveMovie(card)
      .then((data) => {
        setSavedMovies([...savedMovies, data].reverse());
        console.log("карточка сохранена");
      })
      .catch((err) => {
        console.log("Ошибка сохранения карточки ", err);
      })
      .finally(() => {
        setIsWaiting(false);
      });
  }

  function deleteCard(card) {
    setIsWaiting(true);
    mainApi
      .deleteMovie(card._id)
      .then(() => {
        if (pathname === "/saved-movies") {
          const newShownCards = savedMovies.filter(
            (c) => c.movieId !== card.movieId
          );
          setSavedCardsList(newShownCards);
        }
        const newCards = savedMovies?.filter((c) => c.movieId !== card.movieId);
        setSavedMovies(newCards);
        console.log("Карточка удалена");
      })
      .catch((err) => {
        console.log("Ошибка удаления карточки ", err);
      })
      .finally(() => {
        setIsWaiting(false);
      });
  }

  const headerRoutes = routesWithHeader.find((item) => {
    return item === pathname;
  });
  const footerRoutes = routesWithFooter.find((item) => {
    return item === pathname;
  });

  return (
    <CurrentUserContext.Provider value={infoUser}>
      <div className="App">
        {headerRoutes ? <Header loggedIn={loggedIn} /> : ""}
        <main className="main">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route
              path="/signup"
              element={
                <Register
                  handleRegister={handleRegister}
                  error={errorReg}
                  isWaiting={isWaiting}
                />
              }
            />
            <Route
              path="/signin"
              element={
                <Login
                  handleLogin={handleLogin}
                  error={errorLogin}
                  isWaiting={isWaiting}
                />
              }
            />
            <Route
              path="/movies"
              element={
                <ProtectedRouteElement
                  loggedIn={loggedIn}
                  element={Movies}
                  checkLocalStorage={checkLocalStorage}
                  filteredMovies={filteredMovies}
                  filteredShortMovies={filteredShortMovies}
                  isWaiting={isWaiting}
                  savedMovies={savedMovies}
                  preloader={preloader}
                  searchMovies={searchMovies}
                  errorSearch={errorSearch}
                  isShortMovies={isShortMovies}
                  searchText={searchText}
                  setSearchText={setSearchText}
                  setIsShortMovies={setIsShortMovies}
                  textError={textError}
                  deleteCard={deleteCard}
                  saveCard={saveCard}
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRouteElement
                  loggedIn={loggedIn}
                  element={SavedMovies}
                  savedMovies={savedMovies}
                  isWaiting={isWaiting}
                  searchSavedMovies={searchSavedMovies}
                  preloader={preloader}
                  isShortMovies={isShortMovies}
                  searchText={searchText}
                  setSearchText={setSearchText}
                  setIsShortMovies={setIsShortMovies}
                  textError={textError}
                  deleteCard={deleteCard}
                  savedCardsList={savedCardsList}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRouteElement
                  loggedIn={loggedIn}
                  element={Profile}
                  isWaiting={isWaiting}
                  signOut={signOut}
                  isLoading={isLoading}
                  textErrorUser={textErrorUser}
                  setTextErrorUser={setTextErrorUser}
                  onUpdateUser={handleUpdateUser}
                  error={errorProfile}
                  infoUser={infoUser}
                  setInfoUser={setInfoUser}
                />
              }
            />
            <Route path="*" element={<Error />} />
          </Routes>
        </main>
        {footerRoutes ? <Footer /> : ""}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
