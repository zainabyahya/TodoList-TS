import React from "react";
import { Todo } from "../model";
import SingleTodo from "./SingleTodo";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const TodoList = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}: Props) => {
  return (
    <div className="p-10 w-full h-screen flex flex-col items-center justify-start md:flex-row md:justify-center md:items-start gap-10">
      <div className="p-3 w-full md:w-1/2 bg-blue-400 rounded-md">
        <span className="px-2 text-white text-xl">Active Tasks</span>
        {todos.map((todo) => (
          <SingleTodo
            todo={todo}
            todos={todos}
            key={todo.id}
            setTodos={setTodos}
          />
        ))}
      </div>
      <div className="p-3 w-full md:w-1/2 bg-blue-400 rounded-md min-h-1/2">
        <span className="px-2 text-white text-xl">Completed Tasks</span>
      </div>
    </div>
  );
};

export default TodoList;
