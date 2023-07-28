import React, {useState} from "react";
import { Link } from "react-router-dom";
// import logo from "../../images/logo.svg";
import "./BurgerBtn.css";

export default function BurgerBtn() {
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
          <Link to="/" className="burger__nav-link">
            Главная
          </Link>
          <Link
            to="/movies"
            className="burger__nav-link burger__nav-link_active"
          >
            Фильмы
          </Link>
          <Link to="/saved-movies" className="burger__nav-link burger__nav-link_last-child">
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
