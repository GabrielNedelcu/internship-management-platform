import { Typography, Button } from "antd";
import useOffersTable from "../hooks/useOffersTable";
import { Row, Col, Table, Input } from "antd";

const { Search } = Input;

const AdminCompanyOffersPage = () => {
  const {
    loading,
    tableData,
    columns,
    searchText,
    handleChange,
    setSearchText,
    handleSearchBy,
    handleClearSearch,
  } = useOffersTable();

  return (
    <>
      <Typography.Title level={1}>Company Offers</Typography.Title>
      <Typography.Title level={5} type={"secondary"}>
        View, edit and delete company offers ...
      </Typography.Title>

      <Row gutter={[16, 16]}>
        <Col span="12">
          <Search
            placeholder="Search for offers by job title or company name"
            onSearch={handleSearchBy}
            enterButton
            size="large"
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            value={searchText}
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
            onChange={handleChange}
            loading={loading}
            bordered
            rowKey="_id"
          />
        </Col>
      </Row>
    </>
  );
};

export default AdminCompanyOffersPage;
