import { Typography, Row, Col, Card, List, Button } from "antd";
import { useTranslation } from "react-i18next";
import { Stats } from "../components";

const Overview = () => {
  const { t } = useTranslation();

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
      <Typography.Title level={1}>{t("OVERVIEW")}</Typography.Title>
      <Typography.Title level={5} type={"secondary"}>
        {t("ADMIN_OVERVIEW_MSG")}
      </Typography.Title>

      <Row gutter={[16, 16]}>
        <Stats />

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
export default Overview;
