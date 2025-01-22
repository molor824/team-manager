import { Card, Tooltip } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";

interface Props {
  title: string;
  handleDelete: (index: number) => void;
  index: number;
  setActiveCard: (index: number | null) => void;
}

export default function TaskCard({
  title,
  handleDelete,
  index,
  setActiveCard,
}: Props) {
  return (
    <Card
      className="w-full min-w-[100px] min-h-[100px] border border-gray-300 rounded-lg cursor-grab shadow-md bg-white"
      draggable
      onDragStart={() => setActiveCard(index)}
      onDragEnd={() => setActiveCard(null)}
    >
      <p className="text-lg font-semibold mb-3">{title}</p>

      <Tooltip title="Delete Task">
        <CloseCircleOutlined
          className="text-xl text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
          onClick={() => handleDelete(index)}
        />
      </Tooltip>
    </Card>
  );
}
