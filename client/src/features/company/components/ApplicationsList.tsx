import { Col, Row, Table } from "antd";
import { FilterSortData, LoadingPage } from "common";
import useApplicationsList from "../hooks/useApplicationsList";

interface IApplicationsTableProps {
  offerId?: string;
}

const ApplicationsList = ({ offerId }: IApplicationsTableProps) => {
  const {
    isLoading,
    columns,
    handleTablePropsChange,
    applicationsList,
    fetchOptions,
    setFetchOptions,
  } = useApplicationsList(offerId);

  if (!applicationsList) return <LoadingPage message="Fetching applications" />;
  return (
    <>
      <FilterSortData
        searchPrompt={"Search for student name"}
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
