import React from "react";
import "./NavTab.css"

export default function NavTab() {
  return (
    <section className="navtab">
        <ul className="navtab__menu">
            <a className="navtab__element" href="#project">О проекте</a>
            <a className="navtab__element" href="#techs">Технологии</a>
            <a className="navtab__element" href="#about">Студент</a>
        </ul>
    </section>
  );
}