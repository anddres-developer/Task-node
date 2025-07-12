import { Link } from "react-router";
import { UseTasks } from "../context/TaskContext";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs();

function TaskCard({ task }) {
  const { deleteTask } = UseTasks();

  return (
    <div className=" bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <header className="flex justify-between">
        <h1 className="text-2xl text-bold">{task.title}</h1>
        <div className="flex gap-x-2 items-center">
          <button
            className="bg-red-800 hover:bg-red-700 px-2 py-1 rounded-sm"
            onClick={() => {
              deleteTask(task._id);
            }}
          >
            Delete
          </button>
          <Link
            className="bg-emerald-500 hover:bg-emerald-700 px-2 py-1 rounded-sm"
            to={`/tasks/${task._id}`}
          >
            Edit
          </Link>
        </div>
      </header>

      <p className="text-slate-300">{task.description}</p>
      <p>{dayjs(task.date).utc().format("DD-MM-YYYY")}</p>
    </div>
  );
}

export default TaskCard;
