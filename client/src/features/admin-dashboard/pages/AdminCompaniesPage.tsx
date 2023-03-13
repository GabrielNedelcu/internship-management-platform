import { Typography, Button } from "antd";
import useCompanyTable from "../hooks/useCompanyTable";
import { Row, Col, Table, Input } from "antd";
import { useTranslation } from "react-i18next";

const { Search } = Input;

const AdminCompaniesPage = () => {
  const { t } = useTranslation();

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
      <Typography.Title level={1}>{t("COMPANIES_LIST")}</Typography.Title>
      <Typography.Title level={5} type={"secondary"}>
        {t("VIEW_EDIT_COMPANIES")}
      </Typography.Title>

      <Row gutter={[16, 16]}>
        <Col span="12">
          <Search
            placeholder={t("SEARCH_COMPANIES_NAME_EMAIL").toString()}
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

export default AdminCompaniesPage;
