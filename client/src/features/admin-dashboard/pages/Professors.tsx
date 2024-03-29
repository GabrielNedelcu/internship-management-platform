import { Typography } from "antd";
import { useTranslation } from "react-i18next";

import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";

import { Tabs } from "common";
import { ITabProps } from "common/types";
import { AddProfessor, ProfessorsList } from "../components";

const Professors = () => {
  const { t } = useTranslation();

  const tabs: ITabProps[] = [
    {
      label: (
        <span>
          <PlusCircleOutlined />
          {t("ADD_TEACHERS")}
        </span>
      ),
      key: "1",
      children: <AddProfessor />,
    },
    {
      label: (
        <span>
          <SearchOutlined />
          {t("BROWSE_TEACHERS")}
        </span>
      ),
      key: "2",
      children: <ProfessorsList />,
    },
  ];

  return (
    <>
      <Typography.Title level={1}>{t("TEACHERS_LIST")}</Typography.Title>
      <Typography.Title level={5} type={"secondary"}>
        {t("ADD_VIEW_EDIT_TEACHERS")}
      </Typography.Title>

      <Tabs tabList={tabs} />
    </>
  );
};

export default Professors;
