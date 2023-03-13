import useStudentsTable from "../../hooks/useStudentsTable";
import { Row, Col, Table, Input, Button } from "antd";
import { t } from "i18next";

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
            placeholder={t("SEARCH_STUDENT_EMAIL_NAME").toString()}
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
            {t("CLEAR_SEARCH")}
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
