import React from 'react';
import "./MoviesCard.css";
import movie from "../../images/movie.jpg";
import { useLocation } from "react-router-dom";

export default function MoviesCard() {
  const { pathname } = useLocation();

  return (
    <div className="card">
       <img className="card__photo" src={movie} alt="Заставка фильма"/>
       <div className="card__box">
         <p className="card__name">33 слова о дизайне </p>
         <button className={`${pathname === "/movies" ? "card__btn-save-like" : "card__btn-save-close"}`}></button>
       </div> 
       <p className="card__time">1ч42м</p>
    </div>
  );
}