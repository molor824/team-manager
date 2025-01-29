import TaskCard from "./TaskCard";
import Title from "antd/es/typography/Title";
import { Card } from "antd";
import { ReactNode, useState } from "react";

interface Task {
  title: string; // Title of the task
  status: string; // Status of the task (e.g., "todo", "doing", "done")
}

interface Props {
  title: string;
  icon: ReactNode; // Change here to React.ReactNode
  tasks: Task[];
  status: string;
  handleDelete: (index: number) => void;
  setActiveCard: (index: number | null) => void;
  onDrop: (status: string) => void;
}

export default function TaskColumn({
  title,
  icon,
  tasks,
  status,
  handleDelete,
  setActiveCard,
  onDrop,
}: Props) {
  const [dragEnter, setDragEnter] = useState(false);

  return (
    <Card
      className={`bg-gray-100 shadow-md flex-grow ${
        dragEnter ? "bg-gray-200" : ""
      }`}
      onDragEnter={() => setDragEnter(true)}
      onDragExit={() => setDragEnter(false)}
      onDrop={(e) => {
        setDragEnter(false);
        onDrop(status);
        e.preventDefault();
      }}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className="flex items-center">
        <div className="w-8 h-8">{icon}</div>
        <Title level={4}>{title}</Title>
      </div>

      <div className="flex flex-col items-stretch gap-4">
        {tasks.map(
          (task, index) =>
            task.status === status && (
              <TaskCard
                key={index}
                title={task.title}
                handleDelete={handleDelete}
                index={index}
                setActiveCard={setActiveCard}
              />
            )
        )}
      </div>
    </Card>
  );
}
