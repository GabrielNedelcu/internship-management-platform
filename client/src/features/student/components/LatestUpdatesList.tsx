import { Avatar, List, notification, Tag, Typography } from "antd";
import { useTranslation } from "react-i18next";

import { Card, LoadingPage } from "common";
import { IApplicationData, IServerResponseMultipleFetch } from "common/types";
import { useQuery } from "@tanstack/react-query";
import { getSelfApplications } from "../api";
import { getApplicationStatusTag } from "common/utils";

const LatestUpdatesList = () => {
  const { t } = useTranslation();

  const { data: applicationsList } = useQuery<IServerResponseMultipleFetch>(
    ["getSelfApplications"],
    () => {
      return getSelfApplications("", {
        pagination: { pageSize: 5, page: 1 },
        sort: "desc.updatedAt",
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

  if (!applicationsList) return <LoadingPage message="" />;

  return (
    <>
      <Card
        title={
          <Typography.Title level={5}>{t("LATEST_UPDATES")}</Typography.Title>
        }
        content={
          <>
            <List
              dataSource={applicationsList?.data}
              renderItem={(application: IApplicationData) => (
                <List.Item key={application._id}>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={`https://ui-avatars.com/api/?name=${application.offerTitle}&background=0F1C80&color=FFFFFF&bold=true`}
                      />
                    }
                    title={
                      <a href={`/student/offer/${application.offer}`}>
                        {application.offerTitle}
                      </a>
                    }
                    description={application.companyName}
                  />
                  <div>
                    <Tag
                      color={
                        getApplicationStatusTag(application.status || "").color
                      }
                    >
                      {
                        getApplicationStatusTag(application.status || "")
                          .message
                      }
                    </Tag>
                  </div>
                </List.Item>
              )}
            />

            <Typography.Link href="/student/applications">
              {t("VIEW_MORE")}
            </Typography.Link>
          </>
        }
      />
    </>
  );
};

export default LatestUpdatesList;
