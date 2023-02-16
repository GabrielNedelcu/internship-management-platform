import { Row, Col, Table, Input, Button } from "antd";
import useTeachersTable from "../../hooks/useTeachersTable";

const { Search } = Input;

const AdminBrowseTeachers = () => {
  const {
    tableData,
    columns,
    loading,
    searchText,
    handleChange,
    setSearchText,
    handleSearchBy,
    handleClearSearch,
  } = useTeachersTable();

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span="12">
          <Search
            placeholder="Search for teachers by email or name"
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

export default AdminBrowseTeachers;
