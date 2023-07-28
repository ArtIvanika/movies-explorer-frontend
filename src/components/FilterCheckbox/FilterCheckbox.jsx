import React from 'react';
import "./FilterCheckbox.css"

export default function FilterCheckbox() {
  return (
    <div className="filter">
       <label className="filter-box">
          <input className="filter-box__input" type="checkbox"/>
          <span className="filter-box__slider"></span>
       </label>
       <p className="filter-name">Короткометражки</p>
    </div>
  );
}