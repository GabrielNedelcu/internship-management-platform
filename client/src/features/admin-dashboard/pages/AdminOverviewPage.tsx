import { Typography, Row, Col, Statistic, Button, Card, List } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";

const { Title } = Typography;

const AdminOverviewPage = () => {
  const data = [
    {
      title: "Company 1",
      description: "Applied on 31/12/2022",
    },
    {
      title: "Company 2",
      description: "Applied on 31/12/2022",
    },
    {
      title: "Company 3",
      description: "Applied on 31/12/2022",
    },
  ];

  return (
    <div>
      <Title level={1}>Welcome Back, Admin!</Title>
      <Title level={5} type={"secondary"}>
        Here is what's been going in the last 7 days ...
      </Title>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card>
            <Statistic
              title="New Companies To Be Validated"
              value={3}
              precision={0}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic
              title="New Offers"
              value={16}
              precision={0}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic
              title="New Documents To Be Validated"
              value={1}
              precision={0}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic
              title="New Student Job Applications"
              value={45}
              precision={0}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Latest Company Sign-Up Requests">
            <List
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={<a href="https://ant.design">{item.title}</a>}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
            <Button type="primary" block>
              View Full List
            </Button>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Latest Documents To Be Validated">
            <List
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={<a href="https://ant.design">{item.title}</a>}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
            <Button type="primary" block>
              View Full List
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminOverviewPage;
