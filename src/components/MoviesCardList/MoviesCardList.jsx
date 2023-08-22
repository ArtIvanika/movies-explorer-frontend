import React, { useState, useEffect } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import { useWindowResize } from "../../hooks/useWindowResize";
import { useLocation } from "react-router-dom";
import {
  SCREEN_WIDTH_1175,
  SCREEN_WIDTH_820,
  SCREEN_WIDTH_500,
  NUMBER_OF_FILMS_GIVEN_OUT_16,
  NUMBER_OF_FILMS_GIVEN_OUT_12,
  NUMBER_OF_FILMS_GIVEN_OUT_8,
  NUMBER_OF_FILMS_GIVEN_OUT_5,
  NUMBER_OF_FILMS_TO_BE_ADDED_4,
  NUMBER_OF_FILMS_TO_BE_ADDED_3,
  NUMBER_OF_FILMS_TO_BE_ADDED_2,
} from "../../utils/constants";

export default function MoviesCardList({
  preloader,
  searchText,
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
  searchMovies,
}) {
  const width = useWindowResize();
  const location = useLocation();

  const [visibleFilmsCount, setVisibleFilmsFilmsCount] = useState(0); //сколько сейчас отображается фильмов
  const renderMovies = !isShortMovies ? filteredMovies : filteredShortMovies;
  const renderAllMovies =
    location.pathname === "/movies" ? renderMovies : savedCardsList;

  useEffect(() => {
    function resizeListener() {
      const width = window.innerWidth;
      let setInitialCount = 0;
      if (width > SCREEN_WIDTH_1175) {
        setInitialCount = NUMBER_OF_FILMS_GIVEN_OUT_16;
      } else if (width > SCREEN_WIDTH_820) {
        setInitialCount = NUMBER_OF_FILMS_GIVEN_OUT_12;
      } else if (width > SCREEN_WIDTH_500) {
        setInitialCount = NUMBER_OF_FILMS_GIVEN_OUT_8;
      } else {
        setInitialCount = NUMBER_OF_FILMS_GIVEN_OUT_5;
      }
      setVisibleFilmsFilmsCount(setInitialCount);
    }
    window.addEventListener("resize", resizeListener);
    resizeListener();
    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, [width, renderAllMovies]);

  function addMovies() {
    const width = window.innerWidth;
    let setLoadStep = 0;
    if (width > SCREEN_WIDTH_1175) {
      setLoadStep = NUMBER_OF_FILMS_TO_BE_ADDED_4;
    } else if (width > SCREEN_WIDTH_820) {
      setLoadStep = NUMBER_OF_FILMS_TO_BE_ADDED_3;
    } else if (width > SCREEN_WIDTH_500) {
      setLoadStep = NUMBER_OF_FILMS_TO_BE_ADDED_2;
    } else {
      setLoadStep = NUMBER_OF_FILMS_TO_BE_ADDED_2;
    }

    setVisibleFilmsFilmsCount((prevCount) => {
      const newVisibleFilmsFilmsCount = prevCount + setLoadStep;
      return newVisibleFilmsFilmsCount
    });
  }

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
      {/* {isLoading && <Preloader />} */}
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
