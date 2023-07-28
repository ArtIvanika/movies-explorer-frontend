import React from "react";
import "./NavTab.css"

export default function NavTab() {
  return (
    <div className="navtab">
        <ul className="navtab__menu">
            <li><a className="navtab__element" href="#project">О проекте</a></li>
            <li><a className="navtab__element" href="#techs">Технологии</a></li>
            <li><a className="navtab__element" href="#about">Студент</a></li>
        </ul>
    </div>
  );
}