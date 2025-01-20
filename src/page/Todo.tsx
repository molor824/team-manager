// Todo.tsx (Updated)

import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import TaskForm from "../components/TaskForm";
import TaskColumn from "../components/TaskColumn";
import { ToolOutlined, PlayCircleOutlined, CheckCircleOutlined } from "@ant-design/icons"; 

const { Header, Content } = Layout;

const oldTasks = localStorage.getItem("tasks");

const Todo: React.FC = () => {
  const [tasks, setTasks] = useState<{ id: number; title: string; status: string }[]>(JSON.parse(oldTasks || "[]"));
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDelete = (taskIndex: number) => {
    const newTasks = tasks.filter((_, index) => index !== taskIndex);
    setTasks(newTasks);
  };

  const onDrop = (status: string, position: number) => {
    if (activeCard === null) return;

    const taskToMove = tasks[activeCard];
    const updatedTasks = tasks.filter((_, index) => index !== activeCard);
    updatedTasks.splice(position, 0, { ...taskToMove, status });
    setTasks(updatedTasks);
  };

  // Define icons based on status
  const getIconForStatus = (status: string) => {
    switch (status) {
      case "todo":
        return <ToolOutlined />;
      case "doing":
        return <PlayCircleOutlined />;
      case "done":
        return <CheckCircleOutlined />;
      default:
        return null;
    }
  };

  return (
    <Layout className="min-h-screen bg-gray-100">
      <Header className="bg-blue-500 text-white text-center text-2xl py-4">
        Task Management App
      </Header>
      <Content className="p-6">
        <TaskForm setTasks={setTasks} />
        <div className="flex justify-evenly mt-8">
          <TaskColumn
            title="To do"
            icon={getIconForStatus("todo")} // Pass the appropriate icon
            tasks={tasks.filter((task) => task.status === "todo")}
            status="todo"
            handleDelete={handleDelete}
            setActiveCard={setActiveCard}
            onDrop={onDrop}
          />
          <TaskColumn
            title="Doing"
            icon={getIconForStatus("doing")} // Pass the appropriate icon
            tasks={tasks.filter((task) => task.status === "doing")}
            status="doing"
            handleDelete={handleDelete}
            setActiveCard={setActiveCard}
            onDrop={onDrop}
          />
          <TaskColumn
            title="Done"
            icon={getIconForStatus("done")} // Pass the appropriate icon
            tasks={tasks.filter((task) => task.status === "done")}
            status="done"
            handleDelete={handleDelete}
            setActiveCard={setActiveCard}
            onDrop={onDrop}
          />
        </div>
      </Content>
    </Layout>
  );
};

export default Todo;
