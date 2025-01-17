import React, { useState } from "react";
import Tag from "./tag";

type TaskFormProps = {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

type Task = {
  task: string;
  status: "todo" | "doing" | "done";
  tags: string[];
};

const TaskForm: React.FC<TaskFormProps> = ({ setTasks }) => {
  const [taskData, setTaskData] = useState<Task>({
    task: "",
    status: "todo",
    tags: [],
  });

  const checkTag = (tag: string) => {
    return taskData.tags.includes(tag);
  };

  const selectTag = (tag: string) => {
    if (checkTag(tag)) {
      setTaskData((prev) => ({
        ...prev,
        tags: prev.tags.filter((item) => item !== tag),
      }));
    } else {
      setTaskData((prev) => ({
        ...prev,
        tags: [...prev.tags, tag],
      }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTasks((prev) => [...prev, taskData]);
    setTaskData({
      task: "",
      status: "todo",
      tags: [],
    });
  };

  return (
    <header className="flex items-center justify-center border-b border-gray-300 pb-4">
      <form onSubmit={handleSubmit} className="w-2/5">
        <input
          type="text"
          name="task"
          value={taskData.task}
          className="w-full text-lg font-medium bg-gray-100 text-black border border-gray-300 rounded-md p-2 mb-4"
          placeholder="Enter your task"
          onChange={handleChange}
        />

        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <Tag tagName="HTML" selectTag={selectTag} selected={checkTag("HTML")} />
            <Tag tagName="CSS" selectTag={selectTag} selected={checkTag("CSS")} />
            <Tag tagName="JavaScript" selectTag={selectTag} selected={checkTag("JavaScript")} />
            <Tag tagName="React" selectTag={selectTag} selected={checkTag("React")} />
          </div>

          <div className="flex items-center space-x-2">
            <select
              name="status"
              value={taskData.status}
              className="text-base font-medium border border-gray-500 rounded-md h-10 px-2"
              onChange={handleChange}
            >
              <option value="todo">To do</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
            <button
              type="submit"
              className="text-base font-medium bg-blue-600 text-white rounded-md h-10 px-4"
            >
              + Add Task
            </button>
          </div>
        </div>
      </form>
    </header>
  );
};

export default TaskForm;
