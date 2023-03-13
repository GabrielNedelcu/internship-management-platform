import { Row, Col, Spin } from "antd";
import { FilterSortData, LoadingPage, Pagination } from "common";
import { ICompanyCardData } from "common/types";
import { useTranslation } from "react-i18next";
import { CompanyCard } from "../components";
import useCompaniesList from "../hooks/useCompaniesList";

const CompaniesList = () => {
  const { companies, isLoading, fetchOptions, setFetchOptions } =
    useCompaniesList();

  const { t } = useTranslation();

  const sortOptions = [
    { value: "asc.numOffers", label: `${t("OFFERS")} ${t("ASC")}` },
    { value: "desc.numOffers", label: `${t("OFFERS")} ${t("DESC")}` },
    { value: "asc.numPositions", label: `${t("POSITIONS")} ${t("ASC")}` },
    { value: "desc.numPositions", label: `${t("POSITIONS")} ${t("DESC")}` },
    { value: "asc.createdAt", label: t("LATEST") },
    { value: "desc.createdAt", label: t("OLDEST") },
    { value: "", label: t("NONE") },
  ];

  if (!companies) return <LoadingPage message={t("FETCHING_COMPANIES")} />;

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

      <Spin spinning={isLoading} tip={t("FETCHING_COMPANIES")} size="large">
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
