import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Form, Input, Button, InputNumber } from "antd";

import { useCheckUniqueEmail } from "common";
import { IStudentData } from "common/types";

interface IStudentProfileFormProps {
  initialData?: IStudentData;
  displayLabels: boolean;
  finishPrompt: string;
  onFinish: (newData: IStudentData) => void;
}

const StudentProfileForm = ({ ...props }: IStudentProfileFormProps) => {
  const { t } = useTranslation();
  const { validateEmail } = useCheckUniqueEmail();
  const [newEmail, setNewEmail] = useState(props.initialData?.email);
  const [cnp, setCnp] = useState(props.initialData?.cnp || "");
  const [passport, setPassport] = useState(props.initialData?.passport || "");
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
          // form.resetFields();
        }}
      >
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: t("TYPE_STUDENT_FULL_NAME").toString(),
            },
          ]}
          hasFeedback
          {...(props.displayLabels && {
            label: t("NAME"),
          })}
        >
          <Input placeholder={t("TYPE_STUDENT_FULL_NAME").toString()} />
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
              message: t("TYPE_STUDENT_EMAIL").toString(),
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
            placeholder={t("TYPE_STUDENT_EMAIL").toString()}
            onChange={(e) => {
              setNewEmail(e.target.value);
            }}
          />
        </Form.Item>

        <Form.Item
          name="group"
          rules={[
            {
              required: true,
              message: t("TYPE_STUDENT_GROUP").toString(),
            },
          ]}
          hasFeedback
          {...(props.displayLabels && {
            label: t("GROUP"),
          })}
        >
          <Input placeholder={t("TYPE_STUDENT_GROUP").toString()} />
        </Form.Item>

        <Form.Item
          name="cnp"
          rules={[
            {
              required: passport === "",
              message: t("TYPE_STUDENT_CNP_OR_PASSPORT").toString(),
            },
            {
              len: 13,
              message: t("CNP_MUST_HAVE").toString(),
            },
          ]}
          hasFeedback
          {...(props.displayLabels && {
            label: t("CNP"),
          })}
        >
          <Input
            placeholder={t("TYPE_STUDENT_CNP").toString()}
            disabled={passport !== ""}
            onChange={(e) => {
              setCnp(e.target.value);
              form.resetFields(["passport"]);
            }}
          />
        </Form.Item>

        <Form.Item
          name="passport"
          hasFeedback
          {...(props.displayLabels && {
            label: t("PASSPORT"),
          })}
        >
          <Input
            placeholder={t("TYPE_STUDENT_PASSPORT").toString()}
            disabled={cnp !== ""}
            onChange={(e) => {
              setPassport(e.target.value);
              form.resetFields(["cnp"]);
            }}
          />
        </Form.Item>

        <Form.Item
          name="firstYearAvg"
          {...(props.displayLabels && {
            label: t("FIRST_YEAR_AVG"),
          })}
        >
          <InputNumber
            size="large"
            min={0}
            max={10}
            // defaultValue={0}
            placeholder={t("FIRST_YEAR_AVG").toString()}
            style={{ width: "250px" }}
          />
        </Form.Item>

        <Form.Item
          name="secondYearAvg"
          {...(props.displayLabels && {
            label: t("SECOND_YEAR_AVG"),
          })}
        >
          <InputNumber
            size="large"
            min={0}
            max={10}
            // defaultValue={0}
            placeholder={t("SECOND_YEAR_AVG").toString()}
            style={{ width: "250px" }}
          />
        </Form.Item>

        <Form.Item
          name="thirdYearAvg"
          {...(props.displayLabels && {
            label: t("THIRD_YEAR_AVG"),
          })}
        >
          <InputNumber
            size="large"
            min={0}
            max={10}
            // defaultValue={0}
            placeholder={t("THIRD_YEAR_AVG").toString()}
            style={{ width: "250px" }}
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

export default StudentProfileForm;
