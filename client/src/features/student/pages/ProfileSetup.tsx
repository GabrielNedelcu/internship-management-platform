import { Col, Row, Typography } from "antd";
import "../../../style/SignInPage.css";
import { ProfileForm } from "../components";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ProfileSetup = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  return (
    <>
      <div
        className="sign-in-container"
        style={{ backgroundColor: "white", padding: 25 }}
      >
        <Row justify="center">
          <Typography.Title level={2}>{t("PROFILE_SETUP")}</Typography.Title>
        </Row>
        <Row justify="center">
          <Typography.Title level={4} type={"secondary"}>
            {t("PROFILE_SETUP_MSG")}
          </Typography.Title>
        </Row>

        <Row gutter={[16, 16]} justify={"center"}>
          <Col span={12}>
            <br />
            <br />
            <br />
            <ProfileForm
              finishPrompt={t("FINISH_PROFILE_SETUP")}
              onSuccess={() => {
                return navigate(`/student/overview`);
              }}
              displayLabels={false}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ProfileSetup;
