import { Button, Card, Form, Input } from "antd";
import { getApi } from "../tools/fetchApi";

export default function LogInPage() {
  const handleOnFinish = (value: any) => {
    console.log(value);
  };

  return (
    <Card>
      <Form autoComplete="off" layout="vertical" onFinish={handleOnFinish}>
        <Form.Item
          label="E-Mail"
          name="email"
          validateFirst
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
              validator: (_, value) =>
                getApi(`/auth/exists?user=${value}`).then((res) =>
                  res === true ? Promise.resolve() : Promise.reject()
                ),
              message: "This E-Mail does not have an account!",
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
          <Button type="primary" htmlType="submit">
            Log In
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
