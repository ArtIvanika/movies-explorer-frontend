import React from 'react';
import "./SearchForm.css"
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox"

export default function SearchForm() {
  return (
    <div className="search">
       <form className="search-box">
           <input className="search-box__input" type="text" name="search" placeholder="Фильм" required=""/>
           <button className="search-box__btn" type="submit" aria-label="Кнопка поиска"/>
       </form>
       <FilterCheckbox/>
    </div>
  );
}