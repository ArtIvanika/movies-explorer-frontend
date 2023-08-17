import React, { useEffect } from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";

export default function MoviesCard({ movie, deleteCard, savedMovies, saveCard }) {
  const { pathname } = useLocation();

  // const inSavedList = savedMovies?.find((c) => c._id === movie._id);
   const inSavedList = savedMovies?.find((c) => c.movieId === movie.id);
  //  let la 

function handleSaveCard(){
  const newMovies ={
    country: movie.country,
    director: movie.director,
    duration: movie.duration,
    year: movie.year,
    description: movie.description,
    image: movie.image,
    trailerLink: movie.trailerLink,
    thumbnail: movie.thumbnail,
    movieId: movie.movieId,
    nameRU: movie.nameRU,
    nameEN: movie.nameEN,
    owner: movie.owner,
    // saved: true,
  }
  // la = newMovies.saved
  saveCard(newMovies)
}

// useEffect(()=>{
//   const inSavedList = savedMovies?.some((c) => c.movieId === movie.id);
//   // if(inSavedList){

//   // }
// })

  function updateFavourite(event) {
    const likeButton = event.target;
    if (likeButton.classList.contains("card__btn-save-like_active")) {
      likeButton.classList.remove("card__btn-save-like_active");
      deleteCard(inSavedList);
    } else {
      handleSaveCard(movie);
      likeButton.classList.add("card__btn-save-like_active");
    }
  }

  function handleDeleteButton() {
    deleteCard(movie);
  }
  function getTimeFromMins() {
    let hours = Math.trunc(movie.duration/60);
	let minutes = movie.duration % 60;
  if(hours<1){
    return minutes + 'м'
  }else{
    return hours + 'ч ' + minutes + 'м';
  }
};

  return (
    <div className="card">
      <a href={movie.trailerLink} target="blank">
      <img
        className="card__photo"
        src={movie.image}
        alt={`Заставка фильма ${movie.nameRU}`}
      />
      </a>

      <div className="card__box">
        <p className="card__name">
           {movie.nameRU}
          </p>
        {pathname === "/movies" 
        ? (<button onClick={updateFavourite} className={`card__btn-save-like ${inSavedList  ? 'card__btn-save-like_active' : ''}`} type='button'></button>) 
        : (<button onClick={handleDeleteButton} className='card__btn-save-close' type='button'></button>)
                }
      </div>
      <p className="card__time">
        {getTimeFromMins()}
        </p>
    </div>
  );
}
