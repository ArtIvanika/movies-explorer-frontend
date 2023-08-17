import { useState, useEffect } from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";


import MoviesCardList from "../MoviesCardList/MoviesCardList";

const Movies = (props) => {
  
  return (
    <>
      <SearchForm
        searchMovies={props.searchMovies}
        // onChange={props.onChange}
        isShortMovies={props.isShortMovies}
        setIsShortMovies={props.setIsShortMovies}
        searchText={props.searchText}
        setSearchText={props.setSearchText}
       
        // textError = {props.textError}
        />
        
        {/* <hr className="movies__line"></hr> */}
   {/* {props.preloader && <Preloader />} */}
     {/* {!props.preloader && <span className="search__error-message">{props.textError}</span>} */}
     
     
        <MoviesCardList
        preloader={props.preloader}
        errorSearch={props.errorSearch}
        textError={props.textError}
        searchMovies={props.searchMovies}
        isShortMovies={props.isShortMovies}
        // allMoive={!isShortMovies ? filteredMovies : filteredShortMovies}
        filteredMovies={props.filteredMovies}
        filteredShortMovies={props.filteredShortMovies}
        // handleSavedMovie ={props.handleSavedMovie}
        displayedCards={props.displayedCards}
          // cards={props.cards}
          movies={props.movies}
          moreMovies={props.moreMovies}
          // deleteCard={props.deleteCard}
          saveCard={props.saveCard}
          сardsList={props.сardsList}
        />

      {/* {props.preloader && <Preloader />} */}
      {/* {!props.preloader && !props.textError && (
        <MoviesCardList
        searchMovies={props.searchMovies}
        
        filteredMovies={props.filteredMovies}
          // cards={props.cards}
          // movies={props.movies}
          displayedCards={props.displayedCards}
          moreMovies={props.moreMovies}
          // deleteCard={props.deleteCard}
          saveCard={props.saveCard}
          сardsList={props.сardsList}
        />
      )} */}

    </>
  );
};

export default Movies;
