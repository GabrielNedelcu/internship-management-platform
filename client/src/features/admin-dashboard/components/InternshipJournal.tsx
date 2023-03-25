import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Row } from "antd";
import { Collabsable, LoadingPage } from "common";
import { IJournalEntryData } from "common/types";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import useInternshipJournal from "../hooks/useInternshipJournal";
import JounralEntry from "./JournalEntry";

interface IInternshipJournalProps {
  internshipId: string;
}

const InternshipJournal = ({ internshipId }: IInternshipJournalProps) => {
  const { t } = useTranslation();

  const { internshipData } = useInternshipJournal(internshipId);

  if (!internshipData)
    return <LoadingPage message={t("FETCHING_INTERNSHIP")} />;

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          {internshipData.journal?.map((journalEntry: IJournalEntryData) => (
            <>
              <Collabsable
                key={journalEntry._id || ""}
                panelTitle={`${dayjs(journalEntry.startDate)
                  .format("MMMM D YYYY")
                  .toString()} - ${dayjs(journalEntry.endDate)
                  .format("MMMM D YYYY")
                  .toString()}`}
                contentElement={<JounralEntry data={journalEntry} />}
              />

              <br />
            </>
          ))}
        </Col>
      </Row>
    </>
  );
};

export default InternshipJournal;
