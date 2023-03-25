import dayjs from "dayjs";
import { Descriptions } from "antd";
import { useTranslation } from "react-i18next";

import { IJournalEntryData } from "common/types";

interface IJournalEntryProps {
  data: IJournalEntryData;
}
const JounralEntry = ({ data }: IJournalEntryProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Descriptions layout="horizontal">
        <Descriptions.Item label={t("START_DATE")} span={1.5}>
          {dayjs(data.startDate).format("MMMM D YYYY").toString()}
        </Descriptions.Item>
        <Descriptions.Item label={t("END_DATE")} span={1.5}>
          {dayjs(data.endDate).format("MMMM D YYYY").toString()}
        </Descriptions.Item>
        <Descriptions.Item label={t("DESCRIPTION")} span={3}>
          {data.description}
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};

export default JounralEntry;
