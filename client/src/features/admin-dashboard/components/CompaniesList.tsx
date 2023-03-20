import { Row, Col, Table } from "antd";
import { LoadingPage, FilterSortData } from "common";
import { useTranslation } from "react-i18next";
import useCompaniesList from "../hooks/useCompaniesList";

interface ICompaniesListProps {
  validatedOnly: boolean;
}

const CompaniesList = ({ validatedOnly }: ICompaniesListProps) => {
  const { t } = useTranslation();

  const {
    isLoading,
    columns,
    handleTablePropsChange,
    companiesList,
    fetchOptions,
    setFetchOptions,
  } = useCompaniesList(validatedOnly);

  if (!companiesList) return <LoadingPage message={t("FETCHING_COMPANIES")} />;

  return (
    <>
      <FilterSortData
        searchPrompt={t("SEARCH_COMPANIES_NAME_EMAIL").toString()}
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
            dataSource={companiesList.data}
            loading={isLoading}
            onChange={handleTablePropsChange}
            pagination={{
              ...fetchOptions.paginationParams,
              total: companiesList.totalCount,
            }}
            bordered
            rowKey="_id"
          />
        </Col>
      </Row>
    </>
  );
};

export default CompaniesList;
