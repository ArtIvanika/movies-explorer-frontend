import React from "react";
import "./FilterCheckbox.css";
import { useLocation } from "react-router-dom";

export default function FilterCheckbox({ isShortMovies, setIsShortMovies }) {
  const location = useLocation();

  const locationMovies = location.pathname.endsWith("/movies");

  function handleChange(event) {
    const newValue = event.target.checked;
    setIsShortMovies(newValue);
    if (locationMovies) {
      localStorage.setItem("isShortMovies", String(newValue));
    } else {
      localStorage.setItem("savedIsShortMovies", String(newValue));
    }
  }

  return (
    <div className="filter">
      <label className="filter-box">
        <input
          className="filter-box__input"
          type="checkbox"
          checked={isShortMovies}
          onChange={handleChange}
        />
        <span className="filter-box__slider"></span>
      </label>
      <p className="filter-name">Короткометражки</p>
    </div>
  );
}
