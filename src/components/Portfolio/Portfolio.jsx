import React from 'react';
import './Portfolio.css';
import arrow from "../../images/arrow.svg";

export default function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__element">
          <a
            className="portfolio__link"
            target="_blank"
            rel="noreferrer"
            href="https://artivanika.github.io/how-to-learn/"
          >
            <span className="portfolio__link-text">Статичный сайт</span>
            <img
              className="portfolio__arrow"
              src={arrow}
              alt="иконка-стрелка"
            />
          </a>
        </li>
        <li className="portfolio__element">
          <a
            className="portfolio__link"
            target="_blank"
            rel="noreferrer"
            href="https://artivanika.github.io/russian-travel/"
          >
            <span className="portfolio__link-text">Адаптивный сайт</span>
            <img
              className="portfolio__arrow"
              src={arrow}
              alt="иконка-стрелка"
            />
          </a>
        </li>
        <li className="portfolio__element">
          <a
            className="portfolio__link"
            target="_blank"
            rel="noreferrer"
            href="https://ivanika.nomoreparties.sbs"
          >
            <span className="portfolio__link-text">
              Одностраничное приложение
            </span>
            <img
              className="portfolio__arrow"
              src={arrow}
              alt="иконка-стрелка"
            />
          </a>
        </li>
      </ul>
    </section>
  );
};