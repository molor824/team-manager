import { Button, Card, Form, Input, Space } from "antd";
import { postApi } from "../tools/fetchApi";
import { useUser } from "../components/UserProvider";
import { Link, useNavigate } from "react-router-dom";
import { useRequest } from "ahooks";

export default function LogInPage() {
  const { setToken } = useUser();
  const navigate = useNavigate();
  const { run, loading, error } = useRequest(
    (value: any) =>
      postApi("/auth/login", value)
        .then((res) => {
          setToken(res.token);
          navigate("/");
        })
        .catch(() => Promise.reject(new Error("Invalid account or password!"))),
    { manual: true }
  );

  return (
    <Card className="max-w-[400px] mx-auto">
      <h1 className="text-4xl font-bold">Log In</h1>
      <Space>
        <p>Don't have an account?</p>
        <Link to="/signup" className="text-blue-500 hover:underline">
          Sign Up
        </Link>
      </Space>
      {error && <p className="text-red-500">{error.message}</p>}
      <Form
        className="mt-8"
        layout="vertical"
        onFinish={run}
        disabled={loading}
      >
        <Form.Item
          label="E-Mail"
          name="email"
          rules={[
            {
              type: "email",
              message: "The input is not a valid E-Mail!",
            },
            {
              required: true,
              message: "The input is required!",
            },
          ]}
        >
          <Input placeholder="example@mail.com" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              min: 8,
              message: "Password must have minimum of 8 characters!",
            },
          ]}
        >
          <Input.Password placeholder="..." visibilityToggle />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Log In
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
