import { createContext, useContext, useEffect, useState } from "react";

const TodoContext = createContext();

export const useTodo = () => useContext(TodoContext);

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [remainingitems, setRemainingItems] = useState();
  const [activeTodos, setActiveTodos] = useState();
  const [completedTodos, setCompletedTodos] = useState();
  const [renderedTodos, setRenderedTodos] = useState(todos);

  useEffect(() => {
    // Local Storage'dan todos verisini çekme
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    const activeTodos = todos.filter((todo) => !todo.checked);
    const completedTodos = todos.filter((todo) => todo.checked);
    const remainingItemsLength = activeTodos.length;

    // Öncelikli işlemler
    setRemainingItems(remainingItemsLength);
    setActiveTodos(activeTodos);
    setCompletedTodos(completedTodos);

    //localstorage
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos, selectedFilter]);

  useEffect(() => {
    // yukarıdaki set işlemleri tamamlandıktan sonra bu blok çalışır
    if (selectedFilter === "all") setRenderedTodos(todos);
    if (selectedFilter === "active") setRenderedTodos(activeTodos);
    if (selectedFilter === "completed") setRenderedTodos(completedTodos);
  }, [todos, activeTodos, completedTodos, selectedFilter]);


  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        selectedFilter,
        setSelectedFilter,
        remainingitems,
        renderedTodos,
        setRenderedTodos,
        activeTodos
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
