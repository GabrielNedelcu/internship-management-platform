import { IStudentData } from "common";
import { Form, Input } from "antd";
import {
  IdcardOutlined,
  MailOutlined,
  UserOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

interface IProfileAdminForm {
  profileData: IStudentData;
}

const ProfileAdminForm = ({ profileData }: IProfileAdminForm) => {
  const { t } = useTranslation();

  // FORM IS ALWAYS READ ONLY
  return (
    <>
      <Form
        layout="horizontal"
        size="large"
        initialValues={profileData}
        labelCol={{ span: 5 }}
        disabled
      >
        <Form.Item name="email" label={t("EMAIL")}>
          <Input suffix={<MailOutlined />} />
        </Form.Item>

        <Form.Item name="name" label={t("NAME")}>
          <Input suffix={<UserOutlined />} />
        </Form.Item>
        <Form.Item name="group" label={t("GROUP")}>
          <Input suffix={<UserSwitchOutlined />} />
        </Form.Item>

        <Form.Item name="cnp" label="CNP">
          <Input suffix={<IdcardOutlined />} />
        </Form.Item>

        <Form.Item name="passport" label={t("PASSPORT")}>
          <Input suffix={<IdcardOutlined />} />
        </Form.Item>
      </Form>
    </>
  );
};

export default ProfileAdminForm;
