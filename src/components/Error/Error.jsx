import React from 'react';
import { Link } from "react-router-dom";
import "./Error.css"

export default function Error() {
  return (
    <section className="error">
        <h2 className="error__number">404</h2>
        <p className="error__name">Страница не найдена</p>
        <Link to="/">
            <button className="error__back" type="button">Назад</button>
        </Link>
    </section>
  );
}