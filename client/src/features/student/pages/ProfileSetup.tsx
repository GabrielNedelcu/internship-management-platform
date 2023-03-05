import { Col, Row, Typography } from "antd";
import "../../../style/SignInPage.css";
import { ProfileForm } from "../components";
import { useNavigate } from "react-router-dom";

const ProfileSetup = () => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="sign-in-container"
        style={{ backgroundColor: "white", padding: 25 }}
      >
        <Row justify="center">
          <Typography.Title level={2}>
            Setting up your profile ...
          </Typography.Title>
        </Row>
        <Row justify="center">
          <Typography.Title level={4} type={"secondary"}>
            Before using the platform, we need some information in order to
            generate the legal documents (contracts, etc.)
          </Typography.Title>
        </Row>

        <Row gutter={[16, 16]} justify={"center"}>
          <Col span={12}>
            <br />
            <br />
            <br />
            <ProfileForm
              finishPrompt="Finish Profile Setup"
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
