import React from "react";
import { useLocation } from "react-router-dom";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import {ENTER_KEYWORD} from "../../utils/constants"

export default function SearchForm({
  isWaiting,
  searchSavedMovies,
  isShortMovies,
  setIsShortMovies,
  searchText,
  setSearchText,
  checkLocalStorage,
}) {
  const { pathname } = useLocation();

  const [textError, setTextError] = React.useState("");

  const handleChange = (event) => {
    setSearchText(event.target.value);
    if (event.target.value.length === 0) {
      setTextError(ENTER_KEYWORD);
    } else {
      setTextError("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    pathname === "/saved-movies" ? searchSavedMovies() : checkLocalStorage();
  };

  return (
    <div className="search">
      <form className="search-box" onSubmit={handleSubmit} noValidate>
        <input
          className="search-box__input"
          type="text"
          name="search"
          value={searchText === null ? "" : searchText}
          onChange={handleChange}
          placeholder="Фильм"
          required
        />
        <button
          className="search-box__btn"
          type="submit"
          aria-label="Кнопка поиска"
          disabled={isWaiting}
        />
      </form>
      <span className="search__error-message">{textError}</span>
      <FilterCheckbox
        isShortMovies={isShortMovies}
        setIsShortMovies={setIsShortMovies}
      />
    </div>
  );
}
