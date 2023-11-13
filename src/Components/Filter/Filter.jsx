import React from "react";
import "./filter.css";

//context
import { useTodo} from "../../Context/TodoContext";
import {useScreen} from '../../Context/ScreenContext'

function Filter() {
  const {activeTodos,setTodos,selectedFilter, setSelectedFilter,remainingitems} = useTodo()
  const {isDesktop} = useScreen()
  const filterItems = ["all", "active", "completed"];

  const clearAllTodos = () => {
    setTodos(activeTodos)
  }

  return (
    <div className="filter secondaryBg">
      <p className="remainingTodo headingS secondaryText">{remainingitems} items left</p>
      <div className={`filterItems ${!isDesktop && 'secondaryBg'}`}>
        {filterItems.map((item, index) => (
          <p
            key={item + index}
            className={`filterItem boldWeight headingS secondaryText ${
              item === selectedFilter && "selected"
            }`}
            onClick={() => setSelectedFilter(item)}
          >
            {item}
          </p>
        ))}
      </div>
      <p className="filterItem headingS secondaryText" onClick={clearAllTodos}>
        Clear Complated
      </p>
    </div>
  );
}

export default Filter;
