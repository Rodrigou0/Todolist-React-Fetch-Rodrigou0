import React, { useState, useEffect } from "react";

const TodoList = () => {
  const [user, setUser] = useState("");
  const [newTask, setNewTask] = useState({ label: "", done: false });
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks();
  }, []);

  const createUser = () => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/" + user, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([]),
    })
      .then((res) => res.json())
      .then((resAsJson) => {
        console.log(resAsJson);
        getTasks();
      })
      .catch((Err) => {
        console.log(Err);
      });
  };
  const deleteUser = () => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/" + user, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((resAsJson) => {
        console.log(resAsJson);
        setUser("");
        setTasks([]);
      })
      .catch((Err) => {
        console.log(Err);
      });
  };

  const getTasks = () => {
    if (user !== "") {
      fetch("https://assets.breatheco.de/apis/fake/todos/user/" + user, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((resAsJson) => {
          console.log(resAsJson);
          setTasks(resAsJson);
        })
        .catch((Err) => {
          console.log(Err);
        });
    }
  };

  const updateTask = () => {
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
    fetch("https://assets.breatheco.de/apis/fake/todos/user/" + user, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTasks),
    })
      .then((res) => res.json())
      .then((resAsJson) => {
        console.log(resAsJson);
        getTasks();
        setNewTask({ label: "", done: false });
      })
      .catch((Err) => {
        console.log(Err);
      });
  };
  const deleteTask = (taskLabel) => {
    const updatedTasks = tasks.filter((task) => task.label !== taskLabel);
    setTasks(updatedTasks);
    fetch("https://assets.breatheco.de/apis/fake/todos/user/" + user, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTasks),
    })
      .then((res) => res.json())
      .then((resAsJson) => {
        console.log(resAsJson);
        getTasks();
      })
      .catch((Err) => {
        console.log(Err);
      });
  }

  return (
    <div className="todo">
      <div className="top">
          <h1>TO-DO LIST</h1>
      </div>
      <input className="in"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        placeholder="Enter username:"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            createUser();
          }
        }}
      />
      <input className="in"
        value={newTask.label}
        onChange={(e) =>
          setNewTask({ ...newTask, label: e.target.value })
        }
        placeholder="Enter task:"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            updateTask();
          }
        }}
      />
      <ul>
        {tasks.map((task) => (
            <li key={task.label} className="task-item">
              <div>{task.label}</div>
              <button className="btn1 task-delete" onClick={() => deleteTask(task.label)}>X</button>
            </li>
        ))}
      </ul>
      {user && (
            <button className="btn1 delete-user" onClick={deleteUser}>
              Delete User
            </button>
          )}
    </div>
  );
};

export default TodoList;
