import React from "react";
import "./topBar.css";

//context
import { useTheme } from "../../Context/ThemeContext";

function TopBar() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="topBar">
      <h1 className="topBarLogo headingL ">TODO</h1>
      <img
        src={`assets/icon-${theme === "light" ? "moon" : "sun"}.svg`}
        alt={theme === "light" ? "moonIcon" : "sunIcon"}
        className="topBarTheme"
        onClick={toggleTheme}
      />
    </div>
  );
}

export default TopBar;
