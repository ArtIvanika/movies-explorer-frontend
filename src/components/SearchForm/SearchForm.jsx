import React from "react";
import { useLocation} from "react-router-dom";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

export default function SearchForm({
  searchMovies,
  searchSavedMovies,
  isShortMovies,
  setIsShortMovies,
  searchText,
  setSearchText,
}) {

  const { pathname } = useLocation();

  const [textError, setTextError] = React.useState('')

const handleChange = (event) => {
  setSearchText(event.target.value);
  if(event.target.value.length === 0){ 
    setTextError("Нужно ввести ключевое слово");
  }else {
    setTextError("а");
};}

  const handleSubmit = (event) => {
    event.preventDefault();
    pathname === "/saved-movies" ? searchSavedMovies() : searchMovies()
};

  return (
    <div className="search">
      <form className="search-box" onSubmit={handleSubmit}>
        <input
          className="search-box__input"
          type="text"
          name="search"
          value={searchText} 
          onChange={handleChange}
          placeholder="Фильм"
          required
        />
        <button
          className="search-box__btn"
          type="submit"
          aria-label="Кнопка поиска"
          
        />

      </form>
      <span className="search__error-message">{textError}</span>
      <FilterCheckbox 
      isShortMovies={isShortMovies} 
      setIsShortMovies={setIsShortMovies}/>
    </div>
  );
}
