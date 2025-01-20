import React from "react";
import {  Tooltip } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";

interface TaskCardProps {
  title: string;
  handleDelete: (index: number) => void;
  index: number;
  setActiveCard: (index: number | null) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ title, handleDelete, index, setActiveCard }) => {
  return (
    <div
      className="w-full min-h-[100px] border border-gray-300 rounded-lg p-4 mb-4 cursor-grab shadow-md bg-white"
      draggable
      onDragStart={() => setActiveCard(index)}
      onDragEnd={() => setActiveCard(null)}
    >
      <p className="text-lg font-semibold mb-3">{title}</p>

      <div className="flex justify-between items-center">
        <Tooltip title="Delete Task">
          <CloseCircleOutlined
            className="text-xl text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
            onClick={() => handleDelete(index)}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default TaskCard;
