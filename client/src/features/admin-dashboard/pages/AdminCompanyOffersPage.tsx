import { Typography, Button } from "antd";
import useOffersTable from "../hooks/useOffersTable";
import { Row, Col, Table, Input } from "antd";
import { useTranslation } from "react-i18next";

const { Search } = Input;

const AdminCompanyOffersPage = () => {
  const { t } = useTranslation();

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
      <Typography.Title level={1}>{t("COMPANY_OFFERS")}</Typography.Title>
      <Typography.Title level={5} type={"secondary"}>
        {t("VIEW_EDIT_OFFERS")}
      </Typography.Title>

      <Row gutter={[16, 16]}>
        <Col span="12">
          <Search
            placeholder={t("SEARCH_OFFERS_TITLE_COMPANY").toString()}
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
            {t("CLEAR_SEARCH")}
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
