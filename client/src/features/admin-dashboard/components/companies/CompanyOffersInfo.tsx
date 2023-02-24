import { Input, Row, Col, Button, Table, Spin } from "antd";
import useOffersTable from "../../hooks/useOffersTable";
const { Search } = Input;

interface ICompanyGeneralInfoData {
  companyId: string;
}

const CompanyOffersInfo = ({ companyId }: ICompanyGeneralInfoData) => {
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
            placeholder="Search for offers by job title"
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

export default CompanyOffersInfo;
