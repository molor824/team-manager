import React from "react";
import { Tag as AntTag, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

type TaskCardProps = {
  title: string;
  tags: string[];
  handleDelete: (index: number) => void;
  index: number;
};

const TaskCard: React.FC<TaskCardProps> = ({ title, tags, handleDelete, index }) => {
  return (
    <article className="w-full min-h-[100px] border border-gray-300 rounded-lg p-4 mb-4 shadow-sm">
      <p className="text-lg font-semibold mb-4">{title}</p>

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, idx) => (
            <AntTag key={idx} color="blue">
              {tag}
            </AntTag>
          ))}
        </div>

        <Button
          type="text"
          shape="circle"
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(index)}
          className="hover:bg-gray-200"
        />
      </div>
    </article>
  );
};

export default TaskCard;
