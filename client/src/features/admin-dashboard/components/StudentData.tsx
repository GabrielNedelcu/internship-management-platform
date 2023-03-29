import dayjs from "dayjs";
import download from "downloadjs";
import { useTranslation } from "react-i18next";
import { Row, Col, Spin, Descriptions, Typography } from "antd";

import { IStudentData } from "common/types";
import StudentProfileForm from "./StudentProfileForm";
import useStudentCreateUpdate from "../hooks/useStudentCreateUpdate";
import { Card } from "common";
import { getStudentCV } from "../api";

interface IStudentProfileData {
  studentData: IStudentData;
  onAfterUpdate?: () => void;
}

const StudentData = ({ studentData, onAfterUpdate }: IStudentProfileData) => {
  const { t } = useTranslation();

  const { isLoading, mutateUpdateStudent } =
    useStudentCreateUpdate(onAfterUpdate);

  return (
    <>
      <Spin spinning={isLoading} tip={t("UPDATING_ACCOUNT")}>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <StudentProfileForm
              initialData={studentData}
              displayLabels={true}
              finishPrompt={t("UPDATE_ACCOUNT")}
              onFinish={(newData: IStudentData) => {
                mutateUpdateStudent({
                  studentId: studentData._id || "",
                  newData,
                });
              }}
            />
          </Col>

          <Col span={12}>
            <Card
              title={t("")}
              content={
                <>
                  <br />
                  <Descriptions layout="vertical">
                    <Descriptions.Item label={t("HOME_ADDRESS")}>
                      {studentData.legalAddress}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("RESIDENCY_ADDRESS")}>
                      {studentData.address}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("BIRTHPLACE")}>
                      {studentData.birthPlace}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("BIRTHDAY")}>
                      {dayjs(studentData.birthDay)
                        .format("MMMM D YYYY")
                        .toString()}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("PHONE_NUMBER")}>
                      +40{studentData.phone}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("CITIZENSHIP")}>
                      {studentData.citizenship}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("CV")}>
                      <Typography.Link
                        onClick={async () => {
                          const fileData = await getStudentCV(
                            studentData._id || ""
                          );
                          download(fileData, `${studentData.name}_CV.pdf`);
                        }}
                      >
                        {t("DOWNLOAD_CV")}
                      </Typography.Link>
                    </Descriptions.Item>
                  </Descriptions>
                </>
              }
            />
          </Col>
        </Row>
      </Spin>
    </>
  );
};

export default StudentData;
