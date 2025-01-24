import { Button, Card, Form, Input } from "antd";
import Title from "antd/es/typography/Title";
import { useUser } from "../components/UserProvider";
import NonLogin from "../components/NonLogin";
import { putApi } from "../tools/fetchApi";
import { useState } from "react";

export default function EditProfilePage() {
  const { user, token } = useUser();
  const [loading, setLoading] = useState(false);
  const handleSubmit = (values: any) => {
    console.log(values);
    setLoading(true);
    putApi("/users/edit", values, token)
      .then(console.log)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  if (!user) {
    return <NonLogin />;
  }

  return (
    <Card className="max-w-[500px] mx-auto">
      <Title level={3}>Edit Profile</Title>
      <Title level={4}>{user.email}</Title>
      <Form
        className="mt-8"
        layout="vertical"
        onFinish={handleSubmit}
        disabled={loading}
      >
        <Form.Item
          label="Full Name"
          name="fullName"
          initialValue={user.fullName}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          initialValue={user.phoneNumber ?? ""}
          rules={[{ pattern: /^(\s|\d)*$/ }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
