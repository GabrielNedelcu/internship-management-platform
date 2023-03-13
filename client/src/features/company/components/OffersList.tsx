import { Row, Col, Spin } from "antd";
import { FilterSortData, LoadingPage, Pagination } from "common";
import { IOfferCardData } from "common/types";
import { useTranslation } from "react-i18next";
import { OfferCard } from ".";
import useOffersList from "../hooks/useOffersList";

interface IOffersListProps {
  companyID?: string;
}

const OffersList = () => {
  const { t } = useTranslation();

  const { offers, isLoading, fetchOptions, setFetchOptions } = useOffersList();

  const sortOptions = [
    {
      value: "asc.availablePos",
      label: `${t("OFFERED_POSITIONS")} ${t("ASC")}`,
    },
    {
      value: "desc.availablePos",
      label: `${t("OFFERED_POSITIONS")} ${t("DESC")}`,
    },
    {
      value: "asc.remainingAvailablePos",
      label: `${t("AVAILABLE_POSITIONS")} ${t("ASC")}`,
    },
    {
      value: "desc.remainingAvailablePos",
      label: `${t("AVAILABLE_POSITIONS")} ${t("ASC")}`,
    },
    {
      value: "asc.applications",
      label: `${t("APPLICATIONS")} ${t("DESC")}`,
    },
    {
      value: "desc.applications",
      label: `${t("APPLICATIONS")} ${t("DESC")}`,
    },
    { value: "asc.createdAt", label: t("LATEST") },
    { value: "desc.createdAt", label: t("OLDEST") },
    { value: "", label: t("NONE") },
  ];

  if (!offers) return <LoadingPage message={t("FETCHING_OFFERS")} />;

  return (
    <>
      <FilterSortData
        searchPrompt={t("SEARCH_OFFER_TITLE")}
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
