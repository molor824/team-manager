import { Button, Drawer, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { postApi } from "../tools/fetchApi";
import { useUser } from "./UserProvider";

type Props = {
  open: boolean;
  onClose?: () => void;
};
type Form = {
  name: string;
  description?: string;
};

export default function NewProjectDrawer({ open, onClose }: Props) {
  const [loading, setLoading] = useState(false);
  const [failMessage, setFailMessage] = useState("");
  const { token } = useUser();

  const handleForm = (value: Form) => {
    setLoading(true);
    setFailMessage("");

    postApi("/projects", value, token)
      .then((res) => console.log(res))
      .catch((res) => {
        if (res.status === 409) {
          setFailMessage(`Team with name ${value.name} already exists.`);
          setLoading(false);
        }
      })
      .finally(() => onClose && onClose());
  };

  return (
    <Drawer open={open} onClose={onClose} title="Create new project">
      <Form layout="vertical" disabled={loading} onFinish={handleForm}>
        {failMessage && <p className="text-red-500">{failMessage}</p>}
        <Form.Item
          name="name"
          label="Project Name"
          rules={[{ min: 3 }, { required: true }]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item name="description" label="Project Description">
          <TextArea size="large" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Create
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
}
