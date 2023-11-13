import { createContext, useContext, useEffect, useState } from "react";

const ScreenContext = createContext();

export const useScreen = () => useContext(ScreenContext);

export const ScreenProvider = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState(() => window.innerWidth);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Event listener'ı ekleyin
    window.addEventListener("resize", handleResize);

    // Component unmount olduğunda event listener'ı kaldırın
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth > 1000) setIsDesktop(true);
    else setIsDesktop(false);
  }, [windowWidth]);

  return (
    <ScreenContext.Provider value={{ isDesktop }}>
      {children}
    </ScreenContext.Provider>
  );
};
