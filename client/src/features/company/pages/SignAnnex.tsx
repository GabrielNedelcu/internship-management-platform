import { Button, Col, Row, Typography, Form, Upload, UploadProps } from "antd";
import { useTranslation } from "react-i18next";
import download from "downloadjs";

import { UploadOutlined } from "@ant-design/icons";

import "../../../style/SignInPage.css";
import useSignAnnex from "../hooks/useSignAnnex";
import { LoadingPage } from "common";

const uploadProps: UploadProps = {
  name: "file",
  accept: ".pdf",
  multiple: false,
  maxCount: 1,
  beforeUpload: (file) => {
    return false;
  },
};

const SignAnnex = () => {
  const { t } = useTranslation();

  const { mutateUpdateCompany, handleDownloadAnnex, isLoading } =
    useSignAnnex();

  if (isLoading) return <LoadingPage message="" />;

  return (
    <>
      <div
        className="sign-in-container"
        style={{ backgroundColor: "white", padding: 25 }}
      >
        <Row justify="center">
          <Typography.Title level={2}>
            {t("COMPANY_ANNEX_TITLE")}
          </Typography.Title>
        </Row>
        <Row justify="center">
          <Typography.Title level={4} type={"secondary"}>
            {t("COMPANY_ANNEX_MSG")}
          </Typography.Title>
        </Row>

        <Row gutter={[16, 16]} justify={"center"}>
          <Col span={12}>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Button size="large" block onClick={handleDownloadAnnex}>
              {t("DOWNLOAD_CONTRACT")}
            </Button>
          </Col>
        </Row>
        <br />
        <Row gutter={[16, 16]} justify={"center"}>
          <Col span={12}>
            <Form onFinish={mutateUpdateCompany}>
              <Form.Item name="annex">
                <Upload.Dragger {...uploadProps}>
                  <p className="ant-upload-drag-icon">
                    <UploadOutlined />
                  </p>
                  <p className="ant-upload-text">{t("CLICK_DRAG")}</p>
                  <p className="ant-upload-hint">{t("UPLOAD_CONTRACT")}</p>
                </Upload.Dragger>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" size="large" block>
                  {t("FINISH")}
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default SignAnnex;
