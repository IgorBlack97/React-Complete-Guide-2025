import { useRef } from "react";

export default function Tasks({ tasks, onAddTask, onDelete }) {
  const inputRef = useRef();

  let content = (
    <p className="text-stone-800 my-4">
      This project does not have any tasks yet.
    </p>
  );

  if (tasks.length) {
    content = (
      <ul className="p-4 mt-8 rounded-md bg-stone-100">
        {tasks.map((task, key) => (
          <li className="flex justify-between my-4" key={key}>
            <span>{task}</span>
            <button
              className="text-stone-700 hover:text-red-500"
              onClick={() => {
                onDelete(key);
              }}
            >
              Clear
            </button>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>

      <div className="flex items-center gap-4">
        <input
          type="text"
          ref={inputRef}
          className="w-64 px-2 py-1 rounded-sm bg-stone-200"
        />
        <button
          className="text-stone-700 hover:text-stone-950"
          onClick={() => {
            onAddTask(inputRef.current.value);
            inputRef.current.value = "";
          }}
        >
          Add Task
        </button>
      </div>

      {content}
    </section>
  );
}
