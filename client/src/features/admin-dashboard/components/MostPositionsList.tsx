import { useTranslation } from "react-i18next";
import { Button, Card, Col, List, notification } from "antd";
import { useQuery } from "@tanstack/react-query";

import { ICompanyData, IServerResponseMultipleFetch } from "common/types";
import { getAllCompanies } from "../api";
import { LoadingPage } from "common";

const MostPositionsList = () => {
  const { t } = useTranslation();

  const { data: companiesList } = useQuery<IServerResponseMultipleFetch>(
    ["getMostOffersCompanies"],
    () => {
      return getAllCompanies(
        "",
        {
          fields: "name,fieldOfWork,numOffers,numPositions",
          pagination: { page: 1, pageSize: 3 },
          sort: "desc.numPositions",
        },
        true
      );
    },
    {
      onError: () => {
        notification.error({
          message: "Ooops ...",
          description: t("CANNOT_RETRIEVE_COMPANIES"),
          duration: 10,
        });
      },
    }
  );

  if (!companiesList) return <LoadingPage message="" />;

  return (
    <>
      <Col span={8}>
        <Card title={t("COMPANIES_MOST_POSITIONS")}>
          <List
            itemLayout="horizontal"
            dataSource={companiesList.data}
            renderItem={(company: ICompanyData) => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <a href={`/dashboard/admin/company/${company._id}`}>
                      {company.name}
                    </a>
                  }
                  description={`${company.numPositions} ${t("POSITIONS")}`}
                />
              </List.Item>
            )}
          />
          <Button type="primary" block href="/dashboard/admin/companies">
            {t("VIEW_MORE")}
          </Button>
        </Card>
      </Col>
    </>
  );
};

export default MostPositionsList;
