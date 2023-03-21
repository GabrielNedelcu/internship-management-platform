import { useTranslation } from "react-i18next";
import { Row, Col, Typography, Spin, Upload, UploadProps } from "antd";

import { InboxOutlined } from "@ant-design/icons";

import { IProfessorData } from "common/types";
import CreationResultsModal from "./CreationResultsModal";
import ProfessorProfileForm from "./ProfessorProfileForm";
import useProfessorCreateUpdate from "../hooks/useProfessorCreateUpdate";

const { Dragger } = Upload;

const props: UploadProps = {
  name: "file",
  accept: ".xlsx",
  multiple: false,
  maxCount: 1,
};

const AddProfessor = () => {
  const { t } = useTranslation();

  const {
    isLoading,
    openModal,
    createdAccounts,
    detectedAccounts,
    notCreatedAccounts,
    setOpenModal,
    mutateUploadProfessors,
    mutateCreateProfessor,
  } = useProfessorCreateUpdate();

  const newProps: UploadProps = {
    ...props,
    customRequest: (options) => mutateUploadProfessors(options),
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
              {t("CREATE_TEACHER_ACCOUNT")}
            </Typography.Title>

            <ProfessorProfileForm
              displayLabels={false}
              finishPrompt={t("CREATE_ACCOUNT")}
              onFinish={(newData: IProfessorData) => {
                mutateCreateProfessor(newData);
              }}
            />
          </Col>

          <Col span={12}>
            <Typography.Title level={5}>
              {t("IMPORT_TEACHERS")}
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

export default AddProfessor;
