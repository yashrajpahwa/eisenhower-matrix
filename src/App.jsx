import React, { useState, useEffect } from "react";
import { FaPlus, FaTrash, FaEdit, FaCheck, FaKeyboard } from "react-icons/fa";
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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "n") {
        e.preventDefault();
        handleShowForm();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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

  // NEW: Function to toggle task completion and persist the change
  const toggleTaskCompletion = (id) => {
    console.log("Toggling task with id:", id); // Debug log
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
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
      className="bg-white bg-opacity-50 p-4 rounded-lg border-2 border-dashed border-gray-300 text-gray-500 text-center hover:bg-opacity-80 hover:border-gray-400 transition-all flex flex-col items-center justify-center h-full min-h-[120px] cursor-pointer"
      onClick={() => handleShowForm(isImportant, isUrgent)}
    >
      <div className="flex items-center justify-center gap-2 mb-1">
        <FaPlus className="text-blue-500" />
        <span className="font-medium">{message || "No tasks yet"}</span>
      </div>
      <p className="text-xs text-gray-400">Click to add a task</p>
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
            onToggle={toggleTaskCompletion} // NEW: pass toggle handler
          />
        ))}
      </div>
    );
  };

  const QuadrantHeader = ({ title, color, isImportant, isUrgent }) => (
    <div className="flex justify-between items-center mb-3 pb-2 border-b border-opacity-20 border-gray-600">
      <h2 className={`font-bold text-lg ${color}`}>{title}</h2>
      <button
        onClick={() => handleShowForm(isImportant, isUrgent)}
        className="bg-white bg-opacity-70 text-blue-500 hover:bg-blue-50 p-1.5 rounded-full shadow-sm"
        title={`Add task to ${title}`}
        aria-label={`Add task to ${title}`}
      >
        <FaPlus size={14} />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-4 pb-20">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Eisenhower Matrix
        </h1>
        <p className="text-center text-gray-600 mb-4 text-sm">
          Organize tasks by importance and urgency{" "}
          <span className="inline-flex items-center bg-gray-100 px-2 py-1 rounded ml-1 text-xs">
            <FaKeyboard className="mr-1" size={12} />
            Ctrl+N to add task
          </span>
        </p>
        <div className="flex justify-center mt-3 space-x-2">
          <button
            className={`px-4 py-1.5 rounded-full shadow-sm ${
              view === "matrix"
                ? "bg-blue-500 text-white ring-2 ring-blue-300"
                : "bg-white text-gray-700 hover:bg-gray-100"
            } transition-all`}
            onClick={() => setView("matrix")}
          >
            Matrix View
          </button>
          <button
            className={`px-4 py-1.5 rounded-full shadow-sm ${
              view === "list"
                ? "bg-blue-500 text-white ring-2 ring-blue-300"
                : "bg-white text-gray-700 hover:bg-gray-100"
            } transition-all`}
            onClick={() => setView("list")}
          >
            List View
          </button>
        </div>
      </header>

      {view === "matrix" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4 container mx-auto max-w-5xl">
          {/* Quadrant 1: Important & Urgent */}
          <div className="bg-red-50 p-4 rounded-xl shadow-md border border-red-100 min-h-[250px] transition-all hover:shadow-lg">
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
          <div className="bg-blue-50 p-4 rounded-xl shadow-md border border-blue-100 min-h-[250px] transition-all hover:shadow-lg">
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
          <div className="bg-yellow-50 p-4 rounded-xl shadow-md border border-yellow-100 min-h-[250px] transition-all hover:shadow-lg">
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
          <div className="bg-green-50 p-4 rounded-xl shadow-md border border-green-100 min-h-[250px] transition-all hover:shadow-lg">
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
        <div className="space-y-5 container mx-auto max-w-3xl">
          <div className="bg-red-50 p-4 rounded-xl shadow-md border border-red-100 min-h-[120px] transition-all hover:shadow-lg">
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

          <div className="bg-blue-50 p-4 rounded-xl shadow-md border border-blue-100 min-h-[120px] transition-all hover:shadow-lg">
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

          <div className="bg-yellow-50 p-4 rounded-xl shadow-md border border-yellow-100 min-h-[120px] transition-all hover:shadow-lg">
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

          <div className="bg-green-50 p-4 rounded-xl shadow-md border border-green-100 min-h-[120px] transition-all hover:shadow-lg">
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
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105"
        aria-label="Add new task"
        title="Add new task (Ctrl+N)"
      >
        <FaPlus size={22} />
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
