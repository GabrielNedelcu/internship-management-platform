import useStudentsTable from "../../hooks/useStudentsTable";
import { Row, Col, Table, Input, Button } from "antd";

const { Search } = Input;

const AdminBrowseStudents = () => {
  const {
    tableData,
    columns,
    loading,
    searchText,
    handleChange,
    setSearchText,
    handleSearchBy,
    handleClearSearch,
  } = useStudentsTable();

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span="12">
          <Search
            placeholder="Search for students by name or email"
            onSearch={handleSearchBy}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            enterButton
            size="large"
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
            loading={loading}
            onChange={handleChange}
            bordered
          />
        </Col>
      </Row>
    </>
  );
};

export default AdminBrowseStudents;
