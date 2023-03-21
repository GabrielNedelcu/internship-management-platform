import { Modal, Typography, Divider, Row, Col } from "antd";
import { useTranslation } from "react-i18next";

interface ICreationResultsModalProps {
  openModal: boolean;
  detectedAccounts: number;
  createdAccounts: number;
  notCreatedAccounts: string;
  closeModalCb: () => void;
}

const CreationResultsModal = ({ ...props }: ICreationResultsModalProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Modal
        open={props.openModal}
        onCancel={props.closeModalCb}
        footer={[]}
        width={1000}
      >
        <Typography.Title level={2}>
          {t("STUDENT_CREATION_RESULTS")}
        </Typography.Title>

        <Divider />
        <Row gutter={[16, 16]} style={{ display: "flex" }} justify="center">
          <Col span={8} style={{ display: "flex", justifyContent: "center" }}>
            <Typography.Title level={3} style={{ color: "rgb(15, 28, 112)" }}>
              {props.detectedAccounts} {t("ACCOUNTS_DETECTED")}
            </Typography.Title>
          </Col>
          <Col span={8} style={{ display: "flex", justifyContent: "center" }}>
            <Typography.Title level={3} style={{ color: "rgb(15, 28, 112)" }}>
              {props.createdAccounts} {t("ACCOUNTS_CREATED")}
            </Typography.Title>
          </Col>
          <Col span={8} style={{ display: "flex", justifyContent: "center" }}>
            <Typography.Title level={3} style={{ color: "rgb(15, 28, 112)" }}>
              {props.detectedAccounts - props.createdAccounts}{" "}
              {t("ACCOUNTS_ABORTED")}
            </Typography.Title>
          </Col>
        </Row>
        <br />
        <Typography.Title level={5} type={"secondary"}>
          {t("ACCOUNTS_NOT_CREATED_MSG")}
        </Typography.Title>
        <Typography.Title level={5} type={"secondary"}>
          {props.notCreatedAccounts}
        </Typography.Title>
      </Modal>
    </>
  );
};

export default CreationResultsModal;
