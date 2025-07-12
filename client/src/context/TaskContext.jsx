import { createContext, useContext, useState } from "react";
import {
  createTasksRequest,
  getTasksRequest,
  getTaskRequest,
  DeleteTasksRequest,
  updateTasksRequest,
} from "../api/task.js";

const TaskContext = createContext();

export const UseTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
};

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    try {
      const res = await getTasksRequest();
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createTasks = async (task) => {
    const res = await createTasksRequest(task);
  };

  const deleteTask = async (id) => {
    try {
      const res = await DeleteTasksRequest(id);
      if (res.status === 204) setTasks(tasks.filter((task) => task._id != id));
    } catch (error) {
      console.error(error);
    }
  };

  const getTask = async (id) => {
    try {
      const res = await getTaskRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateTask = async (id, task) => {
    try {
      await updateTasksRequest(id, task);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        createTasks,
        getTasks,
        deleteTask,
        getTask,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
