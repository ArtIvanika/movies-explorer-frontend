import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader'
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Movies = () => {

  return (
    <>
       <Header/> 
        <main>
          <SearchForm /> 
          {/* <Preloader/>  */}
          <MoviesCardList />
        </main>
       <Footer />
    </>
  );
};

export default Movies;