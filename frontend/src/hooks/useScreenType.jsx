import { useState, useEffect } from 'react';

// Custom hook to get window size
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // Function to update window size
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Attach resize event listener
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array to run the effect once when component mounts

  return windowSize;
};

// Hook to determine screen type based on window size
const useScreenType = () => {
  const { width } = useWindowSize(); // Get window width in real-time

  // Determine screen type based on width
  const isMobile = width <= 576;
  const isTablet = width > 576 && width <= 1024;
  const isDesktop = width > 1024;

  return { isMobile, isTablet, isDesktop };
};

export default useScreenType;
