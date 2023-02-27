import {
  Row,
  Col,
  Form,
  Input,
  Select,
  InputNumber,
  Button,
  Spin,
  notification,
} from "antd";

import { useCheckUniqueEmail } from "common";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchProfessor } from "features/admin-dashboard/api/professorsAPI";

interface ITeacherData {
  teacherId: string;
  name: string;
  email: string;
  title: string;
  privatePhone: string;
  publicPhone: string;
  departament: string;
  numPositions: number;
}

const TeacherInfo = ({
  teacherId,
  name,
  email,
  title,
  privatePhone,
  publicPhone,
  departament,
  numPositions,
}: ITeacherData) => {
  const queryClient = useQueryClient();

  const [newEmail, setNewEmail] = useState<String>(email);
  const [loading, setLoading] = useState<boolean>(false);
  const { validateEmail } = useCheckUniqueEmail();

  const { mutate: mutateUpdateTeacherData } = useMutation(
    ["updateTeacherData", teacherId],
    (data: any) => {
      setLoading(true);
      return patchProfessor(teacherId, data);
    },
    {
      onSuccess: () => {
        setLoading(false);

        queryClient.invalidateQueries(["getTeacher", teacherId]);

        notification.success({
          message: "Account updated",
          description:
            "Great! You have successfully updated the teacher's account! ...",
          duration: 10,
        });
      },
      onError: () => {
        setLoading(false);
        notification.error({
          message: "Ooops ...",
          description:
            "Error occured while updating the account! Please try again later!",
          duration: 10,
        });
      },
    }
  );

  return (
    <>
      <Spin spinning={loading} tip={"Updating teacher profile..."}>
        <Row gutter={[16, 16]}>
          <Col span={12} offset={6}>
            <Form
              layout="horizontal"
              size="large"
              labelCol={{ span: 4 }}
              onFinish={(values: any) => {
                mutateUpdateTeacherData(values);
              }}
            >
              <Form.Item
                name="name"
                label="Name"
                initialValue={name}
                rules={[
                  {
                    required: true,
                    message: "Please provide the teacher's full name",
                  },
                ]}
                hasFeedback
              >
                <Input
                  placeholder="Type in the teacher's full name"
                  defaultValue={name}
                  onChange={(e) => {}}
                />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                initialValue={email}
                rules={[
                  {
                    type: "email",
                    message: "Please provide a valid email address!",
                  },
                  {
                    required: true,
                    message: "Please provide the student's email!",
                  },
                  ...(newEmail !== email ? [{ validator: validateEmail }] : []),
                ]}
                hasFeedback
              >
                <Input
                  placeholder="Type in the teacher's email"
                  defaultValue={email}
                  onChange={(e) => {
                    setNewEmail(e.target.value);
                  }}
                />
              </Form.Item>

              <Form.Item
                name="title"
                label="Job Title"
                initialValue={title}
                rules={[
                  {
                    required: true,
                    message: "Please provide the teacher's job title",
                  },
                ]}
                hasFeedback
              >
                <Input
                  placeholder="Type in the teacher's job title"
                  defaultValue={title}
                  onChange={(e) => {}}
                />
              </Form.Item>

              <Form.Item
                name="privatePhone"
                label="Private Phone"
                initialValue={privatePhone}
                rules={[
                  {
                    required: true,
                    message: "Please provide the techer's private phone number",
                  },
                  {
                    len: 9,
                    message: "The phone number must have exactly 9 characters",
                  },
                ]}
                hasFeedback
              >
                <Input
                  placeholder="Type in the teacher's private phone number"
                  addonBefore="+40"
                  defaultValue={privatePhone}
                  onChange={(e) => {}}
                />
              </Form.Item>

              <Form.Item
                name="publicPhone"
                label="Public Phone"
                initialValue={publicPhone}
                rules={[
                  {
                    required: true,
                    message: "Please provide the techer's public phone number",
                  },
                  {
                    len: 9,
                    message: "The phone number must have exactly 9 characters",
                  },
                ]}
                hasFeedback
              >
                <Input
                  placeholder="Type in the teacher's public phone number"
                  addonBefore="+40"
                  defaultValue={publicPhone}
                  onChange={(e) => {}}
                />
              </Form.Item>

              <Form.Item
                name="departament"
                label="Departament"
                initialValue={departament}
                rules={[
                  {
                    required: true,
                    message: "Please select the techer's departament",
                  },
                ]}
                hasFeedback
              >
                <Select
                  placeholder="Please select the teacher's departament"
                  defaultValue={departament}
                  onChange={(value) => {
                    console.log(value);
                  }}
                >
                  <Select.Option value="ELA">ELA</Select.Option>
                  <Select.Option value="RST">RST</Select.Option>
                  <Select.Option value="TST">TST</Select.Option>
                  <Select.Option value="MON">MON</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="numPositions"
                label="Students no."
                initialValue={numPositions}
              >
                <InputNumber
                  size="large"
                  min={numPositions}
                  max={100000}
                  defaultValue={numPositions}
                  onChange={(value) => {}}
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Modify Teacher Data
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Spin>
    </>
  );
};

export default TeacherInfo;
