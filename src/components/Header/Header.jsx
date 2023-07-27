import React, { useState, useEffect } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import logo from "../../images/logo.svg";
import BurgerBtn from "../BurgerBtn/BurgerBtn";
import "./Header.css";
import { routesWithoutBlueHeader, SCREEN_MD } from "../../utils/constantas";
import Navigation from "../Navigation/Navigation";

export default function Header() {
  const { pathname } = useLocation();
  const headerColorRoutes = routesWithoutBlueHeader.find((item) => {
    return item === pathname;
  });

  let resize;

  const useResize = () => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = (event) => {
        setWidth(event.target.innerWidth);
      };
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    return width <= SCREEN_MD;
  };

  resize = useResize();
  
  return (
    <header
      className={`header ${pathname === "/" ? "header__main" : ""} ${
        headerColorRoutes ? "header__all" : ""
      }`}
    >
      <Link to="/">
        <img className="logo" src={logo} alt="Логотип" />
      </Link>
      <Routes>
        <Route
          path="/movies"
          element={resize ? <BurgerBtn /> : <Navigation />}
        />
        <Route
          path="/saved-movies"
          element={resize ? <BurgerBtn /> : <Navigation />}
        />
        <Route
          path="/profile"
          element={resize ? <BurgerBtn /> : <Navigation />}
        />
        <Route
          path="/"
          element={
            <div className="header__main">
              <div className="header__box-main">
                <Link to="/signup" className="header__main-link">
                  Регистрация
                </Link>
                <Link to="/signin" className="header__main-link">
                  Войти
                </Link>
              </div>
            </div>
          }
        />
      </Routes>
    </header>
  );
}
