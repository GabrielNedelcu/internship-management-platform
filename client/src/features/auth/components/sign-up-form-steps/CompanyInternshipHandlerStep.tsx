import { Form, Input } from "antd";
import { useTranslation } from "react-i18next";

const CompanyInternshipHandlerStep = () => {
  const { t } = useTranslation();

  return (
    <>
      <Form.Item
        label={t("NAME")}
        name={["handler", "name"]}
        rules={[
          {
            required: true,
            message: t("PROVIDE_NAME").toString(),
          },
        ]}
        hasFeedback
      >
        <Input placeholder={t("PROVIDE_NAME").toString()} />
      </Form.Item>

      <Form.Item
        label={t("JOB_TITLE")}
        name={["handler", "jobTitle"]}
        rules={[
          {
            required: true,
            message: t("PROVIDE_JOB_TITLE").toString(),
          },
        ]}
        hasFeedback
      >
        <Input placeholder={t("PROVIDE_JOB_TITLE").toString()} />
      </Form.Item>

      <Form.Item
        label={t("PHONE_NUMBER")}
        name={["handler", "phoneNumber"]}
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

      <Form.Item
        label={t("EMAIL")}
        name={["handler", "email"]}
        rules={[
          {
            type: "email",
            message: t("TYPE_VALID_EMAIL").toString(),
          },
          {
            required: true,
            message: t("PROVIDE_AN_EMAIL").toString(),
          },
        ]}
        hasFeedback
      >
        <Input placeholder={t("PROVIDE_AN_EMAIL").toString()} />
      </Form.Item>
    </>
  );
};

export default CompanyInternshipHandlerStep;
