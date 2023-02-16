import { Typography, Button } from "antd";
import useCompanyTable from "../hooks/useCompanyTable";
import { Row, Col, Table, Input } from "antd";

const { Search } = Input;

const AdminCompaniesPage = () => {
  const {
    loading,
    columns,
    tableData,
    searchText,
    handleChange,
    setSearchText,
    handleSearchBy,
    handleClearSearch,
  } = useCompanyTable(true);

  return (
    <>
      <Typography.Title level={1}>Companies List</Typography.Title>
      <Typography.Title level={5} type={"secondary"}>
        View, edit or delete companies from the internship program ...
      </Typography.Title>

      <Row gutter={[16, 16]}>
        <Col span="12">
          <Search
            placeholder="Search for companies by name or account email"
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
            loading={loading}
            onChange={handleChange}
            bordered
            rowKey="_id"
          />
        </Col>
      </Row>
    </>
  );
};

export default AdminCompaniesPage;
