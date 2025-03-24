import React from "react";
import { FaTrash, FaEdit, FaCheck } from "react-icons/fa";

const Task = ({ task, onDelete, onEdit, onToggle }) => {
  const toggleComplete = (e) => {
    e.stopPropagation();
    console.log("Task clicked to toggle:", task.id); // Debug log
    onToggle(task.id);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(task);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(task.id);
  };

  // Determine due date styling
  const isDueSoon =
    task.dueDate && new Date(task.dueDate) - new Date() < 86400000; // 24 hours
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();

  return (
    <div
      onClick={toggleComplete}
      className={`p-3 bg-white rounded-lg shadow-sm flex justify-between items-start 
      ${task.completed ? "opacity-70 bg-gray-50" : ""} 
      group hover:shadow-md transition-all transform hover:-translate-y-0.5 mb-2 border border-gray-100`}
    >
      <div className="flex-1 flex items-start">
        <button
          onClick={toggleComplete}
          className={`flex-shrink-0 cursor-pointer mt-1 w-5 h-5 rounded-full border flex items-center justify-center transition-colors
          ${
            task.completed
              ? "bg-green-500 border-green-500"
              : "border-gray-400 hover:border-green-400 group-hover:border-green-400"
          }`}
        >
          <FaCheck
            size={10}
            className={`text-white ${
              task.completed
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-50"
            }`}
          />
        </button>
        <div className="ml-3 flex-1">
          <h3
            className={`font-medium leading-tight mb-0.5 ${
              task.completed ? "line-through text-gray-500" : "text-gray-800"
            }`}
          >
            {task.title}
          </h3>
          {task.description && (
            <p className="text-sm text-gray-600 mb-1">{task.description}</p>
          )}
          {task.dueDate && (
            <p
              className={`text-xs inline-block px-2 py-0.5 rounded-full ${
                isOverdue
                  ? "bg-red-100 text-red-800"
                  : isDueSoon
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
      <div className="flex-shrink-0 flex space-x-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleEdit}
          className="p-1.5 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100"
          title="Edit task"
        >
          <FaEdit size={14} />
        </button>
        <button
          onClick={handleDelete}
          className="p-1.5 rounded-full bg-red-50 text-red-600 hover:bg-red-100"
          title="Delete task"
        >
          <FaTrash size={14} />
        </button>
      </div>
    </div>
  );
};

export default Task;
