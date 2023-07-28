import React from "react";
import SearchForm from "../SearchForm/SearchForm";
// import Preloader from '../Preloader/Preloader'
import MoviesCardList from "../MoviesCardList/MoviesCardList";

const SavedMovies = () => {
  return (
    <>
        <SearchForm />
        {/* <Preloader/> */}
        <MoviesCardList />
    </>
  );
};

export default SavedMovies;
