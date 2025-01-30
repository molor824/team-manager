import { useState } from "react";
import { Card } from "antd";
import TaskColumn from "../components/TaskColumn";
import {
  CheckCircleOutlined,
  PlayCircleOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import Title from "antd/es/typography/Title";

const SAMPLE_TASKS = [
  {
    title: "Task 1",
    status: "todo",
  },
  {
    title: "Task 3",
    status: "todo",
  },
  {
    title: "Task 4",
    status: "done",
  },
  {
    title: "Task 2",
    status: "doing",
  },
];

export default function Todo() {
  const [tasks, setTasks] = useState(SAMPLE_TASKS);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const handleDelete = (taskIndex: number) => {
    const newTasks = tasks.filter((_, index) => index !== taskIndex);
    setTasks(newTasks);
  };

  const onDrop = (status: string) => {
    if (activeCard === null) return;

    tasks[activeCard].status = status;
    setTasks([...tasks]);
  };

  return (
    <Card>
      <Title level={2} className="text-center">
        Todo List
      </Title>
      <div className="flex items-stretch w-full gap-4">
        <TaskColumn
          title="Todo"
          icon={<ToolOutlined />} // Pass the appropriate icon
          tasks={tasks}
          status="todo"
          handleDelete={handleDelete}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
        />
        <TaskColumn
          title="Doing"
          icon={<PlayCircleOutlined />} // Pass the appropriate icon
          tasks={tasks}
          status="doing"
          handleDelete={handleDelete}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
        />
        <TaskColumn
          title="Done"
          icon={<CheckCircleOutlined />} // Pass the appropriate icon
          tasks={tasks}
          status="done"
          handleDelete={handleDelete}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
        />
      </div>
    </Card>
  );
}
