import React, { useContext, useEffect, useRef, useState } from "react";
import todo from "../assets/todo.svg";
import dots from "../assets/dots.svg";
import logout from '../assets/logout1.svg'

import { TodoContext } from "../context/TodoContext";

const Header = () => {
  const { loggedUser, logoutHandler } = useContext(TodoContext);
  const { name } = loggedUser;
  const initial = name.toUpperCase().slice(0, 1);
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className=" bg-white shadow-sm">
      <div className="flex justify-between items-center p-4 sm:w-5/6 mx-auto">
        <div className="flex items-center gap-1">
          <img src={todo} className="w-8 h-8 " alt="" />
          <p className="font-semibold text-lg">ToDo</p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex gap-1 items-center" >
            <div className="bg-black w-6 h-6 text-white text-[18px] rounded-full flex justify-center items-center font-normal">
              <p>{initial}</p>
            </div>
            <div>{name}</div>
          </div>
          {/* <div className="relative" ref={dropdownRef}>
            <img
              className="w-5 h-5 cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
              src={dots}
              alt=""
            />
            {isOpen && (
              <div className="absolute right-2 bg-slate-100 shadow-lg p-2 z-10">
                <button onClick={logoutHandler}>Logout</button>
              </div>
            )}
          </div> */}
          <img src={logout} className="w-6 h-6 cursor-pointer" onClick={logoutHandler} alt=""/>
        </div>
      </div>
    </div>
  );
};

export default Header;
