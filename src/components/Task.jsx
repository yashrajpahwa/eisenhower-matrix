import React, { useState } from "react";
import { FaTrash, FaEdit, FaCheck } from "react-icons/fa";

const Task = ({ task, onDelete, onEdit }) => {
  const [completed, setCompleted] = useState(task.completed || false);

  const toggleComplete = () => {
    setCompleted(!completed);
    // Here you could also update the task in the parent component if needed
  };

  return (
    <div
      className={`p-3 bg-white rounded shadow-sm flex justify-between items-start ${
        completed ? "opacity-60" : ""
      } group`}
      onClick={toggleComplete}
    >
      <div className="flex-1 ">
        <div className="flex items-start ">
          <button
            onClick={toggleComplete}
            className={`cursor-pointer mt-1 w-5 h-5 rounded-full border flex items-center justify-center ${
              completed
                ? "bg-green-500  border-green-500"
                : "border-gray-400 hover:bg-green-50 "
            }`}
            s
          >
            {/* {completed && <FaCheck size={10} className="text-white" />} */}
            <FaCheck
              size={10}
              className={`${
                completed ? `flex text-white` : `group-hover:flex hidden`
              }`}
            />
          </button>
          <div className="ml-2">
            <h3
              className={`font-medium ${
                completed ? "line-through text-gray-500" : "text-gray-800"
              }`}
            >
              {task.title}
            </h3>
            <p className="text-sm text-gray-600">{task.description}</p>
            {task.dueDate && (
              <p className="text-xs text-gray-500 mt-1">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="group-hover:flex space-x-2 ml-2 hidden ">
        <button
          onClick={() => onEdit(task)}
          className="text-blue-500 hover:text-blue-700"
        >
          <FaEdit size={16} />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-red-500 hover:text-red-700"
        >
          <FaTrash size={16} />
        </button>
      </div>
    </div>
  );
};

export default Task;
