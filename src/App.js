import Todo from "./Components/Todo/Todo";
//context
import { TodoProvider } from "./Context/TodoContext";
import { ThemeProvider } from "./Context/ThemeContext";
import { ScreenProvider } from "./Context/ScreenContext";

function App() {
  return (
    <ScreenProvider>
      <TodoProvider>
        <ThemeProvider>
          <Todo />
        </ThemeProvider>
      </TodoProvider>
    </ScreenProvider>
  );
}

export default App;
