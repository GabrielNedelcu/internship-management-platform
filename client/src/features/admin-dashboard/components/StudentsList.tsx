import { t } from "i18next";
import { Row, Col, Table } from "antd";

import { FilterSortData, LoadingPage } from "common";
import useStudentsList from "../hooks/useStudentsList";

const StudentsList = () => {
  const {
    isLoading,
    columns,
    fetchOptions,
    setFetchOptions,
    handleTablePropsChange,
    studentsList,
  } = useStudentsList();

  if (!studentsList) return <LoadingPage message={t("FETCHING_STUDENTS")} />;

  return (
    <>
      <FilterSortData
        searchPrompt={t("SEARCH_STUDENT_EMAIL_NAME").toString()}
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
            dataSource={studentsList.data}
            loading={isLoading}
            onChange={handleTablePropsChange}
            pagination={{
              ...fetchOptions.paginationParams,
              total: studentsList.totalCount,
            }}
            bordered
            rowKey="_id"
          />
        </Col>
      </Row>
    </>
  );
};

export default StudentsList;
