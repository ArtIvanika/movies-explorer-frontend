import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";

export default function Navigation() {
  const { pathname } = useLocation();
  return (
    <nav className="nav">
      <div className="nav-box">
        <Link
          to="/movies"
          className={`nav-box__link ${
            pathname === "/movies" ? "nav-box__link_active" : ""
          }`}
        >
          Фильмы
        </Link>
        <Link
          to="/saved-movies"
          className={`nav-box__link ${
            pathname === "/saved-movies" ? "nav-box__link_active" : ""
          }`}
        >
          Сохранённые фильм
        </Link>
      </div>
      <Link to="/profile" className="nav__profile">
        Аккаунт
      </Link>
    </nav>
  );
}
