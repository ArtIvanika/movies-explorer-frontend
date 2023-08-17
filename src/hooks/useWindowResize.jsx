import { useState, useEffect } from "react";
// import {
//     RESIZE_TIMEOUT,
//     WIDTH_500,
//     WIDTH_820,
//     WIDTH_1280,
//     CARDS_IN_ROW_RES_320_725,
//     MORE_CARDS_RES_320_725,
//     CARDS_IN_ROW_RES_725_990,
//     MORE_CARDS_RES_725_990,
//     CARDS_IN_ROW_RES_990_1280,
//     MORE_CARDS_RES_990_1280,
//     CARDS_IN_ROW_RES_MORE_1280,
//     MORE_CARDS_RES_MORE_1280,
// } from '../utils/constants'

// export function useWindowResize() {
//     const [cardsPerRow, setCardsPerRow] = useState(0);
//     const [loadMoreCount, setLoadMoreCount] = useState(0);
//     const [windowWidth, setWindowWidth] = useState(window.innerWidth);
//     const [displayedMovies, setDisplayedMovies] = useState(0)

//     useEffect(() => {
//         const handleResize = () => {
//             setTimeout(() => {
//                 setWindowWidth(window.innerWidth);
//                 setDisplayedMovies(cardsPerRow)
//             }, { RESIZE_TIMEOUT })
//         };
//         window.addEventListener('resize', handleResize);
//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, [windowWidth, cardsPerRow]);

//     useEffect(() => {
//         if (windowWidth < WIDTH_500) {
//             setCardsPerRow(CARDS_IN_ROW_RES_320_725);
//             setLoadMoreCount(MORE_CARDS_RES_320_725);
//         } else if (windowWidth < WIDTH_820) {
//             setCardsPerRow(CARDS_IN_ROW_RES_725_990);
//             setLoadMoreCount(MORE_CARDS_RES_725_990);
//         } else if (windowWidth < WIDTH_1280) {
//             setCardsPerRow(CARDS_IN_ROW_RES_990_1280);
//             setLoadMoreCount(MORE_CARDS_RES_990_1280);
//         } else {
//             setCardsPerRow(CARDS_IN_ROW_RES_MORE_1280);
//             setLoadMoreCount(MORE_CARDS_RES_MORE_1280);
//         }
//     }, [windowWidth]);

//     return { displayedMovies, setDisplayedMovies, cardsPerRow, loadMoreCount };
// }

//console.log('width:', width);
export function useWindowResize() {

const getInitialCount = (width) => {
  if (width > 1175) {
    return 16;
  } else if (1176 > width && width > 820) {
    return 12;
  } else if (821 > width && width > 500) {
    return 8;
  } else {
    return 5;
  }
};
const getLoadStep = (width) => {
  if (width > 1175) {
    return 4;
  } else if (1176 > width && width > 820) {
    return 3;
  } else if (821 > width && width > 500) {
    return 2;
  } else {
    return 2;
  }
};

  const [width, setWidth] = useState(window.innerWidth); //стэйт ширины экрана
  const [visibleFilmsCount, setVisibleFilmsFilmsCount] = useState(getInitialCount(width)); //сколько сейчас отображается фильмов
  const [isLoading, setIsLoading] = useState(false); //стэйт прелоадера

  useEffect(() => {
    let timeoutId = null;

    const resizeListener = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setWidth(window.innerWidth), 150);
    };

    window.addEventListener("resize", resizeListener);
    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  const addMovies = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleFilmsFilmsCount((prevCount) => prevCount + getLoadStep(width));
      setIsLoading(false);
    }, 600);
  };
  return {visibleFilmsCount, isLoading, addMovies}
}
