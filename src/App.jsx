import React, { useState, useEffect } from "react";
import { FaPlus, FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import Task from "./components/Task";
import TaskForm from "./components/TaskForm";

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("eisenhowerTasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [showForm, setShowForm] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [view, setView] = useState("matrix"); // "matrix" or "list"
  const [initialQuadrant, setInitialQuadrant] = useState(null);

  useEffect(() => {
    localStorage.setItem("eisenhowerTasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now() }]);
    setShowForm(false);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTask = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setEditTask(null);
    setShowForm(false);
  };

  const handleEditClick = (task) => {
    setEditTask(task);
    setShowForm(true);
  };

  const handleShowForm = (isImportant = false, isUrgent = false) => {
    setInitialQuadrant({ important: isImportant, urgent: isUrgent });
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditTask(null);
    setInitialQuadrant(null);
  };

  const getQuadrantTasks = (important, urgent) => {
    return tasks.filter(
      (task) => task.important === important && task.urgent === urgent
    );
  };

  const EmptyQuadrant = ({ message, isImportant, isUrgent }) => (
    <div
      className="bg-white bg-opacity-50 p-3 rounded border border-dashed border-gray-300 text-gray-500 text-center text-sm cursor-pointer hover:bg-opacity-70 hover:border-gray-400 transition-all"
      onClick={() => handleShowForm(isImportant, isUrgent)}
    >
      <div className="flex items-center justify-center gap-2">
        <FaPlus size={12} />
        <span>{message || "No tasks yet"}</span>
      </div>
    </div>
  );

  const renderQuadrantContent = (
    quadrantTasks,
    emptyMessage,
    isImportant,
    isUrgent
  ) => {
    if (quadrantTasks.length === 0) {
      return (
        <EmptyQuadrant
          message={emptyMessage}
          isImportant={isImportant}
          isUrgent={isUrgent}
        />
      );
    }

    return (
      <div className="space-y-2">
        {quadrantTasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onDelete={deleteTask}
            onEdit={handleEditClick}
          />
        ))}
      </div>
    );
  };

  const QuadrantHeader = ({ title, color, isImportant, isUrgent }) => (
    <div className="flex justify-between items-center mb-2">
      <h2 className={`font-bold text-lg ${color}`}>{title}</h2>
      <button
        onClick={() => handleShowForm(isImportant, isUrgent)}
        className="bg-white text-blue-500 hover:bg-blue-50 p-1 rounded"
        title={`Add task to ${title}`}
      >
        <FaPlus size={16} />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Eisenhower Matrix
        </h1>
        <div className="flex justify-center mt-2 space-x-4">
          <button
            className={`px-3 py-1 rounded ${
              view === "matrix" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setView("matrix")}
          >
            Matrix View
          </button>
          <button
            className={`px-3 py-1 rounded ${
              view === "list" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setView("list")}
          >
            List View
          </button>
        </div>
      </header>

      {view === "matrix" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 container mx-auto">
          {/* Quadrant 1: Important & Urgent */}
          <div className="bg-red-100 p-4 rounded-lg shadow min-h-[200px]">
            <QuadrantHeader
              title="Do First (Important & Urgent)"
              color="text-red-700"
              isImportant={true}
              isUrgent={true}
            />
            {renderQuadrantContent(
              getQuadrantTasks(true, true),
              "Add urgent and important tasks here",
              true,
              true
            )}
          </div>

          {/* Quadrant 2: Important & Not Urgent */}
          <div className="bg-blue-100 p-4 rounded-lg shadow min-h-[200px]">
            <QuadrantHeader
              title="Schedule (Important & Not Urgent)"
              color="text-blue-700"
              isImportant={true}
              isUrgent={false}
            />
            {renderQuadrantContent(
              getQuadrantTasks(true, false),
              "Add important but non-urgent tasks here",
              true,
              false
            )}
          </div>

          {/* Quadrant 3: Not Important & Urgent */}
          <div className="bg-yellow-100 p-4 rounded-lg shadow min-h-[200px]">
            <QuadrantHeader
              title="Delegate (Not Important & Urgent)"
              color="text-yellow-700"
              isImportant={false}
              isUrgent={true}
            />
            {renderQuadrantContent(
              getQuadrantTasks(false, true),
              "Add urgent but less important tasks here",
              false,
              true
            )}
          </div>

          {/* Quadrant 4: Not Important & Not Urgent */}
          <div className="bg-green-100 p-4 rounded-lg shadow min-h-[200px]">
            <QuadrantHeader
              title="Eliminate (Not Important & Not Urgent)"
              color="text-green-700"
              isImportant={false}
              isUrgent={false}
            />
            {renderQuadrantContent(
              getQuadrantTasks(false, false),
              "Add low priority tasks here",
              false,
              false
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-4 container mx-auto">
          <div className="bg-red-100 p-4 rounded-lg shadow min-h-[100px]">
            <QuadrantHeader
              title="Do First (Important & Urgent)"
              color="text-red-700"
              isImportant={true}
              isUrgent={true}
            />
            {renderQuadrantContent(
              getQuadrantTasks(true, true),
              "Add urgent and important tasks here",
              true,
              true
            )}
          </div>

          <div className="bg-blue-100 p-4 rounded-lg shadow min-h-[100px]">
            <QuadrantHeader
              title="Schedule (Important & Not Urgent)"
              color="text-blue-700"
              isImportant={true}
              isUrgent={false}
            />
            {renderQuadrantContent(
              getQuadrantTasks(true, false),
              "Add important but non-urgent tasks here",
              true,
              false
            )}
          </div>

          <div className="bg-yellow-100 p-4 rounded-lg shadow min-h-[100px]">
            <QuadrantHeader
              title="Delegate (Not Important & Urgent)"
              color="text-yellow-700"
              isImportant={false}
              isUrgent={true}
            />
            {renderQuadrantContent(
              getQuadrantTasks(false, true),
              "Add urgent but less important tasks here",
              false,
              true
            )}
          </div>

          <div className="bg-green-100 p-4 rounded-lg shadow min-h-[100px]">
            <QuadrantHeader
              title="Eliminate (Not Important & Not Urgent)"
              color="text-green-700"
              isImportant={false}
              isUrgent={false}
            />
            {renderQuadrantContent(
              getQuadrantTasks(false, false),
              "Add low priority tasks here",
              false,
              false
            )}
          </div>
        </div>
      )}

      <button
        onClick={() => handleShowForm()}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition"
      >
        <FaPlus size={20} />
      </button>

      {showForm && (
        <TaskForm
          onAdd={addTask}
          onUpdate={updateTask}
          editTask={editTask}
          initialQuadrant={initialQuadrant}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default App;
