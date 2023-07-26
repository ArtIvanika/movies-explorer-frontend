import React from "react";
import { Link, Route, Routes } from "react-router-dom";
// import logo from "../../images/logo.svg";
import "./Navigation.css";

export default function Navigation(){
    return (
        <nav className="burger">
            <div className="burger-btn">
                <span className="burger-btn__line"/>
            </div>
            <Routes>
                <Route
                   path="/"
                 // path="/movies"
                   element={
                    <div className="burger__movies">
                    <div className="burger__blur"/>
                    <button className="burger__close" type="button"></button>
                     <div className="burger__nav">
                     <Link to="/" className="burger__nav-link">
                       Главная
                     </Link>
                      <Link to="/movies" className="burger__nav-link burger__nav-link:active">
                       Фильмы
                     </Link>
                     <Link to="/saved-movies" className="burger__nav-link">
                      Сохранённые фильм
                         </Link>
                    <Link to="/profile" className="burger__profile">
                      Аккаунт
                    </Link>
                    </div>
                </div>
              }/>
            </Routes>
          {/* <Routes>

             <Link to="/">
                <img className="logo" src={logo} alt="Логотип"/>
             </Link>
            <Route
              path="/"
              // path="/movies"
              element={
                <div className="nav__movies">
                  <div className="header__nav">
                    <Link to="/movies" className="header__nav-link">
                      Фильмы
                    </Link>
                    <Link to="/saved-movies" className="header__nav-link">
                     Сохранённые фильм
                     </Link>
                  </div>
                    <Link to="/profile" className="header__profile">
                      Аккаунт
                    </Link>
                </div>
              }/>
          </Routes> */}
    
        </nav>
      );
    }