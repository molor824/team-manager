import { Button, Drawer, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { postApi } from "../tools/fetchApi";
import { useUser } from "./UserProvider";
import { useRequest } from "ahooks";

type Props = {
  open: boolean;
  onClose?: () => void;
};
type Form = {
  name: string;
  description?: string;
};

export default function NewProjectDrawer({ open, onClose }: Props) {
  const { token } = useUser();
  const { run, loading, error } = useRequest(
    (value: Form) =>
      postApi("/projects", value, token)
        .then(() => onClose && onClose())
        .catch(() =>
          Promise.reject(
            new Error(`Project with name ${value.name} already exists`)
          )
        ),
    { manual: true }
  );

  return (
    <Drawer open={open} onClose={onClose} title="Create new project">
      <Form layout="vertical" disabled={loading} onFinish={run}>
        {error && <p className="text-red-500">{error.message}</p>}
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
