import { Row, Col, Spin } from "antd";
import { FilterSortData, LoadingPage, Pagination } from "common";
import { IOfferCardData } from "common/types";
import { OfferCard } from "../components";
import useOffersList from "../hooks/useOffersList";

interface IOffersListProps {
  companyID?: string;
}

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

const OffersList = ({ companyID }: IOffersListProps) => {
  const { offers, isLoading, fetchOptions, setFetchOptions } =
    useOffersList(companyID);

  if (!offers) return <LoadingPage message="Fetching offers .." />;

  return (
    <>
      <FilterSortData
        searchPrompt={"Search for offer title or company name"}
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

      <Spin spinning={isLoading} tip="Fetching offers ..." size="large">
        <Row gutter={[16, 16]}>
          {offers.data.map((cardData: IOfferCardData) => {
            return (
              <Col span={8} key={cardData._id}>
                <OfferCard offerData={cardData} />
              </Col>
            );
          })}
        </Row>

        <Pagination
          total={offers.totalCount}
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

export default OffersList;
