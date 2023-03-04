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
  const { data, loading, pagination, setPagination, setSort, setFilter } =
    useCompaniesList();

  if (!data) return <LoadingPage message="Fetching companies .." />;

  return (
    <>
      <FilterSortData
        searchPrompt={"Search for company name"}
        handleSearch={(value: string) => {
          setFilter(value);
          setPagination({ ...pagination, page: 1 });
        }}
        handleClearSearch={() => {
          setFilter("");
          setPagination({ ...pagination, page: 1 });
        }}
        sortOptions={sortOptions}
        handleSortChange={setSort}
      />

      <Spin spinning={loading} tip="Fetching companies ..." size="large">
        <Row gutter={[16, 16]}>
          {data.companies.map((cardData: ICompanyCardData) => {
            return (
              <Col span={8} key={cardData._id}>
                <CompanyCard companyData={cardData} />
              </Col>
            );
          })}
        </Row>

        <Pagination
          total={data.totalCompanies}
          handleChange={(page: number, pageSize: number) =>
            setPagination({
              page,
              pageSize,
            })
          }
        />
      </Spin>
    </>
  );
};

export default CompaniesList;
