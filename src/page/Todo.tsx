import React, { useState, useEffect } from "react";
import { Layout, Card, Row, Col } from "antd";
import TaskForm from "../components/taskform";
import TaskColumn from "../components/taskcolumn";
import { FileOutlined, StarOutlined, CheckOutlined } from "@ant-design/icons";

const { Content } = Layout;

const todo: React.FC = () => {
  const oldTasks = localStorage.getItem("tasks");
  const [tasks, setTasks] = useState<{ task: string; tags: string[]; status: string }[]>(
    JSON.parse(oldTasks || "[]")
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDelete = (taskIndex: number) => {
    const newTasks = tasks.filter((_, index) => index !== taskIndex);
    setTasks(newTasks);
  };


  return (
    <Layout className="min-h-screen bg-gray-50">
      <Content className="p-6">
        <Card className="mb-6 shadow-lg">
          <TaskForm setTasks={setTasks} />
        </Card>

        

        <Row gutter={[16, 16]} justify="space-evenly" className="mt-6">
          <Col span={8}>
            <TaskColumn
              title="To Do"
              icon={<FileOutlined className="text-xl" />}
              tasks={tasks}
              status="todo"
              handleDelete={handleDelete}
            />
          </Col>
          <Col span={8}>
            <TaskColumn
              title="Doing"
              icon={<StarOutlined className="text-xl" />}
              tasks={tasks}
              status="doing"
              handleDelete={handleDelete}
            />
          </Col>
          <Col span={8}>
            <TaskColumn
              title="Done"
              icon={<CheckOutlined className="text-xl" />}
              tasks={tasks}
              status="done"
              handleDelete={handleDelete}
            />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default todo;
