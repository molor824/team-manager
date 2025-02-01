import { UserAddOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { Button, Form, Input, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { getApi, putApi } from "../tools/fetchApi";
import { User, useUser } from "./UserProvider";

type Props = {
  projectId: number;
  onInvite?: () => void;
};
export default function MemberInvite({ projectId, onInvite }: Props) {
  const { token } = useUser();
  const [showModal, setShowModal] = useState(false);
  const [form] = useForm();
  const { loading, run } = useRequest(
    ({ email }: { email: string }) =>
      getApi(`/users/email?v=${email}`, token)
        .then((res: User) =>
          putApi(`/projects/${projectId}/member/${res.id}`, null, token)
        )
        .then(() => {
          setShowModal(false);
          onInvite?.();
        })
        .catch((_) => Promise.reject(new Error("User not found"))),
    {
      manual: true,
      onError: (e) => form.setFields([{ name: "email", errors: [e.message] }]),
    }
  );

  const closeModal = () => setShowModal(false);

  return (
    <>
      <Button
        type="primary"
        icon={<UserAddOutlined />}
        loading={loading}
        onClick={() => setShowModal(true)}
      >
        Invite
      </Button>
      <Modal
        open={showModal}
        title={<h1 className="text-lg">Invite to your team</h1>}
        okText="Invite"
        cancelText="Cancel"
        onCancel={closeModal}
        onClose={closeModal}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={run} disabled={loading}>
          <Form.Item
            label="E-Mail"
            name="email"
            rules={[{ required: true }, { type: "email" }]}
          >
            <Input placeholder="example@mail.com"></Input>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ background: "#59ffb2" }}
              icon={<UserAddOutlined />}
              loading={loading}
            >
              Invite
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
