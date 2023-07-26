import React from 'react';
import "./SearchForm.css"
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox"

export default function SearchForm() {
  return (
    <section className="search">
       <div className="search-box">
           <input className="search-box__input" type="search" name="search" placeholder="Фильм"/>
           <button className="search-box__btn" type="submit" aria-label="Кнопка поиска"/>
       </div>
       <FilterCheckbox/>
    </section>
  );
}