import React, { useState } from "react";
import { Input, Button, Select, Tag } from "antd";

const { Option } = Select;

interface TaskFormProps {
  setTasks: React.Dispatch<
    React.SetStateAction<{ id: number; title: string; status: string }[]>
  >;
}

const TaskForm: React.FC<TaskFormProps> = ({ setTasks }) => {
  const [taskData, setTaskData] = useState({
    title: "",
    status: "todo",
    tags: [] as string[],
  });

  const tagOptions = ["ajil1", "ajil2", "ajil3", "ajil4"];

  const handleChange = (name: string, value: string | string[]) => {
    setTaskData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTagChange = (selectedTags: string[]) => {
    setTaskData((prev) => ({
      ...prev,
      tags: selectedTags,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    

    const newTask = {
      id: Date.now(), // Generate a unique ID
      title: taskData.title,
      status: taskData.status,
      tags: taskData.tags,
    };
    // Check title is empthy or not 
    if (taskData.title.trim() === "") {
      alert("Please enter a task title!");
      return; // Prevent the form from submitting
    }

    setTasks((prev) => [...prev, newTask]);

    // Reset form fields after adding a task
    setTaskData({
      title: "",
      status: "todo",
      tags: [],
    });

    
  };

  return (
    <header className="border-b border-gray-300 py-4 bg-white shadow-sm">
      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
        <Input
          type="text"
          name="title"
          value={taskData.title}
          placeholder="Enter your task"
          onChange={(e) => handleChange("title", e.target.value)}
          className="w-2/3"
          size="large"
        />

        <div className="flex items-center justify-between w-2/3">
          <Select
            mode="multiple"
            placeholder="Select tags"
            value={taskData.tags}
            onChange={handleTagChange}
            className="w-1/2"
          >
            {tagOptions.map((tag) => (
              <Option key={tag} value={tag}>
                <Tag>{tag}</Tag>
              </Option>
            ))}
          </Select>

          <div className="flex items-center space-x-4">
            <Select
              value={taskData.status}
              onChange={(value) => handleChange("status", value)}
              className="w-32"
              size="large"
            >
              <Option value="todo">To do</Option>
              <Option value="doing">Doing</Option>
              <Option value="done">Done</Option>
            </Select>

            <Button type="primary" htmlType="submit" className="bg-blue-500" size="large">
              + Add Task
            </Button>
          </div>
        </div>
      </form>
    </header>
  );
};

export default TaskForm;
