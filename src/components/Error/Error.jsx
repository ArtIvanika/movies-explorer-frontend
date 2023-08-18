import React from "react";
import { useNavigate } from "react-router-dom";
import "./Error.css";

export default function Error() {
  const navigate = useNavigate();
  return (
    <section className="error">
      <h2 className="error__number">404</h2>
      <p className="error__name">Страница не найдена</p>
      <button
        className="error__back"
        onClick={() => navigate(-1, { replace: false })}
        type="button"
      >
        Назад
      </button>
    </section>
  );
}
