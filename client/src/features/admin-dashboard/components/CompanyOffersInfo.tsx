import { Input, Row, Col, Button, Table, Spin } from "antd";
import { useTranslation } from "react-i18next";
import useOffersTable from "../hooks/useOffersTable";
const { Search } = Input;

interface ICompanyGeneralInfoData {
  companyId: string;
}

const CompanyOffersInfo = ({ companyId }: ICompanyGeneralInfoData) => {
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
  } = useOffersTable(companyId);

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span="12">
          <Search
            placeholder={t("SEARCH_OFFER_JOB_TITLE").toString()}
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

export default CompanyOffersInfo;
