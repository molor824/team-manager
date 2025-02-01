import WorkCard from "./WorkCard";
import Title from "antd/es/typography/Title";
import { Card } from "antd";
import { ReactNode, useState } from "react";
import { Work } from "../tools/model_types";

interface Props {
  title: string;
  icon: ReactNode; // Change here to React.ReactNode
  works: Work[];
  status: string;
  handleDelete: (id: number) => void;
  setActiveCard: (id: number | null) => void;
  onDrop: (status: string) => void;
}

export default function WorkColumn({
  title,
  icon,
  works,
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
        {works.map(
          (task) =>
            task.status === status && (
              <WorkCard
                key={task.id}
                title={task.title}
                handleDelete={handleDelete}
                id={task.id}
                setActiveCard={setActiveCard}
              />
            )
        )}
      </div>
    </Card>
  );
}
