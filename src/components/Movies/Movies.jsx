import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

const Movies = (props) => {
  return (
    <>
      <SearchForm
        isWaiting={props.isWaiting}
        searchMovies={props.searchMovies}
        isShortMovies={props.isShortMovies}
        setIsShortMovies={props.setIsShortMovies}
        searchText={props.searchText}
        setSearchText={props.setSearchText}
        checkLocalStorage={props.checkLocalStorage}
      />
      <MoviesCardList
        preloader={props.preloader}
        isWaiting={props.isWaiting}
        errorSearch={props.errorSearch}
        textError={props.textError}
        isShortMovies={props.isShortMovies}
        savedMovies={props.savedMovies}
        filteredMovies={props.filteredMovies}
        filteredShortMovies={props.filteredShortMovies}
        deleteCard={props.deleteCard}
        saveCard={props.saveCard}
      />
    </>
  );
};

export default Movies;
