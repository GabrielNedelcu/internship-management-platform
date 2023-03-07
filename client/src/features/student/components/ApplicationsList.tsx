import { Row, Col, Spin } from "antd";
import { LoadingPage, FilterSortData, Pagination } from "common";
import { IApplicationData } from "common/types";
import useApplicationsList from "../hooks/useApplicationsList";
import ApplicationCard from "./ApplicationCard";

const sortOptions = [
  { value: "asc.createdAt", label: "Oldest" },
  { value: "desc.createdAt", label: "Latest" },
  { value: "", label: "None" },
];

const ApplicationsList = () => {
  const {
    applications,
    isPageLoading,
    paginationParams,
    setPaginationParams,
    setSortOrder,
    setSearchValue,
  } = useApplicationsList();

  if (!applications) return <LoadingPage message="Fetching applications" />;

  return (
    <>
      <FilterSortData
        searchPrompt={"Search for company name or offer title"}
        handleSearch={(value: string) => {
          setSearchValue(value);
          setPaginationParams({ ...paginationParams, page: 1 });
        }}
        handleClearSearch={() => {
          setSearchValue("");
          setPaginationParams({ ...paginationParams, page: 1 });
        }}
        sortOptions={sortOptions}
        handleSortChange={setSortOrder}
      />

      <Spin
        spinning={isPageLoading}
        tip="Fetching applications ..."
        size="large"
      >
        <Row gutter={[16, 16]}>
          {applications.applications.map((cardData: IApplicationData) => {
            return (
              <Col span={8} key={cardData._id}>
                <ApplicationCard applicationData={cardData} />
              </Col>
            );
          })}
        </Row>

        <Pagination
          total={applications.totalApplications}
          handleChange={(page: number, pageSize: number) =>
            setPaginationParams({
              page,
              pageSize,
            })
          }
        />
      </Spin>
    </>
  );
};

export default ApplicationsList;
