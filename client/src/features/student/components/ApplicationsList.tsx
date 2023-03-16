import { Row, Col, Table } from "antd";
import { LoadingPage, FilterSortData } from "common";
import { useTranslation } from "react-i18next";
import useApplicationsList from "../hooks/useApplicationsList";

const ApplicationsList = () => {
  const { t } = useTranslation();

  const {
    isLoading,
    columns,
    handleTablePropsChange,
    applicationsList,
    fetchOptions,
    setFetchOptions,
  } = useApplicationsList();

  if (!applicationsList)
    return <LoadingPage message={t("FETCHING_APPLICATIONS")} />;
  return (
    <>
      <FilterSortData
        searchPrompt={t("SEARCH_COMPANY_NAME_OFFER_TITLE").toString()}
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
            dataSource={applicationsList.data}
            loading={isLoading}
            onChange={handleTablePropsChange}
            pagination={{
              ...fetchOptions.paginationParams,
              total: applicationsList.totalCount,
            }}
            bordered
            rowKey="_id"
          />
        </Col>
      </Row>
    </>
  );
};

export default ApplicationsList;
