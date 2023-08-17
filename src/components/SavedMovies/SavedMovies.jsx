import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

const SavedMovies = (props) => {

  return (
    <>
      <SearchForm
        searchSavedMovies={props.searchSavedMovies}
        onChange={props.onChange}
        isShortMovies={props.isShortMovies}
        setIsShortMovies={props.setIsShortMovies}
        searchText={props.searchText}
        setSearchText={props.setSearchText}
      />
        <MoviesCardList
          cards={props.cards}
          myShortMovies={props.myShortMovies}
          myMovies={props.myMovies}
          textError={props.textError}
          movies={props.movies}
          displayedCards={props.displayedCards}
          savedMovies={props.savedMovies}
          deleteCard={props.deleteCard}
          сardsList={props.сardsList}
          savedCardsList={props.savedCardsList}
          savedShortCardsList={props.savedShortCardsList}
        />
    </>
  );
};

export default SavedMovies;
