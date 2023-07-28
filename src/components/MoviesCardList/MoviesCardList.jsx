import React from 'react';
import "./MoviesCardList.css"
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList() {
  return (
    <div className="movies-container">
        <ul className="movies-container__list">
          <li><MoviesCard/></li>
          <li><MoviesCard/></li>
          <li><MoviesCard/></li>
          <li><MoviesCard/></li>
          <li><MoviesCard/></li>
          <li><MoviesCard/></li>
          <li><MoviesCard/></li>
          <li><MoviesCard/></li>
          <li><MoviesCard/></li>
          <li><MoviesCard/></li>
          <li><MoviesCard/></li>
          <li><MoviesCard/></li>
        </ul>
        <button className="movies-container__btn-more" type="button" aria-label="Кнопка 'Еще'">Ещё</button>
    </div>
  );
}