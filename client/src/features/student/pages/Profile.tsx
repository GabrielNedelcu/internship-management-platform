import { Row, Col, Typography } from "antd";
import { LoadingPage, PasswordChangeForm } from "common";
import { ProfileForm } from "../components";
import ProfileAdminForm from "../components/ProfileAdminForm";
import useProfile from "../hooks/useProfile";

const Profile = () => {
  const { studentProfileData, loading } = useProfile();

  if (!studentProfileData || loading)
    return <LoadingPage message="Fetching profile data ..." />;

  return (
    <>
      <Typography.Title level={1}>Profile Settings</Typography.Title>
      <Typography.Title level={5} type={"secondary"}>
        View and change your profile data ...
      </Typography.Title>

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <ProfileForm
            profileData={studentProfileData}
            finishPrompt="Update profile data"
            displayLabels={true}
          />
        </Col>
        <Col span={12}>
          <ProfileAdminForm profileData={studentProfileData} />
          <PasswordChangeForm />
        </Col>
      </Row>
    </>
  );
};

export default Profile;
