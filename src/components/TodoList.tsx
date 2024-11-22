import React, { useState, useEffect } from "react";
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
  const [draggingId, setDraggingId] = useState<number | null>(null);

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    id: number
  ) => {
    setDraggingId(id);
    event.dataTransfer.setData("text/plain", id.toString());
  };

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    destination: "active" | "completed"
  ) => {
    event.preventDefault();

    if (draggingId === null) return;

    const sourceList = todos.some((todo) => todo.id === draggingId)
      ? "active"
      : "completed";

    if (sourceList === destination) return;

    const draggedTodo =
      sourceList === "active"
        ? todos.find((todo) => todo.id === draggingId)
        : completedTodos.find((todo) => todo.id === draggingId);

    if (!draggedTodo) return;

    if (sourceList === "active") {
      // Move from active to completed and set isDone to true
      setTodos(todos.filter((todo) => todo.id !== draggingId));
      setCompletedTodos([...completedTodos, { ...draggedTodo, isDone: true }]);
    } else {
      // Move from completed to active and set isDone to false
      setCompletedTodos(
        completedTodos.filter((todo) => todo.id !== draggingId)
      );
      setTodos([...todos, { ...draggedTodo, isDone: false }]);
    }

    setDraggingId(null);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  // Log updates
  useEffect(() => {
    console.log("🚀 ~ completedTodos:", completedTodos);
    console.log("🚀 ~ todos:", todos);
  }, [completedTodos, todos]);

  return (
    <div className="flex flex-col gap-6 md:flex-row w-full p-10">
      <div
        className="w-full md:w-1/2 bg-blue-400 p-4 rounded-md"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, "active")}
      >
        <h2 className="text-blue-950 text-lg mb-2">Active Tasks</h2>
        {todos.map((todo) => (
          <div
            key={todo.id}
            draggable
            onDragStart={(e) => handleDragStart(e, todo.id)}
          >
            <SingleTodo
              key={todo.id}
              todo={todo}
              todos={todos}
              setTodos={setTodos}
              completedTodos={completedTodos}
              setCompletedTodos={setCompletedTodos}
            />{" "}
          </div>
        ))}
      </div>
      <div
        className="w-full md:w-1/2 bg-green-400 p-4 rounded-md"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, "completed")}
      >
        <h2 className="text-blue-950 text-lg mb-2">Completed Tasks</h2>
        {completedTodos.map((todo) => (
          <div
            key={todo.id}
            draggable
            onDragStart={(e) => handleDragStart(e, todo.id)}
          >
            <SingleTodo
              key={todo.id}
              todo={todo}
              todos={todos}
              setTodos={setTodos}
              completedTodos={completedTodos}
              setCompletedTodos={setCompletedTodos}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
