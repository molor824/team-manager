import { Button, Card, Form, Input } from "antd";
import { useUser } from "../components/UserProvider";
import { Link, useNavigate } from "react-router-dom";
import { postApi } from "../tools/fetchApi";
import { useRequest } from "ahooks";

export default function SignUpPage() {
  const { setToken } = useUser();
  const navigate = useNavigate();
  const { loading, run, error } = useRequest(
    (data: any) =>
      postApi("/auth/signup", data)
        .then((res) => {
          setToken(res.token);
          navigate("/");
        })
        .catch(() => Promise.reject(new Error("Account already exists!"))),
    { manual: true }
  );

  return (
    <Card className="max-w-[400px] mx-auto">
      <h1 className="text-4xl font-bold">Create an account</h1>
      <div className="flex gap-2">
        <p>Already have an account?</p>
        <Link to="/login" className="text-blue-500 hover:underline">
          Log In
        </Link>
      </div>
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
          validateFirst
          rules={[
            {
              required: true,
              message: "The input is required!",
            },
            {
              type: "email",
              message: "The input is not a valid E-Mail!",
            },
          ]}
        >
          <Input placeholder="example@mail.com" />
        </Form.Item>
        <Form.Item
          label="Full Name"
          name="fullName"
          rules={[
            {
              required: true,
              message: "The input is required!",
            },
          ]}
        >
          <Input placeholder="Full Name" />
        </Form.Item>
        <Form.Item
          label="Phone Number [Optional]"
          name="phoneNumber"
          rules={[
            {
              pattern: /^(\s|\d)*$/,
              message: "Please input a valid phone number!",
            },
          ]}
        >
          <Input
            prefix={<span>+</span>}
            placeholder="123456789"
            className="max-w-[200px]"
          />
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
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
