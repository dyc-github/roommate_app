import React from "react";

export const ThemeContext = React.createContext({
  isThemeDark: false,
  toggleTheme: () => {},
});
