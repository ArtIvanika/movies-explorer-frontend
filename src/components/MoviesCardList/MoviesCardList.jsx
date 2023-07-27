import React from 'react';
import "./MoviesCardList.css"
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList() {
  return (
    <section className="movies-container">
        <ul className="movies-container__list">
            <MoviesCard/>
            <MoviesCard/>
            <MoviesCard/>
            <MoviesCard/>
            <MoviesCard/>
            <MoviesCard/>
            <MoviesCard/>
            <MoviesCard/>
            <MoviesCard/>
            <MoviesCard/>
            <MoviesCard/>
            <MoviesCard/>
            <MoviesCard/>
            <MoviesCard/>
            <MoviesCard/>
            <MoviesCard/>
        </ul>
        <button className="movies-container__btn-more" type="button" aria-label="Кнопка 'Еще'">Ещё</button>
    </section>
  );
}