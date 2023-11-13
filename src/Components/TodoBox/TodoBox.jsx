import React, { useState } from "react";
import "./todoBox.css";

//components
import TopBar from "../TopBar/TopBar";
import ListItem from "../ListItem/ListItem";
import Filter from "../Filter/Filter";

//context
import { useTodo } from "../../Context/TodoContext";
import { useTheme } from "../../Context/ThemeContext";
import { useScreen } from "../../Context/ScreenContext";

//framer-motion
import { Reorder } from "framer-motion";

//icons
import { MdCheck, MdClose } from "react-icons/md";

function TodoBox() {
  const { todos, setTodos, renderedTodos, setRenderedTodos } = useTodo();
  const { theme } = useTheme();
  const {isDesktop} = useScreen()

  const [newTodoValue, setNewTodoValue] = useState("Create a new todo…");
  const [displayConfirmPanel, setDisplayConfirmPanel] = useState(false);

  const handleChange = (e) => {
    let temp = e.target.value;
    setNewTodoValue(temp);
    setDisplayConfirmPanel(true);
  };

  const createNewTodo = (bool) => {
    let isFound = todos.filter((todo) => todo.text === newTodoValue);
    if (bool && isFound.length === 0 && newTodoValue !== "") {
      let tempTodos = [...todos];
      tempTodos.push({ text: newTodoValue, check: false });
      setTodos(tempTodos);
      setDisplayConfirmPanel(false);
      setNewTodoValue("Create a new todo…");
    } else if (!bool) {
      setDisplayConfirmPanel(false);
      setNewTodoValue("Create a new todo…");
    }
  };

  const handleEnterKeyPress = (e) => {
    if(e.key==='Enter') {
      createNewTodo(true)
    }
  }

  return (
    <div className="todoBox primaryBoxShadow">
      <TopBar />
      <div
        className={`createNewTodo ${
          theme === "light" && "createNewTodoShadow"
        } secondaryBg`}
      >
        <input
          type="text"
          className="createNewTodoInput primaryText headingM"
          value={newTodoValue}
          onChange={handleChange}
          onKeyDown={handleEnterKeyPress}
        />
        {displayConfirmPanel && (
          <div className="createNewTodoConfirmPanel primaryText">
            <MdClose size={isDesktop ? 20 : 14} onClick={() => createNewTodo(false)} />
            <MdCheck size={isDesktop ? 20 : 14} onClick={() => createNewTodo(true)} />
          </div>
        )}
      </div>
      <div className="todos">
        <Reorder.Group
          axis="y"
          onReorder={setRenderedTodos}
          values={renderedTodos}
        >
          {renderedTodos &&
            renderedTodos.map((todo) => (
              <ListItem
                key={todo.text}
                text={todo.text}
                checked={todo.checked}
                className="primaryBorder"
                value={todo}
              />
            ))}
        </Reorder.Group>
      </div>
      <Filter />
      <p className="dragText headingS secondaryText">
        Drag and drop to reorder list
      </p>
    </div>
  );
}

export default TodoBox;
