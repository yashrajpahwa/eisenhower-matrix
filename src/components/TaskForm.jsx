import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

const TaskForm = ({ onAdd, onUpdate, editTask, initialQuadrant, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [important, setImportant] = useState(false);
  const [urgent, setUrgent] = useState(false);
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title || "");
      setDescription(editTask.description || "");
      setImportant(editTask.important || false);
      setUrgent(editTask.urgent || false);
      setDueDate(
        editTask.dueDate
          ? new Date(editTask.dueDate).toISOString().split("T")[0]
          : ""
      );
    } else if (initialQuadrant) {
      // Pre-select importance and urgency based on the quadrant that was clicked
      setImportant(initialQuadrant.important);
      setUrgent(initialQuadrant.urgent);
    }
  }, [editTask, initialQuadrant]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    const taskData = {
      title,
      description,
      important,
      urgent,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      completed: false,
    };

    if (editTask) {
      onUpdate({
        ...taskData,
        id: editTask.id,
        completed: editTask.completed || false,
      });
    } else {
      onAdd(taskData);
    }

    // Reset form
    setTitle("");
    setDescription("");
    setImportant(false);
    setUrgent(false);
    setDueDate("");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {editTask ? "Edit Task" : "Add New Task"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Task title"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Task description"
              rows="3"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="dueDate"
            >
              Due Date (optional)
            </label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <p className="block text-gray-700 text-sm font-bold mb-2">
              Eisenhower Quadrant
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="important"
                  checked={important}
                  onChange={(e) => setImportant(e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="important" className="text-gray-700">
                  Important
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="urgent"
                  checked={urgent}
                  onChange={(e) => setUrgent(e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="urgent" className="text-gray-700">
                  Urgent
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {editTask ? "Update Task" : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
