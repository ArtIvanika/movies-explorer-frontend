import React from 'react';
import './AboutMe.css';
import me from "../../images/me.jpeg";

export default function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__name" id="about">Студент</h2>
      <div className="about-me__info">
        <h3 className="about-me__title">Вероника</h3>
        <p className="about-me__subtitle">Фронтенд разработчик, 31 год</p>
        <p className="about-me__text">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.     </p>
        <a
          className="about-me__github"
          target="_blank"
          rel="noreferrer"
          href="https://github.com/ArtIvanik"
        >
          Github
        </a>
      </div>
      <img className="about-me__photo" src={me} alt="Фото студента" />
    </section>
  );
};