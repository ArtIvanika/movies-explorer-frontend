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
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorProfile, setErrorProfile] = useState("");
  const [errorLogin, setErrorLogin] = useState("");
  const [errorReg, setErrorReg] = useState("");
  const [textError, setTextError] = useState("");
  const [errorSearch, setErrorSearch] = useState(false);
  // фильмы
  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filteredShortMovies, setFilteredShortMovies] = useState([]);
  const [myShortMovies, setMyShortMovies] = useState([]);
  const [myMovies, setMyMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  const [preloader, setPreloader] = useState(false);
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [searchText, setSearchText] = useState("");


  //                                      Логин, Регистрация, Пользователь
  useEffect(() => {
    if (loggedIn) {
      Promise.all([mainApi.getUserInfo(), mainApi.getSavedMovies()])
        .then(([userData, movies]) => {
          setCurrentUser(userData);
          setSavedMovies(movies.reverse());
        })
        .catch((err) => console.log(err));
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
    mainApi
      .register(name, email, password)
      .then(() => {
        handleLogin(email, password);
      })
      .catch((err) => {
        setErrorReg(err);
      })
      .finally(resetForm());
  }

  function handleLogin(email, password) {
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
      .finally(resetForm());
  }

  function handleUpdateUser(name, email) {
    mainApi
      .updateUserInfo(name, email)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        setErrorProfile(err);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function signOut() {
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/", { replace: true });
  }

  //                           Поиск фильмов

  useEffect(() => {
    startPreloader()
      checkLocalStorage();
  
  }, []);

  function startPreloader(){
    setPreloader(true)
  }

  // function checkLocalStorage() {
  //   const AllMovies = JSON.parse(localStorage.getItem("AllMovies"));
  //   console.log(AllMovies)
  //   if (AllMovies > 0) {
      
  //     setAllMovies(JSON.parse(AllMovies));
  //     console.log("a")
  //   } else {
  //     takeAllMovies();
  //     console.log("b")
  //     console.log(AllMovies)
  //   }
  // }

  function checkLocalStorage() {
    const AllMovies = localStorage.getItem("AllMovies");
    console.log(AllMovies)
    if (AllMovies ) {
      setAllMovies(JSON.parse(AllMovies));
      console.log("a")
    } else {
      takeAllMovies();
      console.log("b")
    }
  }
  // console.log(allMovies)
  // console.log(JSON.parse(localStorage.getItem("AllMovies")))

  // Получение фильмов с сервера
  function takeAllMovies() {
    // setPreloader(true);
    const moviesBeatFilm = [];
    moviesApi
      .getAllMovies()
      .then((data) => {
        data.forEach((movie) => {
          moviesBeatFilm.push(confetrAllMovies(movie));
        });
        localStorage.setItem("allMovies", JSON.stringify(moviesBeatFilm));
        setAllMovies(moviesBeatFilm);
      })
      .catch((err) => console.log(err))
      // .finally(()=>{setPreloader(false)})
  }

  // конвертация данных в формат БД
  function confetrAllMovies(movie) {
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
    // newList.saved = false;
    return newList;
  }

  // function searchMovies() {
  //   localStorage.setItem("moviesSearchText", searchText);
  //   const allFilteredMovies = [];
  //   const shortMovies = [];
  //       setErrorSearch(false);
  //       // фильтр фильмов
  //       const filteredMovies = handleSearch(allMovies, searchText);
  //       if (filteredMovies.length !== 0) {
  //         allFilteredMovies.push(filteredMovies);
  //       }
  //       if (filteredMovies.length === 0) {
  //         setErrorSearch(true);
  //         setTextError("Ничего не найдено");
  //       }
  //       localStorage.setItem(
  //         "filteredMovies",
  //         JSON.stringify(allFilteredMovies)
  //       );
  //       setFilteredMovies(allFilteredMovies);
  //    // короткометражки
  //         const filteredShortMovies = allFilteredMovies.flat().filter(
  //           (film) => film.duration <= 40
  //         );
  //         shortMovies.push(filteredShortMovies);
  //         localStorage.setItem(
  //           "filteredShortMovies",
  //           JSON.stringify(shortMovies)
  //         );
  //         setFilteredShortMovies(shortMovies)
  // }
  function searchMovies() {
    // if (searchText.trim() === '') {
    //   setTextError('Нужно ввести ключевое слово');
    //   return;
    // }
    // setTextError('');
    setPreloader(true);
    localStorage.setItem("moviesSearchText", searchText);
    const allFilteredMovies = [];
    const shortMovies = [];
    mainApi
      .getSavedMovies()
      .then(() => {
        setErrorSearch(false);
        // фильтр фильмов
        const filteredMovies = handleSearch(allMovies, searchText);
        if (filteredMovies.length !== 0) {
          allFilteredMovies.push(filteredMovies);
        }
        if (filteredMovies.length === 0) {
          setErrorSearch(true);
          setTextError("Ничего не найдено");
        }
        localStorage.setItem(
          "filteredMovies",
          JSON.stringify(allFilteredMovies)
        );
        setFilteredMovies(allFilteredMovies);
     // короткометражки
          const filteredShortMovies = allFilteredMovies.flat().filter(
            (film) => film.duration <= 40
          );
          shortMovies.push(filteredShortMovies);
          localStorage.setItem(
            "filteredShortMovies",
            JSON.stringify(shortMovies)
          );
          setFilteredShortMovies(shortMovies)
      })
      .catch(() => {
        setTextError(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
        );
      })
      .finally(() => {
        setPreloader(false);
      });
   }
// console.log(filteredMovies)
  function handleSearch(allMovies, searchText) {
    return allMovies.filter((movie) => {
      return (
        movie.nameRU.toLowerCase().includes(searchText.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(searchText.toLowerCase())
      );
    });
  }

  useEffect(()=>{
    setPreviousSearch()
  }, [])

  // Предыдущий поиск
  function setPreviousSearch(){
    // const checkBox = JSON.parse(localStorage.getItem("isShortMovies"))
    // if(checkBox){
    //   setFilteredShortMovies(JSON.parse(localStorage.getItem("filteredShortMovies")))
    // }
    // if(!checkBox){
    //   setFilteredMovies(JSON.parse(localStorage.getItem("filteredMovies")))
    // }
      
      
  }
console.log(JSON.parse(localStorage.getItem("isShortMovies")))
  const [savedCardsList, setSavedCardsList] = useState([])
  const [savedShortCardsList, setSavedShortCardsList] = useState([])

  useEffect(() => {
    setSavedCardsList(savedMovies)
  }, [savedMovies])

  useEffect(() => {
    filterSavedFilms ()
  }, [isShortMovies])

  // Поиск по сохраненым фильмам
  function searchSavedMovies() {
    if (searchText.trim() === '') {
      setTextError('Нужно ввести ключевое слово');
      return;
    }
    setTextError('');
    filterSavedFilms ()
    if (filteredShortMovies.length === 0) {
      setErrorSearch(true);
      setTextError("Ничего не найдено")
    }
  }

  // Фильтр сохраненых фильмов
  function filterSavedFilms (){
    const filteredMovies = handleSearch(savedMovies, searchText);
   const filteredShortMovies = isShortMovies ? filteredMovies.filter((film) => film.duration <= 40) : filteredMovies;
    setSavedCardsList(filteredShortMovies)
  }

  useEffect(()=>{
    setPreviousSearchMy()
  }, [])

  // Предыдущий поиск
  function setPreviousSearchMy(){
    setMyShortMovies(JSON.parse(localStorage.getItem("myShortMovies")))
    setMyMovies(JSON.parse(localStorage.getItem("myMovies"))) 
  }

  //   mainApi
  //     .getMovies()
  // //       .then((moviesBD) => {
  // //         moviesBeatFilm .forEach((movie) => {
  // //           if(moviesBD.data.find((item) => item.moviedId === movie.movieId)){
  // // movie.owner = moviesBD.data.find((item) => item.moviedId === movie.movieId).owner
  // //           }
  // //          })
  // //       })
  //     .then(() => {


 
  function saveCard(card) {
    mainApi
        .saveMovie(card)
        .then((data) => {
            setSavedMovies([...savedMovies, data].reverse())
            console.log("карточка сохранена")
        })
        .catch((err) => {
            console.log('Ошибка сохранения карточки ', err)
        })
}

function deleteCard(card) {
  mainApi.deleteMovie(card._id)
      .then(() => {
          if (pathname === "/saved-movies") {
              const newShownCards = savedMovies.filter((c) => c._id !== card._id)
              setSavedCardsList(newShownCards);
          }
          const newCards = savedMovies?.filter((c) => c._id!== card._id)
          // card.saved = false;
          setSavedMovies(newCards);
          console.log("Карточка удалена");
      })
      .catch((err) => {
          console.log('Ошибка удаления карточки ', err)
      });
};

  const headerRoutes = routesWithHeader.find((item) => {
    return item === pathname;
  });
  const footerRoutes = routesWithFooter.find((item) => {
    return item === pathname;
  });

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        {headerRoutes ? <Header loggedIn={loggedIn} /> : ""}
        <main className="main">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route
              path="/signup"
              element={
                <Register handleRegister={handleRegister} error={errorReg} />
              }
            />
            <Route
              path="/signin"
              element={<Login handleLogin={handleLogin} error={errorLogin} />}
            />
            <Route
              path="/movies"
              element={
                <ProtectedRouteElement
                  loggedIn={loggedIn}
                  element={Movies}
                  isLoading={isLoading}
                  filteredMovies={filteredMovies}
                  filteredShortMovies={filteredShortMovies}
                  movies={allMovies}
                  preloader={preloader}
                  searchMovies={searchMovies}
                  errorSearch={errorSearch}
                  isShortMovies={isShortMovies}
                  searchText={searchText}
                  setSearchText={setSearchText}
                  setIsShortMovies={setIsShortMovies}
                  textError={textError}
                  settTextError={setTextError}
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
                  isLoading={isLoading}
                  savedMovies={savedMovies}
                  myShortMovies={myShortMovies}
                  myMovies={myMovies}
                  searchSavedMovies={searchSavedMovies}
                  preloader={preloader}
                  isShortMovies={isShortMovies}
                  searchText={searchText}
                  setSearchText={setSearchText}
                  setIsShortMovies={setIsShortMovies}
                  textError={textError}
                  settTextError={setTextError}
                  deleteCard={deleteCard}
                  savedCardsList={savedCardsList}
                  savedShortCardsList={savedShortCardsList}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRouteElement
                  loggedIn={loggedIn}
                  element={Profile}
                  signOut={signOut}
                  isLoading={isLoading}
                  onUpdateUser={handleUpdateUser}
                  error={errorProfile}
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
