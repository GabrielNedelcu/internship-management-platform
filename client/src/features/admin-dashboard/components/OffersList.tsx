import { Col, Row, Table } from "antd";
import { useTranslation } from "react-i18next";

import { FilterSortData, LoadingPage } from "common";
import useOffersList from "../hooks/useOffersList";

interface IOffersListProps {
  companyId?: string;
}

const OffersList = ({ companyId }: IOffersListProps) => {
  const { t } = useTranslation();

  const {
    isLoading,
    columns,
    handleTablePropsChange,
    offersList,
    fetchOptions,
    setFetchOptions,
  } = useOffersList(companyId);

  if (!offersList) return <LoadingPage message={t("FETCHING_OFFERS")} />;

  return (
    <>
      <FilterSortData
        searchPrompt={t("SEARCH_OFFERS_TITLE_COMPANY").toString()}
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
            dataSource={offersList.data}
            loading={isLoading}
            onChange={handleTablePropsChange}
            pagination={{
              ...fetchOptions.paginationParams,
              total: offersList.totalCount,
            }}
            bordered
            rowKey="_id"
          />
        </Col>
      </Row>
    </>
  );
};

export default OffersList;
