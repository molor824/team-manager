import { useRequest } from "ahooks";
import { Button, Modal } from "antd";
import { useUser } from "./UserProvider";
import { deleteApi } from "../tools/fetchApi";
import { useState } from "react";

type Props = {
  projectId: number;
  memberId: number;
  onRemove?: () => void;
};
export default function MemberRemove({ projectId, memberId, onRemove }: Props) {
  const { token } = useUser();
  const { loading, run } = useRequest(
    () =>
      deleteApi(`/projects/${projectId}/member/${memberId}`, token).then(() => {
        setOpenModal(false);
        onRemove && onRemove();
      }),
    { manual: true }
  );
  const [openModal, setOpenModal] = useState(false);
  const closeModal = () => setOpenModal(false);

  return (
    <>
      <Button
        danger
        type="text"
        onClick={() => setOpenModal(true)}
        loading={loading}
      >
        Remove
      </Button>
      <Modal
        open={openModal}
        title={<h1 className="text-lg">Remove member</h1>}
        okText="Yes"
        okButtonProps={{ loading }}
        cancelText="No"
        onClose={closeModal}
        onCancel={closeModal}
        onOk={run}
      >
        Are you sure you want to remove team member?
      </Modal>
    </>
  );
}
