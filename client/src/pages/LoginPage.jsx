import { useForm } from "react-hook-form";
import { UseAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router";
import { useEffect } from "react";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { sigIn, errors: singInErrors, isAuthenticated } = UseAuth();
  const navegate = useNavigate();
  const onSubmit = handleSubmit((data) => {
    sigIn(data);
  });

  useEffect(() => {
    if (isAuthenticated) navegate("/tasks");
  }, [isAuthenticated]);

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        {singInErrors.map((error, i) => (
          <div className="bg-red-500 p-2 text-white text-center m-2" key={i}>
            {error}
          </div>
        ))}
        <h1 className="text-3xl font-bold text-center my-2">Login</h1>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500">Esername is Required</p>}
          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500">Password is Required</p>
          )}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
          >
            Login
          </button>
        </form>
        <p className="flex gap-x-2 justify-between">
          Don't have an account?{" "}
          <Link to="/register" className="text-sky-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
