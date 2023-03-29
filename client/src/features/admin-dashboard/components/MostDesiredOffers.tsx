import { Button, Card, Col, List, notification } from "antd";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";

import { getOffers } from "../api";
import { IOfferData, IServerResponseMultipleFetch } from "common/types";
import { LoadingPage } from "common";

const MostDesiredOffers = () => {
  const { t } = useTranslation();

  const { data: offersList } = useQuery<IServerResponseMultipleFetch>(
    ["getOffers"],
    () => {
      return getOffers("", {
        fields:
          "companyID,title,companyName,description,departament,availablePos,remainingAvailablePos,applications",
        pagination: { page: 1, pageSize: 3 },
        sort: "desc.applications",
      });
    },
    {
      onError: () => {
        notification.error({
          message: "Ooops ...",
          description: t("CANNOT_RETRIEVE_OFFERS"),
          duration: 10,
        });
      },
    }
  );

  if (!offersList) return <LoadingPage message="" />;

  return (
    <Col span={8}>
      <Card title={t("MOST_DESIRED_OFFERS")}>
        <List
          itemLayout="horizontal"
          dataSource={offersList.data}
          renderItem={(offer: IOfferData) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <a href={`/dashboard/admin/offer/${offer._id}`}>
                    {offer.title}
                  </a>
                }
                description={`${offer.applications} ${t("APPLICATIONS")}`}
              />
            </List.Item>
          )}
        />
        <Button type="primary" block href="/dashboard/admin/offers">
          {t("VIEW_MORE")}
        </Button>
      </Card>
    </Col>
  );
};

export default MostDesiredOffers;
