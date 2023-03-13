import { Row, Col, Spin } from "antd";
import { FilterSortData, LoadingPage, Pagination } from "common";
import { IOfferCardData } from "common/types";
import { useTranslation } from "react-i18next";
import { OfferCard } from "../components";
import useOffersList from "../hooks/useOffersList";

interface IOffersListProps {
  companyID?: string;
}

const OffersList = ({ companyID }: IOffersListProps) => {
  const { t } = useTranslation();

  const { offers, isLoading, fetchOptions, setFetchOptions } =
    useOffersList(companyID);

  const sortOptions = [
    { value: "asc.availablePos", label: `${"OFFERED_POSITIONS"} ${"ASC"}` },
    { value: "desc.availablePos", label: `${"OFFERED_POSITIONS"} ${"DESC"}` },
    {
      value: "asc.remainingAvailablePos",
      label: `${"AVAILABLE_POSITIONS"} ${"ASC"}`,
    },
    {
      value: "desc.remainingAvailablePos",
      label: `${"AVAILABLE_POSITIONS"} ${"DESC"}`,
    },
    { value: "asc.applications", label: `${"APPLICATIONS"} ${"ASC"}` },
    { value: "desc.applications", label: `${"APPLICATIONS"} ${"DESC"}` },
    { value: "asc.createdAt", label: t("LATEST") },
    { value: "desc.createdAt", label: t("OLDEST") },
    { value: "", label: t("NONE") },
  ];

  if (!offers) return <LoadingPage message={t("FETCHING_OFFERS")} />;

  return (
    <>
      <FilterSortData
        searchPrompt={t("SEARCH_OFFERS_TITLE_COMPANY")}
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

      <Spin spinning={isLoading} tip={t("FETCHING_OFFERS")} size="large">
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
