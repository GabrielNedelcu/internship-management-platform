import { Row, Col, Spin } from "antd";
import { FilterSortData, LoadingPage, Pagination } from "common";
import { IOfferCardData } from "common/types";
import { OfferCard } from "../components";
import useOffersList from "../hooks/useOffersList";

const sortOptions = [
  { value: "asc.availablePos", label: "Positions Offered Asc." },
  { value: "desc.availablePos", label: "Positions Offered Desc." },
  { value: "asc.remainingAvailablePos", label: "Positions Available Asc." },
  { value: "desc.remainingAvailablePos", label: "Positions Available Desc." },
  { value: "asc.applications", label: "Applications Asc." },
  { value: "desc.applications", label: "Applications Desc." },
  { value: "asc.createdAt", label: "Latest" },
  { value: "desc.createdAt", label: "Oldest" },
  { value: "", label: "None" },
];

const OffersList = () => {
  const { data, loading, setPagination, setSort, setFilter } = useOffersList();

  if (!data) return <LoadingPage message="Fetching offers .." />;

  return (
    <>
      <FilterSortData
        searchPrompt={"Search for offer title or company name"}
        handleSearch={setFilter}
        handleClearSearch={() => setFilter("")}
        sortOptions={sortOptions}
        handleSortChange={setSort}
      />

      <Spin spinning={loading} tip="Fetching offers ..." size="large">
        <Row gutter={[16, 16]}>
          {data.offers.map((cardData: IOfferCardData) => {
            return (
              <Col span={8} key={cardData._id}>
                <OfferCard offerData={cardData} />
              </Col>
            );
          })}
        </Row>

        <Pagination
          total={data.totalOffers}
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

export default OffersList;
