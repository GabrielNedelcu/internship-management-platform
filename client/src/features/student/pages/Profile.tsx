import { Row, Col, Typography } from "antd";
import { LoadingPage } from "common";
import { useTranslation } from "react-i18next";
import { ProfileForm } from "../components";
import ProfileAdminForm from "../components/ProfileAdminForm";
import useProfile from "../hooks/useProfile";

const Profile = () => {
  const { t } = useTranslation();

  const { refetchStudentData, studentProfileData, loading } = useProfile();

  if (!studentProfileData || loading)
    return <LoadingPage message={t("FETCHING_PROFILE_DATA")} />;

  return (
    <>
      <Typography.Title level={1}>{t("YOUR_PROFILE")}</Typography.Title>
      <Typography.Title level={5} type={"secondary"}>
        {t("UPDATE_YOUR_PROFILE")}
      </Typography.Title>

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <ProfileForm
            profileData={studentProfileData}
            finishPrompt={t("UPDATE_PROFILE")}
            displayLabels={true}
            onSuccess={() => {
              refetchStudentData();
            }}
          />
        </Col>
        <Col span={12}>
          <ProfileAdminForm profileData={studentProfileData} />
        </Col>
      </Row>
    </>
  );
};

export default Profile;
