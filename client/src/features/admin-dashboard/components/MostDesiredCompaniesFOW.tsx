import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Button, Card, Col, List, notification } from "antd";

import { getApplicationsStats } from "../api";
import {
  IApplicationsStats,
  ICompanyApplications,
  IFieldOfWorkApplications,
} from "common/types";
import { LoadingPage } from "common";
import { getFieldOfWork } from "common/utils";
import MostDesiredCompaniesModal from "./MostDesiredCompaniesModal";

const MostDesiredCompaniesFOW = () => {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);

  const { data: applicationStats } = useQuery<IApplicationsStats>(
    ["getApplicationsStats"],
    () => {
      return getApplicationsStats();
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

  if (!applicationStats) return <LoadingPage message="" />;

  return (
    <>
      <MostDesiredCompaniesModal
        openModal={openModal}
        fullList={applicationStats.mostDesiredCompanies}
        closeModalCb={() => setOpenModal(false)}
      />

      <Col span={8}>
        <Card title={t("MOST_DESIRED_COMPANIES")}>
          <List
            itemLayout="horizontal"
            dataSource={applicationStats.mostDesiredCompanies.slice(0, 3)}
            renderItem={(company: ICompanyApplications) => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <a href={`/dashboard/admin/company/${company._id}`}>
                      {company.companyName}
                    </a>
                  }
                  description={`${company.applications} ${t("APPLICATIONS")}`}
                />
              </List.Item>
            )}
          />
          <Button type="primary" block onClick={() => setOpenModal(true)}>
            {t("VIEW_MORE")}
          </Button>
        </Card>
      </Col>

      <Col span={8}>
        <Card title={t("MOST_DESIRED_FOW")}>
          <List
            itemLayout="horizontal"
            dataSource={applicationStats.mostDesiredFieldsOfWork}
            renderItem={(fow: IFieldOfWorkApplications) => (
              <List.Item>
                <List.Item.Meta
                  title={getFieldOfWork(fow._id)}
                  description={`${fow.applications} ${t("APPLICATIONS")}`}
                />
              </List.Item>
            )}
          />
        </Card>
      </Col>
    </>
  );
};

export default MostDesiredCompaniesFOW;
