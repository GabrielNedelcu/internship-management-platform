import { Form, Input, Select } from "antd";
import { useTranslation } from "react-i18next";
const { TextArea } = Input;

const CompanyGeneralInfoStep = () => {
  const { t } = useTranslation();

  return (
    <>
      <Form.Item
        label={t("COMPANY_NAME")}
        name="name"
        rules={[
          { required: true, message: t("PROVIDE_COMPANY_NAME").toString() },
        ]}
        hasFeedback
      >
        <Input placeholder={t("PROVIDE_COMPANY_NAME").toString()} />
      </Form.Item>

      <Form.Item
        label={t("COMPANY_DESCRIPTION")}
        name="description"
        rules={[
          {
            required: true,
            message: t("PROVIDE_COMPANY_DESCRIPTION").toString(),
          },
        ]}
        hasFeedback
      >
        <TextArea
          rows={3}
          placeholder={t("PROVIDE_COMPANY_DESCRIPTION").toString()}
        />
      </Form.Item>

      <Form.Item
        label={t("FIELD_OF_WORK")}
        name="fieldOfWork"
        rules={[
          {
            required: true,
            message: t("SELECT_FIELD_OF_WORK").toString(),
          },
        ]}
      >
        <Select placeholder={t("SELECT_FIELD_OF_WORK")}>
          <Select.Option value="telecom">Telecom</Select.Option>
          <Select.Option value="softwareDev">
            Software Developement
          </Select.Option>
          <Select.Option value="electronics">Electronics</Select.Option>
          <Select.Option value="other">Other</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label={t("COMPANY_ADDRESS")}
        name="address"
        rules={[
          {
            required: true,
            message: t("PROVIDE_COMPANY_ADDRESS").toString(),
          },
        ]}
        hasFeedback
      >
        <Input placeholder={t("PROVIDE_COMPANY_ADDRESS").toString()} />
      </Form.Item>

      <Form.Item
        label={t("PHONE_NUMBER")}
        name="contactNumber"
        rules={[
          {
            required: true,
            message: t("PROVIDE_PHONE_NUMBER").toString(),
          },
          () => ({
            validator(_, value) {
              if (!value || value.length === 9) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error(t("TYPE_VALID_PHONE_NUMBER").toString())
              );
            },
          }),
        ]}
        hasFeedback
      >
        <Input
          addonBefore="+40"
          placeholder={t("PROVIDE_PHONE_NUMBER").toString()}
        />
      </Form.Item>
    </>
  );
};

export default CompanyGeneralInfoStep;
