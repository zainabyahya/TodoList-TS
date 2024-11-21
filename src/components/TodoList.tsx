import React from "react";
import { Todo } from "../model";
import SingleTodo from "./SingleTodo";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const TodoList = ({ todos, setTodos }: Props) => {
  return (
    <div className="flex flex-wrap gap-5 w-full justify-center">
      {todos.map((todo) => (
        <li className="list-none">
          <SingleTodo
            todo={todo}
            key={todo.id}
            todos={todos}
            setTodos={setTodos}
          />
        </li>
      ))}
    </div>
  );
};

export default TodoList;
