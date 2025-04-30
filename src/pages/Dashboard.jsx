import React, { useContext, useState, useEffect } from "react";
import Header from "../components/Header";
import { TodoContext } from "../context/TodoContext";
import notask from "../assets/notask.svg";

const Dashboard = () => {
  const initialFormState = {
    title: "",
    description: "",
    status: "To Start",
  };
  const [formData, setFormData] = useState(initialFormState);
  const [openModal, setOpenModal] = useState(false);
  const [tab, setTab] = useState("All");
  const { task, setTask, loggedUser, setLoggedUser } = useContext(TodoContext);
  const [formAction, setFormAction] = useState("submit");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [notes, setNotes] = useState([]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (loggedUser?.tasks) {
      if (tab === "All") {
        setNotes(loggedUser.tasks);
      } else {
        const filtered = loggedUser.tasks.filter((item) => item.status === tab);
        setNotes(filtered);
      }
    }
  }, [tab, loggedUser]);

  // const onTabHandler = (item) => {
  //   setTab(item.header);

  //   if (item.header === "All") {
  //     setTask(loggedUser.tasks);
  //     JSON.parse(localStorage.getItem("users"));
  //   }

  //   if (item.header === "To Start") {
  //     const filteredTask = loggedUser.tasks.filter(
  //       (task) => task.status === item.header
  //     );
  //     setTask(filteredTask);
  //   }

  //   if (item.header === "In Progress") {
  //     const filteredTask = loggedUser.tasks.filter(
  //       (task) => task.status === item.header
  //     );
  //     setTask(filteredTask);
  //   }

  //   if (item.header === "Completed") {
  //     const filteredTask = loggedUser.tasks.filter(
  //       (task) => task.status === item.header
  //     );
  //     setTask(filteredTask);
  //   }
  // };

  const onTabHandler = (item) => {
    setTab(item.header);

    // if (item.header === "All") {
    //   setNotes(loggedUser.tasks);
    // } else {
    //   const filteredTask = loggedUser.tasks.filter(
    //     (task) => task.status === item.header
    //   );
    //   setNotes(filteredTask);
    // }
  };

  // Submit Handler
  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (formAction === "submit") {
      const updatedTasks = [...task, formData];
      setTask(updatedTasks);

      // Update loggedUser.tasks and localStorage
      const updatedUser = { ...loggedUser, tasks: updatedTasks };
      setLoggedUser(updatedUser);
      setNotes(updatedUser.tasks);
      localStorage.setItem("loggedUser", JSON.stringify(updatedUser));

      // Also update the users array in localStorage
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = users.map((user) =>
        user.username === updatedUser.username ? updatedUser : user
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setOpenModal(false);
      setFormData(initialFormState);
    }

    if (formAction === "update") {
      const updatedTasks = task.map((item, index) =>
        index === selectedIndex ? { ...item, ...formData } : item
      );
      setTask(updatedTasks);
      // Update loggedUser.tasks and localStorage
      const updatedUser = { ...loggedUser, tasks: updatedTasks };
      setLoggedUser(updatedUser);
      setNotes(updatedUser.tasks);
      localStorage.setItem("loggedUser", JSON.stringify(updatedUser));
      // Also update the users array in localStorage
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = users.map((user) =>
        user.username === updatedUser.username ? updatedUser : user
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setFormData(initialFormState);
      setOpenModal(false);
      setFormAction("submit");
    }
  };

  const onEditHandler = (index) => {
    setFormAction("update");
    const selectedTask = task[index];
    setFormData({
      title: selectedTask.title,
      description: selectedTask.description,
      status: selectedTask.status,
    });
    setOpenModal(true);
  };

  const onDeleteHandler = (itemIndex) => {
    const updatedTasks = [...task];
    updatedTasks.splice(itemIndex, 1);
    setTask(updatedTasks);

    // Update loggedUser.tasks and localStorage
    const updatedUser = { ...loggedUser, tasks: updatedTasks };
    setLoggedUser(updatedUser);
    setNotes(updatedUser.tasks);
    localStorage.setItem("loggedUser", JSON.stringify(updatedUser));
    // Also update the users array in localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((user) =>
      user.username === updatedUser.username ? updatedUser : user
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const onCloseHandler = () => {
    setFormData(initialFormState);
    setFormAction("submit");
    setOpenModal(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "To Start":
        return "bg-gray-400";
      case "In Progress":
        return "bg-yellow-400";
      case "Completed":
        return "bg-green-400";
      default:
        return "bg-gray-200";
    }
  };

  return (
    <div className="h-screen">
      <Header />
      <div className="relative">
        <div className="h-[calc(100vh-64px)] p-4 overflow-y-auto sm:w-5/6 mx-auto ">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">My Todo</h3>
            <button className="" onClick={() => setOpenModal(true)}>
              Create
            </button>
          </div>

          <div className="tabs flex gap-1 mt-10 border-b">
            {tabs.map((item, index) => (
              <div
                key={index}
                className={`tab_header px-4 py-1 text-[15px] rounded-lg mb-[4px] cursor-pointer ${
                  item.header === tab
                    ? "bg-black text-white"
                    : "bg-white border border-black text-black"
                }`}
                onClick={() => onTabHandler(item)}
              >
                {item.header}
              </div>
            ))}
          </div>

          <div className="mt-1">
            {notes.length === 0 ? (
              <div className="flex flex-col items-center mt-10">
                <img className="w-20 h-20" src={notask} alt="" />
                <p className="text-gray-500 text-center text-lg">
                  No tasks available
                </p>
              </div>
            ) : (
              notes.map((item, index) => (
                <div
                  key={index}
                  className="border border-slate-300 my-3 rounded p-3 shadow bg-white"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <div
                        className={`w-[10px] h-[10px] shadow-lg rounded-full ${getStatusColor(
                          item.status
                        )}`}
                      ></div>
                      <p className="text-[12px] text-gray-600">
                        {" "}
                        {item.status}
                      </p>
                    </div>
                    <div className="text-sm font-semibold flex gap-2">
                      <a
                        onClick={() => {
                          onEditHandler(index);
                          setSelectedIndex(index);
                        }}
                        className="cursor-pointer text-blue-600"
                      >
                        Edit
                      </a>
                      <a
                        onClick={() => onDeleteHandler(index)}
                        className="cursor-pointer text-red-500"
                      >
                        Delete
                      </a>
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mt-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 font-semibold">
                    {item.description}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {openModal && (
          <div className="absolute inset-0 bg-[#0000001f] bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white p-4 rounded shadow-sm sm:w-96 w-full">
              <form onSubmit={onSubmitHandler} className="space-y-3">
                <div>
                  <input
                    className="border border-slate-300 w-full rounded-sm p-2"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={onChangeHandler}
                    placeholder="Title"
                    required
                  />
                </div>
                <div>
                  <textarea
                    rows="5"
                    className="border border-slate-300 w-full rounded-sm p-2"
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={onChangeHandler}
                    placeholder="Description"
                    required
                  />
                </div>

                <div>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={onChangeHandler}
                    required
                    className="w-full border border-slate-300 rounded-sm p-2 text-sm"
                  >
                    <option value="To Start">To Start</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div className="flex justify-end gap-3 items-center">
                  {formAction === "submit" && (
                    <button type="submit">Submit</button>
                  )}
                  {formAction === "update" && (
                    <button type="submit">Update</button>
                  )}
                  <a className="cursor-pointer" onClick={onCloseHandler}>
                    Close
                  </a>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const tabs = [
  { header: "All" },
  { header: "To Start" },
  { header: "In Progress" },
  { header: "Completed" },
];

export default Dashboard;
