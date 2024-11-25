import { useState, useEffect } from "react";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to check if the device or window width is mobile
    const checkIsMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;

      // Check for mobile devices via userAgent or based on window width
      if (
        /android|iPad|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          userAgent
        ) ||
        window.innerWidth <= 768
      ) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    // Initially check if mobile
    checkIsMobile();

    // Add an event listener to handle changes on browser resize
    window.addEventListener("resize", checkIsMobile);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []); // Empty dependency array to ensure the effect runs once

  return isMobile;
}