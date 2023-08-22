import { useState, useEffect } from "react";

export function useWindowResize() {

  const [width, setWidth] = useState(window.innerWidth); //стэйт ширины экрана

  useEffect(() => {
    const resizeListener = () => {
      setWidth(window.innerWidth)
    };

    window.addEventListener("resize", resizeListener);
    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  return width
}
