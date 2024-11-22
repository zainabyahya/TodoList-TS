import React, { useEffect, useRef } from "react";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
  onInputFocus: () => void;
  onInputBlur: () => void;
}

const InputField = ({
  todo,
  setTodo,
  handleAdd,
  onInputFocus,
  onInputBlur,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  return (
    <form
      className="w-full flex justify-center gap-1 px-10"
      onSubmit={(e) => {
        handleAdd(e);
      }}
    >
      <input
        ref={inputRef}
        type="input"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        onFocus={onInputFocus}
        onBlur={onInputBlur}
        placeholder="Enter a task"
        className=" border-white border-[1px] rounded-md px-1 outline-none w-full md:w-1/3"
      />
      <button
        type="submit"
        className=" bg-white text-blue-950 font-bold rounded-md hover:bg-blue-200 px-5"
      >
        Go
      </button>
    </form>
  );
};

export default InputField;
