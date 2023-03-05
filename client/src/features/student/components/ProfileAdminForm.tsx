import { IStudentData } from "common";
import { Form, Input } from "antd";
import {
  IdcardOutlined,
  MailOutlined,
  UserOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";

interface IProfileAdminForm {
  profileData: IStudentData;
}

const ProfileAdminForm = ({ profileData }: IProfileAdminForm) => {
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
        <Form.Item name="email" label="Email">
          <Input suffix={<MailOutlined />} />
        </Form.Item>

        <Form.Item name="name" label="Name">
          <Input suffix={<UserOutlined />} />
        </Form.Item>
        <Form.Item name="group" label="Group">
          <Input suffix={<UserSwitchOutlined />} />
        </Form.Item>

        <Form.Item name="cnp" label="CNP">
          <Input suffix={<IdcardOutlined />} />
        </Form.Item>

        <Form.Item name="passport" label="Passport">
          <Input suffix={<IdcardOutlined />} />
        </Form.Item>
      </Form>
    </>
  );
};

export default ProfileAdminForm;
