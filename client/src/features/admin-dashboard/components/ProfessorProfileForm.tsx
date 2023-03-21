import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Form, Input, Button, InputNumber, Select } from "antd";

import { useCheckUniqueEmail } from "common";
import { IProfessorData } from "common/types";

interface IProfessorProfileFormProps {
  initialData?: IProfessorData;
  displayLabels: boolean;
  finishPrompt: string;
  onFinish: (newData: IProfessorData) => void;
}

const ProfessorProfileForm = ({ ...props }: IProfessorProfileFormProps) => {
  const { t } = useTranslation();
  const { validateEmail } = useCheckUniqueEmail();
  const [newEmail, setNewEmail] = useState(props.initialData?.email);

  const [form] = Form.useForm();

  return (
    <>
      <Form
        layout="horizontal"
        size="large"
        form={form}
        initialValues={props.initialData}
        labelCol={{ span: 4 }}
        onFinish={(values) => {
          props.onFinish(values);
          form.resetFields();
        }}
      >
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: t("TYPE_TEACHER_FULL_NAME").toString(),
            },
          ]}
          hasFeedback
          {...(props.displayLabels && {
            label: t("NAME"),
          })}
        >
          <Input placeholder={t("TYPE_TEACHER_FULL_NAME").toString()} />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              message: t("TYPE_VALID_EMAIL").toString(),
            },
            {
              required: true,
              message: t("TYPE_TEACHER_EMAIL").toString(),
            },
            ...(newEmail !== props.initialData?.email
              ? [{ validator: validateEmail }]
              : []),
          ]}
          hasFeedback
          {...(props.displayLabels && {
            label: t("EMAIL"),
          })}
        >
          <Input
            placeholder={t("TYPE_TEACHER_EMAIL").toString()}
            onChange={(e) => {
              setNewEmail(e.target.value);
            }}
          />
        </Form.Item>

        <Form.Item
          name="title"
          rules={[
            {
              required: true,
              message: t("TYPE_TEACHER_JOB_TITLE").toString(),
            },
          ]}
          hasFeedback
          {...(props.displayLabels && {
            label: t("JOB_TITLE"),
          })}
        >
          <Input placeholder={t("TYPE_TEACHER_JOB_TITLE").toString()} />
        </Form.Item>

        <Form.Item
          name="privatePhone"
          rules={[
            {
              required: true,
              message: t("TYPE_TEACHER_PRIVATE_PHONE").toString(),
            },
            {
              len: 9,
              message: t("TYPE_VALID_PHONE_NUMBER").toString(),
            },
          ]}
          hasFeedback
          {...(props.displayLabels && {
            label: t("PRIVATE_PHONE"),
          })}
        >
          <Input
            placeholder={t("TYPE_TEACHER_PRIVATE_PHONE").toString()}
            addonBefore="+40"
          />
        </Form.Item>

        <Form.Item
          name="publicPhone"
          rules={[
            {
              required: true,
              message: t("TYPE_TEACHER_PUBLICE_PHONE").toString(),
            },
            {
              len: 9,
              message: t("TYPE_VALID_PHONE_NUMBER").toString(),
            },
          ]}
          hasFeedback
          {...(props.displayLabels && {
            label: t("PUBLIC_PHONE"),
          })}
        >
          <Input
            placeholder={t("TYPE_TEACHER_PUBLICE_PHONE").toString()}
            addonBefore="+40"
          />
        </Form.Item>

        <Form.Item
          name="departament"
          rules={[
            {
              required: true,
              message: t("SELECT_TEACHER_DEPARTAMENT").toString(),
            },
          ]}
          hasFeedback
          {...(props.displayLabels && {
            label: t("DEPARTAMENT"),
          })}
        >
          <Select placeholder={t("SELECT_TEACHER_DEPARTAMENT").toString()}>
            <Select.Option value="ELA">ELA</Select.Option>
            <Select.Option value="ELA_EN">ELA_EN</Select.Option>
            <Select.Option value="RST">RST</Select.Option>
            <Select.Option value="TST">TST</Select.Option>
            <Select.Option value="TST_EN">TST_EN</Select.Option>
            <Select.Option value="MON">MON</Select.Option>
            <Select.Option value="CTI">CTI</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="numPositions">
          <InputNumber
            size="large"
            min={1}
            max={100000}
            defaultValue={1}
            addonBefore={t("STUDENT_NUMBER")}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            {props.finishPrompt}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ProfessorProfileForm;
