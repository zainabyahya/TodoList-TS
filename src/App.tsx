import React, { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import { Todo } from "./model";
import TodoList from "./components/TodoList";
const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
    console.log(todos);
  };

  console.log(todo);

  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleFocus = () => setIsInputFocused(true);
  const handleBlur = () => setIsInputFocused(false);

  return (
    <div
      className={`h-screen flex flex-col items-center ${
        isInputFocused ? "bg-blue-800" : "bg-blue-950"
      } transition-colors`}
    >
      <div className="p-10 ">
        <span className="text-4xl text-white">Taskify</span>
      </div>
      <InputField
        todo={todo}
        setTodo={setTodo}
        handleAdd={handleAdd}
        onInputFocus={handleFocus}
        onInputBlur={handleBlur}
      />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default App;
