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

  const { internshipData, mutateUpdateInternshipJournal } =
    useInternshipJournal(internshipId);

  if (!internshipData)
    return <LoadingPage message={t("FETCHING_INTERNSHIP")} />;

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Form
            labelCol={{ span: 2 }}
            onFinish={mutateUpdateInternshipJournal}
            initialValues={{
              ...internshipData,
              journal: internshipData.journal?.map(
                (journalEntry: IJournalEntryData) => {
                  return {
                    ...journalEntry,
                    startDate: dayjs(journalEntry.startDate),
                    endDate: dayjs(journalEntry.endDate),
                  };
                }
              ),
            }}
          >
            <Form.List name="journal">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => {
                    return (
                      <>
                        <Collabsable
                          key={index}
                          panelTitle={`${t("ENTRY")} #${index}`}
                          contentElement={<JounralEntry field={field} />}
                          extraButton={
                            <MinusOutlined
                              onClick={() => {
                                remove(field.name);
                              }}
                            />
                          }
                        />
                        <br />
                      </>
                    );
                  })}
                  <Form.Item>
                    <Button onClick={() => add()} block icon={<PlusOutlined />}>
                      {t("ADD_ENTRY")}
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>

            <Form.Item>
              <Button type="primary" size="large" htmlType="submit" block>
                {t("SAVE_CHANGES")}
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default InternshipJournal;
