import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import { useWindowResize } from "../../hooks/useWindowResize"
import { useLocation } from "react-router-dom";

export default function MoviesCardList({
  isSavedMoviesList,
  preloader,
  errorSearch,
  textError,
  isShortMovies,
  savedMovies,
  saveCard,
  myShortMovies,
  myMovies,
  deleteCard,
  filteredMovies,
  filteredShortMovies,
  savedCardsList,
  savedShortCardsList
}) {

  const {visibleFilmsCount, isLoading, addMovies} = useWindowResize();
  const location = useLocation();

  // console.log(isShortMovies)
const renderMovies = !isShortMovies ? filteredMovies : filteredShortMovies;
const renderSavedMovies = !isShortMovies ? savedCardsList : savedShortCardsList;
const renderAllMovies = location.pathname === "/movies" ? renderMovies : renderSavedMovies
// const renderAllMovies = location.pathname === "/movies" ? renderMovies : savedCardsList
  
  return (
    <div className="movies-container">
      <hr className="movies-container__line"></hr>
      {!renderAllMovies && preloader && <Preloader />}
      {errorSearch ? (<span className="movies-container__error-message">{textError}</span>) : ("")}
      <ul className="movies-container__list">
        {renderAllMovies?.flat().slice(0, visibleFilmsCount).map((movie) => (
          <MoviesCard key={movie.movieId} movie={movie} isSavedMoviesList={isSavedMoviesList} savedMovies={savedMovies} saveCard={saveCard} deleteCard={deleteCard}/>
        ))}
      </ul>
      {isLoading && <Preloader/>}
      {renderAllMovies?.flat().length > visibleFilmsCount ? (
      <button
        className="movies-container__btn-more"
        onClick={addMovies}
        type="button"
        aria-label="Кнопка 'Еще'"
      >
        Ещё
      </button>
       ) : (
        ""
      )} 
    </div>
  );
}
