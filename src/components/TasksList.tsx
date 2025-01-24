import { List, Button } from "antd";

type Task = {
  id: number;
  title: string;
  description: string;
};

type Props = {
  tasks: Task[];
  onDelete: (taskId: number) => void;
  deleting: boolean;
};

export default function TasksList({ tasks, onDelete, deleting }: Props) {
  return (
    <List
      dataSource={tasks}
      renderItem={(task) => (
        <List.Item
          actions={[
            <Button
              key="delete"
              danger
              loading={deleting}
              onClick={() => onDelete(task.id)}
            >
              Delete
            </Button>,
          ]}
        >
          <List.Item.Meta
            title={task.title}
            description={task.description}
          />
        </List.Item>
      )}
    />
  );
}
