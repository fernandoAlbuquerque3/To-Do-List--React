import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Tasks from "./components/Tasks";
import "./App.css";

import AddTask from "./components/addTask";
import TaskDetails from "./components/TaskDetails";
import Header from "./components/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  const [tasks, setTask] = useState([
    {
      id: "1",
      title: "Estudar Progamaçao",
      completed: false,
    },
    {
      id: "2",
      title: "Ler livros",
      completed: true,
    },
  ]);

  const handleTaskClick = (taskId) => {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) return { ...task, completed: !task.completed };

      return task;
    });

    setTask(newTasks);
  };

  const handleTaskAddition = (taskTitle) => {
    const newTasks = [
      ...tasks,
      {
        title: taskTitle,
        id: uuidv4(),
        completed: false,
      },
    ];

    setTask(newTasks);
  };

  const handleTaskDeletion = (taskId) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTask(newTasks);
  };

  return (
    <Router>
      <div className="container">
        <Header />
        <Route
          path={"/"}
          exact
          render={() => (
            <>
              <AddTask handleTaskAddition={handleTaskAddition} />
              <Tasks
                tasks={tasks}
                handleTaskClick={handleTaskClick}
                handleTaskDeletion={handleTaskDeletion}
              />
            </>
          )}
        />
        <Route path="/:taskTitle" exact component={TaskDetails} />

      </div>
    </Router>
  );
};

export default App;
