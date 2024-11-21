import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../model";
import { MdDelete, MdDone, MdEdit } from "react-icons/md";

interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo = ({ todo, todos, setTodos }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              isDone: !todo.isDone,
            }
          : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  useEffect(() => {
    if (edit) {
      inputRef.current?.focus();
    }
  }, [edit]);

  return (
    <form
      onSubmit={(e) => handleEdit(e, todo.id)}
      className={`flex justify-center items-center gap-5 ${
        isFocused ? "bg-yellow-300" : "bg-yellow-400"
      } px-4 py-2 rounded-md m-1 transition-colors`}
    >
      {edit ? (
        <input
          ref={inputRef}
          value={editTodo}
          onChange={(e) => {
            setEditTodo(e.target.value);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="bg-yellow-400 border-white border-[1px] rounded-md px-1 outline-none focus:bg-yellow-200"
        />
      ) : todo.isDone ? (
        <s className="">{todo.todo}</s>
      ) : (
        <span>{todo.todo}</span>
      )}

      <div className="flex">
        {edit ? (
          <span onClick={(e) => handleEdit(e, todo.id)}>
            <MdDone />
          </span>
        ) : (
          !todo.isDone && (
            <span
              onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              <MdEdit />
            </span>
          )
        )}
        {!edit && (
          <>
            <span onClick={() => handleDelete(todo.id)}>
              <MdDelete />
            </span>
            <span onClick={() => handleDone(todo.id)}>
              <MdDone />
            </span>
          </>
        )}
      </div>
    </form>
  );
};

export default SingleTodo;
