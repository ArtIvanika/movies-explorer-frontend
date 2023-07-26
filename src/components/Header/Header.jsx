import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import logo from "../../images/logo.svg";
import "./Header.css";
import Navigation from "../Navigation/Navigation";

export default function Header(){
    return (
        <header className="header header__blue header-try">
              <Link to="/">
                  <img className="logo" src={logo} alt="Логотип"/>
              </Link>
                    {/* <Navigation/>  */}
          <Routes>
          <Route
              // path="/"
              path="/movies"
              element={
                <div className="header__movies">
                   {/* <Link to="/">
                         <img className="logo" src={logo} alt="Логотип"/>
                    </Link> */}
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
             <Route
              path="/"
              element={
                <div className="header__main">
                  {/* <Link to="/">
                         <img className="logo" src={logo} alt="Логотип"/>
                    </Link> */}
                    <div className="header__box-main">
                  <Link to="/signup" className="header__main-link">
                   Регистрация
                  </Link>
                  <Link to="/signin" className="header__main-link">
                    Войти
                 </Link>
                 </div>
                </div>
              }/> 
    

          </Routes>
    
        </header>
      );
    }