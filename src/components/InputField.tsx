import React from "react";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const InputField = ({ todo, setTodo, handleAdd }: Props) => {
  return (
    <form className="" onSubmit={handleAdd}>
      <input
        type="input"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Enter a task"
        className="p-1 rounded-md focus:shadow-2xl focus:border-white"
      />
      <button
        type="submit"
        className="w-12 m-1 p-1 bg-white text-blue-950 rounded-md hover:bg-blue-200"
      >
        Go
      </button>
    </form>
  );
};

export default InputField;
