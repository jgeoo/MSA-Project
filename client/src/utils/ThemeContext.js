import React, { createContext, useState, useContext } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  const theme = {
    isDarkTheme,
    toggleTheme,
    themeStyles: isDarkTheme ? darkThemeStyles : lightThemeStyles,
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

const lightThemeStyles = {
  backgroundColor: "#F3F3E0",
  textColor: "#333",
  switchTrackColor: { false: "#767577", true: "#4a6eac" },
};

const darkThemeStyles = {
  backgroundColor: "#333",
  textColor: "#FFF",
  switchTrackColor: { false: "#767577", true: "#FFD700" },
};
