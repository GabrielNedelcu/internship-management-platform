import { Typography, Row, Col, Statistic, Card, List, Button } from "antd";

const AdminStatsPage = () => {
  const data = [
    {
      title: "Company 1",
      description: "52 positions offered",
    },
    {
      title: "Company 2",
      description: "52 positions offered",
    },
    {
      title: "Company 3",
      description: "52 positions offered",
    },
  ];

  return (
    <>
      <Typography.Title level={1}>Statistics Overview</Typography.Title>
      <Typography.Title level={5} type={"secondary"}>
        Here is this year's internship program in numbers ...
      </Typography.Title>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Number Of Registered Students"
              value={870}
              valueStyle={{ color: "rgb(15, 28, 112)" }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Number Of Registered Professors"
              value={75}
              valueStyle={{ color: "rgb(15, 28, 112)" }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Number Of Registered Companies"
              value={40}
              valueStyle={{ color: "rgb(15, 28, 112)" }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Number Of Offers"
              value={870}
              valueStyle={{ color: "rgb(15, 28, 112)" }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Number Of Positions Offered"
              value={9.3}
              valueStyle={{ color: "rgb(15, 28, 112)" }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Number Of Available Positions Left"
              value={9.3}
              valueStyle={{ color: "rgb(15, 28, 112)" }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Number Of Job Applications "
              value={870}
              valueStyle={{ color: "rgb(15, 28, 112)" }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Number Of Students With Internships"
              value={9.3}
              valueStyle={{ color: "rgb(15, 28, 112)" }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Number Of Students Without Internships"
              value={9.3}
              valueStyle={{ color: "rgb(15, 28, 112)" }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Companies with the most positions offered">
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
        <Col span={8}>
          <Card title="Most desired companies">
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
        <Col span={8}>
          <Card title="Most desired offers">
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
        <Col span={8}>
          <Card title="Most Desired Fields Of Work">
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
    </>
  );
};

export default AdminStatsPage;
