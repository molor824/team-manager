
import React from "react";
import { Typography } from "antd";
import DropArea from "./DropArea";
import TaskCard from "./TaskCard";

const { Title } = Typography;

interface Task {
  id: number; // Unique task identifier
  title: string; // Title of the task
  status: string; // Status of the task (e.g., "todo", "doing", "done")
  
}


interface TaskColumnProps {
  title: string;
  icon: React.ReactNode; // Change here to React.ReactNode
  tasks: Task[];
  status: string;
  handleDelete: (index: number) => void;
  setActiveCard: (index: number | null) => void; 
  onDrop: (status: string, index: number) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({
  title,
  icon,
  tasks,
  status,
  handleDelete,
  setActiveCard,
  onDrop,
}) => {
  return (
    <section className="bg-gray-100 rounded-md shadow-md p-4 space-y-4">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8">{icon}</div> {/* Render icon here */}
        <Title level={4} className="m-0">
          {title}
        </Title>
      </div>

      <DropArea onDrop={() => onDrop(status, -1)} />

      {tasks.map(
        (task, index) =>
          task.status === status && (
            <React.Fragment key={task.id}>
              <TaskCard
                title={task.title}
                handleDelete={handleDelete}
                index={index}
                setActiveCard={setActiveCard}
              />
              <DropArea onDrop={() => onDrop(status, index )} />
            </React.Fragment>
          )
      )}
    </section>
  );
};

export default TaskColumn;
