import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import { useWindowResize } from "../../hooks/useWindowResize";
import { useLocation } from "react-router-dom";

export default function MoviesCardList({
  preloader,
  isWaiting,
  errorSearch,
  textError,
  isShortMovies,
  savedMovies,
  saveCard,
  deleteCard,
  filteredMovies,
  filteredShortMovies,
  savedCardsList,
  
}) {
  // const { visibleFilmsCount, isLoading, addMovies, width } = useWindowResize();
  const width = useWindowResize();
  const location = useLocation();

  const [initialCount, setInitialCount] = React.useState(2); 
  const [loadStep, setLoadStep] = React.useState(0);

  React.useEffect(()=>{
    if (width > 1175) {
      setInitialCount(16);
      setLoadStep(4);
    } else if (width > 820) {
      setInitialCount(12);
      setLoadStep(3);
    } else if (width > 500) {
      setInitialCount(8);
      setLoadStep(2);
    } else {
      setInitialCount(5);
      setLoadStep(2);
    }   
}, [, width])

React.useEffect(()=>{
  setVisibleFilmsFilmsCount(initialCount)
},[initialCount])

  const [visibleFilmsCount, setVisibleFilmsFilmsCount] = React.useState(
    initialCount
  ); //сколько сейчас отображается фильмов
  const [isLoading, setIsLoading] = React.useState(false); //стэйт прелоадера

  const addMovies = () => {
    // setIsLoading(true);
    // setTimeout(() => {
      setVisibleFilmsFilmsCount((prevCount) => prevCount + loadStep);
      // setIsLoading(false);
    // }, 600);
  };

  // React.useEffect(() => {
  //   addMovies();
  // }, [width]);

  const renderMovies = !isShortMovies ? filteredMovies : filteredShortMovies;
  const renderAllMovies = location.pathname === "/movies" ? renderMovies : savedCardsList;

  return (
    <div className="movies-container">
      <hr className="movies-container__line"></hr>
      {!renderAllMovies && preloader && <Preloader />}
      {errorSearch ? (
        <span className="movies-container__error-message">{textError}</span>
      ) : (
        ""
      )}
      <ul className="movies-container__list">
        {renderAllMovies
          ?.flat()
          .slice(0, visibleFilmsCount)
          .map((movie) => (
            <MoviesCard
              key={movie.movieId}
              movie={movie}
              savedMovies={savedMovies}
              saveCard={saveCard}
              deleteCard={deleteCard}
              isWaiting={isWaiting}
            />
          ))}
      </ul>
      {isLoading && <Preloader />}
      {renderAllMovies?.flat().length > visibleFilmsCount ? (
        <button
          className="movies-container__btn-more"
          onClick={addMovies}
          type="button"
          aria-label="Кнопка 'Еще'"
          disabled={isWaiting}
        >
          Ещё
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
