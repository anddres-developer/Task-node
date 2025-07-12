import { Link } from "react-router";
import { UseAuth } from "../context/AuthContext";
import { UseTasks } from "../context/TaskContext";

function Navbar() {
  const { isAuthenticated, logout, user } = UseAuth();
  const { setTasks } = UseTasks();
  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-md">
      <Link to={isAuthenticated ? "/tasks" : "/"}>
        <h1 className="text-2xl font-bold">Tasks Manager</h1>
      </Link>

      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li className="font-bold">Welcome {user.username}</li>
            <li>
              <Link
                to={"/add-task"}
                className="bg-blue-500 hover:bg-blue-700 px-4 py-1 rounded-sm"
              >
                Add Task
              </Link>
            </li>
            <li>
              <Link
                to={"/"}
                onClick={() => {
                  logout();
                  setTasks([]);
                }}
                className="bg-blue-500 hover:bg-blue-700 px-4 py-1 rounded-sm"
              >
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to={"/login"}
                className="bg-blue-500 hover:bg-blue-700 px-4 py-1 rounded-sm"
              >
                Login{" "}
              </Link>
            </li>
            <li>
              <Link
                to={"/register"}
                className="bg-blue-500 hover:bg-blue-700 px-4 py-1 rounded-sm"
              >
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
