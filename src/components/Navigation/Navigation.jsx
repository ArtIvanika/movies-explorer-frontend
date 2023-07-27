import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

export default function Navigation() {
  return (
    <nav className="nav">
      <div className="nav-box">
        <Link to="/movies" className="nav-box__link nav-box__link_active">
          Фильмы
        </Link>
        <Link to="/saved-movies" className="nav-box__link">
          Сохранённые фильм
        </Link>
      </div>
      <Link to="/profile" className="nav__profile">
        Аккаунт
      </Link>
    </nav>
  );
}
