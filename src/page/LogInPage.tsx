import { Button, Card, Form, Input, Space } from "antd";
import { useState } from "react";
import { postApi } from "../tools/fetchApi";
import { useUser } from "../components/UserProvider";
import { Link, useNavigate } from "react-router-dom";

export default function LogInPage() {
  const [loading, setLoading] = useState(false);
  const [invalidAccount, setInvalidAccount] = useState(false);
  const { setToken } = useUser();
  const navigate = useNavigate();
  const handleOnFinish = (value: any) => {
    setLoading(true);
    setInvalidAccount(false);
    console.log(value);
    postApi("/auth/login", value)
      .then((res) => {
        console.log(res);
        setToken(res.token);
        navigate("/");
      })
      .catch((_) => {
        setLoading(false);
        setInvalidAccount(true);
      });
  };

  return (
    <Card className="max-w-[400px] mx-auto">
      <h1 className="text-4xl font-bold">Create an account</h1>
      <Space>
        <p>Don't have an account?</p>
        <Link to="/signup" className="text-blue-500 hover:underline">
          Sign Up
        </Link>
      </Space>
      <p className="text-red-500" hidden={!invalidAccount}>
        Invalid account or password!
      </p>
      <Form
        className="mt-8"
        layout="vertical"
        onFinish={handleOnFinish}
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
