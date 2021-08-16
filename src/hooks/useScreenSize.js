import { useState, useEffect, useCallback } from "react";

const BREAK_POINTS = {
  phoneWidth: 600,
  tabletWidth: 768,
  smallDesktopWidth: 992,
  largeDesktopWidth: 1280,
};
const useScreenSize = () => {
  const isClient = typeof window === "object";

  const getSize = useCallback(() => {
    return {
      width: isClient ? window.innerWidth : 0,
      height: isClient ? window.innerHeight : 0,
    };
  }, [isClient]);

  const [screenSize, setScreenSize] = useState(getSize);

  const [screenType, setScreenType] = useState({
    smallDesktop: false,
    tablet: false,
    phone: false,
  });
  useEffect(() => {
    if (!isClient) {
      return;
    }

    function handleResize() {
      setScreenSize(getSize());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getSize, isClient]);
  useEffect(() => {
    if (screenSize.width <= BREAK_POINTS.phoneWidth) {
      setScreenType({
        smallDesktop: false,
        tablet: false,
        phone: true,
      });
    } else if (screenSize.width <= BREAK_POINTS.smallDesktopWidth) {
      setScreenType({
        smallDesktop: false,
        tablet: true,
        phone: false,
      });
    } else if (screenSize.width <= BREAK_POINTS.largeDesktopWidth) {
      setScreenType({
        smallDesktop: true,
        tablet: false,
        phone: false,
      });
    } else {
      setScreenType({
        smallDesktop: false,
        tablet: false,
        phone: false,
      });
    }
  }, [screenSize]);

  return [screenType, screenSize];
};

export default useScreenSize;
