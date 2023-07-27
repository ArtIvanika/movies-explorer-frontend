import React from 'react';
import "./MoviesCard.css"
import movie from "../../images/movie.jpg";

export default function MoviesCard() {
  return (
    <section className="card">
       <img className="card__photo" src={movie} alt="Заставка фильма"/>
       <div className="card__box">
         <p className="card__name">33 слова о дизайне </p>
         <button className="card__btn-save"></button>
       </div> 
       <p className="card__time">1ч42м</p>
    </section>
  );
}