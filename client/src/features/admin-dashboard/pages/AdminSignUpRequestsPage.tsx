import { Typography, Button } from "antd";
import useCompanyTable from "../hooks/useCompanyTable";
import { Row, Col, Table, Input } from "antd";

const { Search } = Input;

const AdminSignUpRequestsPage = () => {
  const {
    tableData,
    columns,
    status,
    searchText,
    handleChange,
    setSearchText,
    handleSearchBy,
    handleClearSearch,
  } = useCompanyTable(false);

  return (
    <>
      {""}
      <Typography.Title level={1}>Sign Up Requests</Typography.Title>
      <Typography.Title level={5} type={"secondary"}>
        Review company sign up requests ...
      </Typography.Title>
      <Row gutter={[16, 16]}>
        <Col span="12">
          <Search
            placeholder="Search for requests by company name"
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            value={searchText}
            onSearch={handleSearchBy}
            enterButton
            size="large"
          />
        </Col>
        <Col style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button size="large" type="primary" onClick={handleClearSearch}>
            Clear Search
          </Button>
        </Col>
        <Col>
          <Table
            columns={columns}
            dataSource={tableData}
            loading={status === "loading"}
            onChange={handleChange}
            bordered
            rowKey="_id"
          />
        </Col>
      </Row>
    </>
  );
};

export default AdminSignUpRequestsPage;
