import React from "react";
import "./todo.css";

//components
import TodoBox from "../TodoBox/TodoBox";

//context
import { useTheme } from "../../Context/ThemeContext";

function Todo() {
  const { theme } = useTheme();
  return (
    <div className={`todo ${theme} primaryBg`}>
      <header className="header">
        <img
          src={`assets/bg-desktop-${theme}.jpg`}
          className="headerBg"
          alt="headerBackground"
        />
      </header>
      <TodoBox />
    </div>
  );
}

export default Todo;
