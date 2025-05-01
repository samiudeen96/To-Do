import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const TodoContext = createContext();

const TodoContextProvider = (props) => {
  const navigate = useNavigate();
  const initialFormData = {
    name: "",
    username: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [page, setPage] = useState("LogIn");
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );
  const [loggedUser, setLoggedUser] = useState(
    JSON.parse(localStorage.getItem("loggedUser"))
  );

  const [task, setTask] = useState(
    JSON.parse(localStorage.getItem("loggedUser"))?.tasks || []
  );

  const onPageHandler = (getPage) => {
    if (getPage == "LogIn") {
      setPage("LogIn");
      setFormData(initialFormData);
    }

    if (getPage == "SignUp") {
      setPage("SignUp");
      setFormData(initialFormData);
    }
  };

  const OnChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const existingUser = users.some(
      (user) => user.username.toLowerCase() === formData.username.toLowerCase()
    );

    if (page == "SignUp") {
      if (existingUser) {
        toast.error('User already exist')
        // console.log("User already exist");
      } else {
        const newUser = {
          name: formData.name,
          username: formData.username,
          password: formData.password,
          tasks: [],
        };
        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);
        console.log(users);
        localStorage.setItem("users", JSON.stringify(updatedUsers));

        setFormData(initialFormData);
        setPage("LogIn");
        toast.success('Registered successfully!')
      }
    }

    if (page === "LogIn") {
      
      const updatedUsers = JSON.parse(localStorage.getItem("users")) || [];
      const authorizedUser = updatedUsers.find(
        (user) =>
          user.username.toLowerCase() === formData.username.toLowerCase() &&
          user.password === formData.password
      );
    
      if (authorizedUser) {
        localStorage.setItem("loggedUser", JSON.stringify(authorizedUser));
        setLoggedUser(authorizedUser);
        setTask(authorizedUser.tasks);
        setFormData(initialFormData);
        navigate("/dashboard");
        toast.success('Logged in successfully')
      } else {
        toast.error('User not exist')
        console.log("User not exist");
      }
    }
    
  };

  const logoutHandler = () => {
    toast.success('Logged out successfully')
    localStorage.removeItem("loggedUser");
    setTask([]);
    navigate("/");
  };

  const value = {
    formData,
    setFormData,
    OnChangeHandler,
    onSubmitHandler,
    page,
    onPageHandler,
    loggedUser,
    task,
    setTask,
    logoutHandler,
    setLoggedUser,
  };

  return (
    <TodoContext.Provider value={value}>{props.children}</TodoContext.Provider>
  );
};

export default TodoContextProvider;
