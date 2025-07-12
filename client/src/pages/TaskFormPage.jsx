import { useForm } from "react-hook-form";
import { UseTasks } from "../context/TaskContext";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(timezone);
dayjs.extend(utc);

function TaskFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { createTasks, getTask, updateTask } = UseTasks();
  const navegate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id);
        setValue("title", task.title);
        setValue("description", task.description);
        setValue("date", dayjs.utc(task.date).format("YYYY-MM-DD"));
      }
    }
    loadTask();
  }, []);
  const onSubmit = handleSubmit((data) => {
    const dateValid = {
      ...data,
      date: data.date
        ? dayjs.utc(data.date).format()
        : dayjs.utc().tz("America/Caracas").format("YYYY-MM-DDThh:mm:ss[Z]"),
    };

    if (params.id) {
      updateTask(params.id, dateValid);
    } else {
      createTasks(dateValid);
    }
    navegate("/tasks");
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <form onSubmit={onSubmit}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            placeholder="Title"
            id="title"
            {...register("title")}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            autoFocus
          />

          <label htmlFor="description">Description</label>
          <textarea
            rows={3}
            placeholder="Description..."
            id="description"
            {...register("description")}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          ></textarea>

          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            {...register("date")}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />

          <button className="bg-blue-500 hover:bg-blue-700 px-4 py-1 rounded-sm">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default TaskFormPage;
