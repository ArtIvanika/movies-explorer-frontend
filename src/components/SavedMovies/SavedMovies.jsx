import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

const SavedMovies = (props) => {
  React.useEffect(() => {
    props.setIsShortMovies(false);
  }, []);
  return (
    <>
      <SearchForm
        isWaiting={props.isWaiting}
        searchSavedMovies={props.searchSavedMovies}
        isShortMovies={props.isShortMovies}
        setIsShortMovies={props.setIsShortMovies}
        searchText={props.searchText}
        setSearchText={props.setSearchText}
      />
      <MoviesCardList
        preloader={props.preloader}
        isWaiting={props.isWaiting}
        textError={props.textError}
        savedMovies={props.savedMovies}
        deleteCard={props.deleteCard}
        savedCardsList={props.savedCardsList}
      />
    </>
  );
};

export default SavedMovies;
