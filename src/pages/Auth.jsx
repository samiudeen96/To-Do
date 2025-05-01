import React, { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";
import todo from "../assets/todo.svg";

const Auth = () => {
  const { formData, onSubmitHandler, OnChangeHandler, page, onPageHandler } =
    useContext(TodoContext);

  return (
    <div className="h-screen w-screen p-5  flex items-center justify-center flex-col gap-5">
      <div className=" flex gap-2 items-center justify-center">
        <img className="w-11 h-11" src={todo} alt="" />
        <h2 className="text-3xl font-semibold">ToDo</h2>
      </div>
      <div className="sm:w-96 w-full rounded-md sm:p-8 p-5 shadow-sm">
        <form onSubmit={onSubmitHandler} className="space-y-4">
          {/* <div className="flex justify-center">
            <h2>{page}</h2>
          </div> */}

          {page == "SignUp" && (
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={OnChangeHandler}
                placeholder="Name"
                className="border border-slate-300 w-full rounded-sm p-2"
                required
              />
            </div>
          )}

          <div>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={OnChangeHandler}
              placeholder="Username"
              required
              className="border border-slate-300 w-full rounded-sm p-2"
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={OnChangeHandler}
              placeholder="Password"
              required
              className="border border-slate-300 w-full rounded-sm p-2"
            />
          </div>

          <div className="mt-5">
            <button type="submit" className="w-full">
              {page}
            </button>

            <div className="mt-5">
              {page == "SignUp" && (
                // <a
                //   className="text-[12px] hover:underline cursor-pointer"
                //   onClick={() => onPageHandler("LogIn")}
                // >
                //   LogIn
                // </a>
                <p className="text-[14px]  text-center">
                  Not a member?{" "}
                  <span
                    className="underline font-semibold cursor-pointer"
                    onClick={() => onPageHandler("LogIn")}
                  >
                    Login
                  </span>{" "}
                  now
                </p>
              )}
              {page == "LogIn" && (
                // <a
                //   className="text-[12px] hover:underline cursor-pointer"
                //   onClick={() => onPageHandler("SignUp")}
                // >
                //   SignUp
                // </a>
                <p className="text-[14px]  text-center">
                  Already have an account?{" "}
                  <span
                    className="underline cursor-pointer font-semibold"
                    onClick={() => onPageHandler("SignUp")}
                  >
                    Signup
                  </span>{" "}
                  now
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
