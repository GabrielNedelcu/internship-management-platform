import { Row, Col, Spin } from "antd";
import { FilterSortData, LoadingPage, Pagination } from "common";
import { ICompanyCardData } from "common/types";
import { CompanyCard } from "../components";
import useCompaniesList from "../hooks/useCompaniesList";

const sortOptions = [
  { value: "asc.numOffers", label: "Offers Asc." },
  { value: "desc.numOffers", label: "Offers Desc." },
  { value: "asc.numPositions", label: "Positions Asc." },
  { value: "desc.numPositions", label: "Positions Desc." },
  { value: "asc.createdAt", label: "Latest" },
  { value: "desc.createdAt", label: "Oldest" },
  { value: "", label: "None" },
];

const CompaniesList = () => {
  const { companies, isLoading, fetchOptions, setFetchOptions } =
    useCompaniesList();

  if (!companies) return <LoadingPage message="Fetching companies .." />;

  return (
    <>
      <FilterSortData
        searchPrompt={"Search for company name"}
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

      <Spin spinning={isLoading} tip="Fetching companies ..." size="large">
        <Row gutter={[16, 16]}>
          {companies.data.map((cardData: ICompanyCardData) => {
            return (
              <Col span={8} key={cardData._id}>
                <CompanyCard companyData={cardData} />
              </Col>
            );
          })}
        </Row>

        <Pagination
          total={companies.totalCount}
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

export default CompaniesList;
