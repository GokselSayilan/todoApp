import React, { useState, useRef, useEffect } from "react";
import "./listItem.css";

//context
import { useTodo } from "../../Context/TodoContext";
import { useScreen } from "../../Context/ScreenContext";

//framer motion
import { Reorder, motion } from "framer-motion";

//icon
import { MdCheck, MdClose, MdModeEdit, MdDeleteOutline } from "react-icons/md";

const listAnimation = {
  initial: { y: 10, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.2 },
};

function ListItem({ text, checked, className, value }) {
  //context
  const { todos, setTodos } = useTodo();
  const { isDesktop } = useScreen();

  //ref
  const inputRef = useRef(null);

  //states
  const [isConfirmDisplay, setIsConfirmDisplay] = useState(false);
  const [isEditDisplay, setIsEditDisplay] = useState(false);
  const [tempTodoValue, setTempTodoValue] = useState(text);
  const [todoValue, setTodoValue] = useState(tempTodoValue);
  const [index, setIndex] = useState(null);

  useEffect(() => {
    indexFinder();
  }, [todos]);

  //find index
  const indexFinder = () => {
    todos.forEach((todo, index) => {
      if (todo.text === text) setIndex(index);
    });
  };

  //toggleCheck
  const toggleCheck = () => {
    if (!isConfirmDisplay && index !== null) {
      let tempTodos = [...todos];
      tempTodos[index].checked = !checked;
      setTodos(tempTodos);
    }
  };

  // todo edit
  const changeTodoText = (bool) => {
    if (bool && index !== null) {
      let tempTodos = [...todos];
      tempTodos[index].text = todoValue;
      setTodos(tempTodos);
      setTempTodoValue(todoValue);
      setIsConfirmDisplay(false);
    } else if (!bool) {
      setTodoValue(tempTodoValue);
      setIsConfirmDisplay(false);
    }
  };

  //removeTodo
  const removeTodo = () => {
    if (index !== null) {
      let tempTodos = [...todos];
      tempTodos.splice(index, 1);
      setTodos(tempTodos);
    }
  };

  // open edit panel and auto select
  const handleEdit = () => {
    setIsConfirmDisplay(true);
    setIsEditDisplay(false);
    if (inputRef.current) {
      inputRef.current.select();
    }
  };

  // input handle change
  const handleChange = (e) => {
    let temp = e.target.value;
    setTodoValue(temp);
  };

  //hover unhover events
  const handleMouseEnter = () => {
    if (!isConfirmDisplay) {
      setIsEditDisplay(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isConfirmDisplay) {
      setIsEditDisplay(false);
    }
  };

  return (
    <Reorder.Item
      value={value}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <motion.div
        initial={listAnimation.initial}
        animate={listAnimation.animate}
        transition={listAnimation.transition}
        className={`listItem secondaryBg ${className}`}
      >
        <div
          className={`checkBox ${checked && "checkComplate"}`}
          onClick={toggleCheck}
        >
          {checked && (
            <img
              src="assets/icon-check.svg"
              alt="checkIcon"
              className="check"
            />
          )}
        </div>
        <input
          className={`listItemInput headingM ${
            checked ? "tertiaryText textComplate" : "primaryText"
          }`}
          value={todoValue}
          onChange={handleChange}
          onClick={toggleCheck}
          ref={inputRef}
          readOnly={!isConfirmDisplay}
        />
        {!isConfirmDisplay && (isEditDisplay || !isDesktop) && (
          <div className="editPanel">
            <MdModeEdit
              className="primaryText pointerCursor"
              size={isDesktop ? 20 : 14}
              onClick={handleEdit}
            />
            <MdDeleteOutline
              className="primaryText pointerCursor"
              size={isDesktop ? 20 : 14}
              onClick={removeTodo}
            />
          </div>
        )}
        {isConfirmDisplay && !isEditDisplay && (
          <div className="confirmPanel">
            <MdClose
              className="primaryText pointerCursor"
              size={isDesktop ? 20 : 14}
              onClick={() => changeTodoText(false)}
            />
            <MdCheck
              className="primaryText pointerCursor"
              size={isDesktop ? 20 : 14}
              onClick={() => changeTodoText(true)}
            />
          </div>
        )}
      </motion.div>
    </Reorder.Item>
  );
}

export default ListItem;
