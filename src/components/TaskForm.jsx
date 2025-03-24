import React, { useState, useEffect, useRef } from "react";
import {
  FaTimes,
  FaCalendarAlt,
  FaExclamationCircle,
  FaClock,
} from "react-icons/fa";

const TaskForm = ({ onAdd, onUpdate, editTask, initialQuadrant, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [important, setImportant] = useState(false);
  const [urgent, setUrgent] = useState(false);
  const [dueDate, setDueDate] = useState("");
  const titleInputRef = useRef(null);

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

  // Focus the title input when form opens
  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, []);

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

  // Handle escape key to close form
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl border border-gray-200">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-gray-800">
            {editTask ? "Edit Task" : "Add New Task"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-full p-1.5 transition-colors"
            title="Close"
          >
            <FaTimes size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              ref={titleInputRef}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="shadow-sm border border-gray-300 rounded-lg w-full py-2.5 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="What needs to be done?"
              required
            />
          </div>

          <div>
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="description"
            >
              Description (optional)
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="shadow-sm border border-gray-300 rounded-lg w-full py-2.5 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Add more details about this task..."
              rows="3"
            />
          </div>

          <div>
            <label
              className="block text-gray-700 text-sm font-semibold mb-2 flex items-center"
              htmlFor="dueDate"
            >
              <FaCalendarAlt className="mr-2 text-blue-500" size={14} />
              Due Date (optional)
            </label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="shadow-sm border border-gray-300 rounded-lg w-full py-2.5 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
            <p className="block text-gray-700 text-sm font-semibold mb-3 flex items-center">
              <FaExclamationCircle className="mr-2 text-yellow-500" size={14} />
              Task Priority (Eisenhower Quadrant)
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center p-2 bg-white rounded-lg border border-gray-200">
                <input
                  type="checkbox"
                  id="important"
                  checked={important}
                  onChange={(e) => setImportant(e.target.checked)}
                  className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
                />
                <label htmlFor="important" className="text-gray-700 text-sm">
                  Important
                </label>
              </div>
              <div className="flex items-center p-2 bg-white rounded-lg border border-gray-200">
                <input
                  type="checkbox"
                  id="urgent"
                  checked={urgent}
                  onChange={(e) => setUrgent(e.target.checked)}
                  className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
                />
                <label
                  htmlFor="urgent"
                  className="text-gray-700 text-sm flex items-center"
                >
                  <FaClock className="mr-1 text-red-500" size={12} />
                  Urgent
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-white border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg mr-2 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-2 px-5 rounded-lg transition-all shadow-sm hover:shadow"
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
