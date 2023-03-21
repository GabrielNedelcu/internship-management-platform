import { Row, Col, Table } from "antd";
import { LoadingPage, FilterSortData } from "common";
import { useTranslation } from "react-i18next";
import useProfessorsList from "../hooks/useProfessorsList";

const CompaniesList = () => {
  const { t } = useTranslation();

  const {
    isLoading,
    columns,
    handleTablePropsChange,
    professorsList,
    fetchOptions,
    setFetchOptions,
  } = useProfessorsList();

  if (!professorsList) return <LoadingPage message={t("FETCHING_COMPANIES")} />;

  return (
    <>
      <FilterSortData
        searchPrompt={t("SEARCH_TEACHER_EMAIL_NAME").toString()}
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
            dataSource={professorsList.data}
            loading={isLoading}
            onChange={handleTablePropsChange}
            pagination={{
              ...fetchOptions.paginationParams,
              total: professorsList.totalCount,
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
