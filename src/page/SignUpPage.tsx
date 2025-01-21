import { Button, Card, Form, Input } from "antd";
import { useState } from "react";
import { API_URL } from "../main";
import { useUser } from "../components/UserProvider";
import { useNavigate } from "react-router-dom";

type FormType = {
  email: string;
  fullName: string;
  phoneNumber: string;
  password: string;
};
export default function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const { setToken } = useUser();
  const navigate = useNavigate();
  const handleOnFinish = (data: FormType) => {
    setLoading(true);
    fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => (res.status < 400 ? res.json() : Promise.reject(res)))
      .then((res) => {
        console.log(res);
        setToken(res.token);
        navigate("/");
      })
      .catch(console.error);
  };

  return (
    <Card>
      <Form
        autoComplete="off"
        name="basic"
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
            {
              validator: async (_, value) => {
                return fetch(`${API_URL}/auth/exists?user=${value}`)
                  .then((res) => res.text())
                  .then((res) =>
                    res === "true" ? Promise.reject() : Promise.resolve()
                  );
              },
              message: "This E-Mail already exists!",
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

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
