import { Button, Drawer, Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { postApi } from "../tools/fetchApi";
import { useUser } from "./UserProvider";
import { useRequest } from "ahooks";

type Props = {
  open: boolean;
  projectId: number;
  onClose?: () => void;
};

type TaskForm = {
  title: string;
  description?: string;
  status: string;
  projectId: number;
};

export default function NewTaskDrawer({ open, projectId, onClose }: Props) {
  const { token } = useUser();
  const { run, loading, error } = useRequest(
    (value: Omit<TaskForm, "projectId">) =>
      postApi("/work", { ...value, projectId }, token)
        .then(() => onClose && onClose())
        .catch(() =>
          Promise.reject(new Error(`Task with title "${value.title}" already exists`))
        ),
    { manual: true }
  );

  return (
    <Drawer open={open} onClose={onClose} title="Create New Task">
      <Form layout="vertical" disabled={loading} onFinish={run}>
        {error && <p className="text-red-500">{error.message}</p>}
        
        <Form.Item
          name="title"
          label="Task Title"
          rules={[{ min: 3, message: "Title must be at least 3 characters" }, { required: true }]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item name="description" label="Task Description">
          <TextArea size="large" />
        </Form.Item>

        <Form.Item name="status" label="Task Status" initialValue="50">
          <Select>
            <Select.Option value="0">Not Started</Select.Option>
            <Select.Option value="50">In Progress</Select.Option>
            <Select.Option value="100">Completed</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Create Task
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
}
