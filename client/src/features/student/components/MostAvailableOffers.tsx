import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Avatar, List, notification, Tag, Typography } from "antd";

import { Card, LoadingPage } from "common";
import { IOfferData, IServerResponseMultipleFetch } from "common/types";
import { getOffers } from "../api";

const MostAvailableOffers = () => {
  const { t } = useTranslation();

  const { data: offersList } = useQuery<IServerResponseMultipleFetch>(
    ["getLatestOffers"],
    () => {
      return getOffers("", {
        fields: "title,companyName,departament,availablePos",
        pagination: { pageSize: 3, page: 1 },
        sort: "desc.availablePos",
      });
    },
    {
      onError: () => {
        notification.error({
          message: "Ooops ...",
          description: t("CANNOT_RETRIEVE_APPLICATIONS"),
          duration: 10,
        });
      },
    }
  );

  if (!offersList) return <LoadingPage message="" />;

  return (
    <>
      <Card
        title={
          <Typography.Title level={5}>{t("MOST_AVAILABLE")}</Typography.Title>
        }
        content={
          <>
            <List
              dataSource={offersList?.data}
              renderItem={(offer: IOfferData) => (
                <List.Item key={offer._id}>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={`https://ui-avatars.com/api/?name=${offer.title}&background=0F1C80&color=FFFFFF&bold=true`}
                      />
                    }
                    title={
                      <a href={`/student/offer/${offer._id}`}>{offer.title}</a>
                    }
                    description={offer.companyName}
                  />
                  <div>
                    <Tag color={"geekblue"}>{`${offer.availablePos} ${t(
                      "POSITIONS"
                    )}`}</Tag>
                  </div>
                </List.Item>
              )}
            />

            <Typography.Link href="/student/offers">
              {t("VIEW_MORE")}
            </Typography.Link>
          </>
        }
      />
    </>
  );
};

export default MostAvailableOffers;
