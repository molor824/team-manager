import { UserDeleteOutlined, UsergroupDeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Space } from "antd";
import { useState } from "react";

type Props = {
  name: string;
  description: string;
  admin: boolean;
  loading: boolean;
  onDelete?: () => void;
};

export default function ProjectInfo({
  onDelete,
  name,
  description,
  admin,
  loading,
}: Props) {
  const [deleteModal, setDeleteModal] = useState(false);

  const handleProjectDelete = () => {
    setDeleteModal(false);
    onDelete && onDelete();
  };

  return (
    <div className="flex gap-4 min-w-[300px] justify-between">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-lg">{name}</h1>
        <p>{description}</p>
      </div>
      <div className="flex flex-col gap-2 items-end">
        <Button
          danger
          type="text"
          icon={admin ? <UsergroupDeleteOutlined /> : <UserDeleteOutlined />}
          onClick={() => setDeleteModal(true)}
          loading={loading}
        >
          {admin ? "Delete" : "Leave"}
        </Button>
        <Modal
          open={deleteModal}
          onCancel={() => setDeleteModal(false)}
          onClose={() => setDeleteModal(false)}
          title={<h1 className="text-lg">Delete project</h1>}
          footer={
            <Space>
              <Button onClick={() => setDeleteModal(false)}>Cancel</Button>
              <Button type="text" danger onClick={handleProjectDelete}>
                {admin ? "Delete" : "Leave"}
              </Button>
            </Space>
          }
        >
          <p>
            Are you sure you want to {admin ? "delete" : "leave"} this project?
          </p>
        </Modal>
      </div>
    </div>
  );
}
