import { Row, Col, Typography, UploadProps, Upload, Spin } from "antd";
import { InboxOutlined } from "@ant-design/icons";

import { useTranslation } from "react-i18next";
import useStudentCreateUpdate from "../hooks/useStudentCreateUpdate";
import CreationResultsModal from "./CreationResultsModal";
import StudentProfileForm from "./StudentProfileForm";
import { IStudentData } from "common";

const { Dragger } = Upload;

const props: UploadProps = {
  name: "file",
  accept: ".xlsx",
  multiple: false,
  maxCount: 1,
};

const AddStudent = () => {
  const { t } = useTranslation();

  const {
    isLoading,
    openModal,
    createdAccounts,
    detectedAccounts,
    notCreatedAccounts,
    setOpenModal,
    mutateCreateStudent,
    mutateUploadStudents,
  } = useStudentCreateUpdate();

  const newProps: UploadProps = {
    ...props,
    customRequest: (options) => mutateUploadStudents(options),
  };

  return (
    <>
      <Spin
        spinning={isLoading}
        size="large"
        tip={t("CREATING_STUDENT_ACCOUNTS")}
      >
        <CreationResultsModal
          openModal={openModal}
          createdAccounts={createdAccounts}
          detectedAccounts={detectedAccounts}
          notCreatedAccounts={notCreatedAccounts}
          closeModalCb={() => {
            setOpenModal(false);
          }}
        />

        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Typography.Title level={5}>
              {t("CREATE_STUDENT_ACCOUNT")}
            </Typography.Title>

            <StudentProfileForm
              displayLabels={false}
              finishPrompt={t("CREATE_ACCOUNT")}
              onFinish={(newData: IStudentData) => {
                mutateCreateStudent(newData);
              }}
            />
          </Col>

          <Col span={12}>
            <Typography.Title level={5}>
              {t("IMPORT_STUDENTS")}
            </Typography.Title>
            <Dragger {...newProps}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">{t("CLICK_DRAG")}</p>
              <p className="ant-upload-hint">{t("SELECT_XLSX")}</p>
            </Dragger>
          </Col>
        </Row>
      </Spin>
    </>
  );
};

export default AddStudent;
