import { useEffect } from "react";
import { UseTasks } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";

function TaskPage() {
  const { getTasks, tasks } = UseTasks();

  useEffect(() => {
    getTasks();
  }, []);

  if (tasks.length == 0) {
    return <h1 className="text-white text-2xl">No tasks found</h1>;
  }
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
      {tasks.map((task) => (
        <TaskCard task={task} key={task._id} />
      ))}
    </div>
  );
}

export default TaskPage;
