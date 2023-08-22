import React, {useState} from "react";
import { Link, useLocation } from "react-router-dom";
import "./BurgerBtn.css";

export default function BurgerBtn() {
  const { pathname } = useLocation();
  const [isBurgerOpen, setBurgerOpen] = useState(false);
  function handleEditBurgerClick() {
    setBurgerOpen(true);
 }
 function handleCloseBurgerClick() {
    setBurgerOpen(false);
 }

  return (
    <nav className="burger">
      <button className="burger-btn" type="button"
      onClick={handleEditBurgerClick}
      >
        <span className="burger-btn__line" />
      </button>
      {/* <div className="burger__movies burger__movies-inactive"> */}
      <div className={`burger__movies ${isBurgerOpen ? "": "burger__movies-inactive"}`}>
        <div className="burger__blur" />
        <button className="burger__close" type="button"
        onClick={handleCloseBurgerClick}/>
        <div className="burger__nav">
          <Link to="/" className={`burger__nav-link ${
            pathname === "/" ? "burger__nav-link_active" : ""
          }`}
          >
            Главная
          </Link>
          <Link
            to="/movies"
            className={`burger__nav-link ${
              pathname === "/movies" ? "burger__nav-link_active" : ""
            }`}
          >
            Фильмы
          </Link>
          <Link to="/saved-movies" className={`burger__nav-link ${
              pathname === "/saved-movies" ? "burger__nav-link_active" : ""
            }`}>
            Сохранённые фильмы
          </Link>
          <Link to="/profile" className="burger__profile">
            Аккаунт
          </Link>
        </div>
      </div>

    </nav>
  );
}
