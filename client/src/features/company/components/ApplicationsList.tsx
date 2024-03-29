import { Button, Col, Row, Table } from "antd";
import { useTranslation } from "react-i18next";
import { DownloadOutlined } from "@ant-design/icons";

import { FilterSortData, LoadingPage } from "common";
import useApplicationsList from "../hooks/useApplicationsList";

interface IApplicationsTableProps {
  offerId?: string;
}

const ApplicationsList = ({ offerId }: IApplicationsTableProps) => {
  const { t } = useTranslation();

  const {
    isLoading,
    columns,
    handleTablePropsChange,
    applicationsList,
    fetchOptions,
    setFetchOptions,
    handleDownloadCVs,
  } = useApplicationsList(offerId);

  if (!applicationsList)
    return <LoadingPage message={t("FETCHING_APPLICATIONS")} />;
  return (
    <>
      <FilterSortData
        searchPrompt={t("SEARCH_STUDENT_NAME").toString()}
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

      <br />
      <Button
        icon={<DownloadOutlined />}
        size="large"
        onClick={handleDownloadCVs}
      >
        {t("DOWNLOAD_CV_ZIP")}
      </Button>

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
