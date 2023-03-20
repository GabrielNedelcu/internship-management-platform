import { Row, Col, Table } from "antd";
import { useTranslation } from "react-i18next";

import { LoadingPage, FilterSortData } from "common";
import useInternshipsList from "../hooks/useInternshipsList";

const InternshipsList = () => {
  const { t } = useTranslation();

  const {
    isLoading,
    columns,
    handleTablePropsChange,
    internshipsList,
    professorsList,
    fetchOptions,
    setFetchOptions,
  } = useInternshipsList();

  if (!internshipsList || !professorsList)
    return <LoadingPage message={t("FETCHING_INTERNSHIPS")} />;

  return (
    <>
      <FilterSortData
        searchPrompt={t("SEARCH_COMPANY_OFFER_STUDENT").toString()}
        handleSearch={(value: string) => {
          setFetchOptions({
            ...fetchOptions,
            searchValue: value,
            paginationParams: { ...fetchOptions.paginationParams, page: 1 },
          });
        }}
        handleClearSearch={() => {
          setFetchOptions({
            ...fetchOptions,
            searchValue: "",
            paginationParams: { ...fetchOptions.paginationParams, page: 1 },
          });
        }}
      />

      <Row gutter={[16, 16]}>
        <Col>
          <br />
          <Table
            columns={columns}
            dataSource={internshipsList.data}
            loading={isLoading}
            onChange={handleTablePropsChange}
            pagination={{
              ...fetchOptions.paginationParams,
              total: internshipsList.totalCount,
            }}
            bordered
            rowKey="_id"
          />
        </Col>
      </Row>
    </>
  );
};

export default InternshipsList;
