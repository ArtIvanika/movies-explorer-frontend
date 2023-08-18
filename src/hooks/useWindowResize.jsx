import { useState, useEffect } from "react";

export function useWindowResize() {

// const getInitialCount = (width) => {
//   if (width > 1175) {
//     return 16;
//   } else if (1176 > width && width > 820) {
//     return 12;
//   } else if (821 > width && width > 500) {
//     return 8;
//   } else {
//     return 5;
//   }
// };
// const getLoadStep = (width) => {
//   if (width > 1175) {
//     return 4;
//   } else if (1176 > width && width > 820) {
//     return 3;
//   } else if (821 > width && width > 500) {
//     return 2;
//   } else {
//     return 2;
//   }
// };

  const [width, setWidth] = useState(window.innerWidth); //стэйт ширины экрана
//   const [visibleFilmsCount, setVisibleFilmsFilmsCount] = useState(getInitialCount(width)); //сколько сейчас отображается фильмов
//   const [isLoading, setIsLoading] = useState(false); //стэйт прелоадера

  useEffect(() => {
    let timeoutId = null;

    const resizeListener = () => {
      setWidth(window.innerWidth)
      // clearTimeout(timeoutId);
      // timeoutId = setTimeout(() => setWidth(window.innerWidth), 150);
    };

    window.addEventListener("resize", resizeListener);
    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  // const addMovies = () => {
  //   setIsLoading(true);
  //   setTimeout(() => {
  //     setVisibleFilmsFilmsCount((prevCount) => prevCount + getLoadStep(width));
  //     setIsLoading(false);
  //   }, 600);
  // };
  // return {visibleFilmsCount, isLoading, addMovies, width}
  return width
}
