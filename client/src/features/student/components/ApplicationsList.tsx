import { Row, Col, Spin } from "antd";
import { LoadingPage, FilterSortData, Pagination } from "common";
import { IApplicationData } from "common/types";
import { useTranslation } from "react-i18next";
import useApplicationsList from "../hooks/useApplicationsList";
import ApplicationCard from "./ApplicationCard";

const sortOptions = [
  { value: "asc.createdAt", label: "Oldest" },
  { value: "desc.createdAt", label: "Latest" },
  { value: "", label: "None" },
];

const ApplicationsList = () => {
  const { t } = useTranslation();

  const { applications, isLoading, fetchOptions, setFetchOptions } =
    useApplicationsList();

  if (!applications)
    return <LoadingPage message={t("FETCHING_APPLICATIONS")} />;

  return (
    <>
      <FilterSortData
        searchPrompt={t("SEARCH_COMPANY_NAME_OFFER_TITLE")}
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
        sortOptions={sortOptions}
        handleSortChange={(value: string) => {
          setFetchOptions({ ...fetchOptions, sortOrder: value });
        }}
      />

      <Spin spinning={isLoading} tip={t("FETCHING_APPLICATIONS")} size="large">
        <Row gutter={[16, 16]}>
          {applications.data.map((cardData: IApplicationData) => {
            return (
              <Col span={8} key={cardData._id}>
                <ApplicationCard applicationData={cardData} />
              </Col>
            );
          })}
        </Row>

        <Pagination
          total={applications.totalCount}
          handleChange={(page: number, pageSize: number) =>
            setFetchOptions({
              ...fetchOptions,
              paginationParams: {
                page,
                pageSize,
              },
            })
          }
        />
      </Spin>
    </>
  );
};

export default ApplicationsList;
