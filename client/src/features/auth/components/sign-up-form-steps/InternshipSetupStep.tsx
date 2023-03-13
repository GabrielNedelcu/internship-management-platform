import { Form, Input, Switch } from "antd";
import { useTranslation } from "react-i18next";
const { TextArea } = Input;

const InternshipSetupStep = () => {
  const { t } = useTranslation();

  return (
    <>
      <Form.Item
        label={t("MAIN_ADDRESS")}
        name="internshipMainAddress"
        rules={[
          {
            required: true,
            message: t("PROVIDE_ADDRESS").toString(),
          },
        ]}
        hasFeedback
      >
        <Input placeholder={t("PROVIDE_ADDRESS").toString()} />
      </Form.Item>

      <Form.Item
        label={t("OTHER_ADDRESSES")}
        name="internshipOtherAddresses"
        hasFeedback
      >
        <TextArea
          rows={2}
          placeholder={t("PROVIDE_OTHER_ADDRESS").toString()}
        />
      </Form.Item>

      <Form.Item
        label={t("CONTRACT_OFFERED")}
        name="internshipContract"
        valuePropName="checked"
        initialValue
      >
        <Switch checkedChildren="yes" unCheckedChildren="no" />
      </Form.Item>

      <Form.Item
        label={t("COMPENSATION_OFFERED")}
        name="internshipCompensation"
        valuePropName="checked"
        initialValue
      >
        <Switch checkedChildren="yes" unCheckedChildren="no" />
      </Form.Item>

      <Form.Item
        label={t("ADVANTAGES")}
        name="internshipOtherAdvantages"
        hasFeedback
      >
        <TextArea rows={2} />
      </Form.Item>
    </>
  );
};

export default InternshipSetupStep;
