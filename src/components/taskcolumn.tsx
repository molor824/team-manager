import React from "react";
import { Typography } from "antd";
import { FileOutlined } from "@ant-design/icons";
import TaskCard from "./taskcard";

type TaskColumnProps = {
  title: string;
  icon?: React.ReactNode;
  tasks: { task: string; tags: string[]; status: string }[];
  status: string;
  handleDelete: (index: number) => void;
};

const TaskColumn: React.FC<TaskColumnProps> = ({ title, icon, tasks, status, handleDelete }) => {
  return (
    <section className="bg-white p-4 rounded-lg shadow-md">
      <Typography.Title level={4} className="flex items-center mb-4">
        {icon || <FileOutlined className="mr-2 text-lg" />} {title}
      </Typography.Title>

      {tasks.map((task, index) =>
        task.status === status ? (
          <TaskCard
            key={index}
            title={task.task}
            tags={task.tags}
            handleDelete={handleDelete}
            index={index}
          />
        ) : null
      )}
    </section>
  );
};

export default TaskColumn;
