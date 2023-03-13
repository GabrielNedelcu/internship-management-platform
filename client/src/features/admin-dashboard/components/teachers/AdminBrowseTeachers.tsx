import { Row, Col, Table, Input, Button } from "antd";
import { useTranslation } from "react-i18next";
import useTeachersTable from "../../hooks/useTeachersTable";

const { Search } = Input;

const AdminBrowseTeachers = () => {
  const { t } = useTranslation();

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
            placeholder={t("SEARCH_TEACHER_EMAIL_NAME").toString()}
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
            rowKey="_id"
          />
        </Col>
      </Row>
    </>
  );
};

export default AdminBrowseTeachers;
