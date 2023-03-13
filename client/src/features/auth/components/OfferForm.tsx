import { Form, FormListFieldData, Input, InputNumber } from "antd";
import { useTranslation } from "react-i18next";
import { Collabsable } from "../../../common";
const { TextArea } = Input;

const OfferForm = (props: { field: FormListFieldData }) => {
  const { t } = useTranslation();

  const field = props.field;
  return (
    <>
      <Form.Item
        {...field}
        label={t("JOB_TITLE")}
        name={[field.name, "title"]}
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
        {...field}
        label={t("JOB_DESCRIPTION")}
        name={[field.name, "description"]}
        rules={[
          {
            required: true,
            message: t("PROVIDE_JOB_dESCRIPTION").toString(),
          },
        ]}
        hasFeedback
      >
        <TextArea
          rows={3}
          placeholder={t("PROVIDE_JOB_dESCRIPTION").toString()}
        />
      </Form.Item>

      <Form.Item
        {...field}
        label={t("DEPARTAMENT")}
        name={[field.name, "departament"]}
        rules={[
          {
            required: true,
            message: t("PROVIDE_DEPARTAMENT").toString(),
          },
        ]}
        hasFeedback
      >
        <Input placeholder={t("PROVIDE_DEPARTAMENT").toString()} />
      </Form.Item>

      <Form.Item
        {...field}
        label={t("AVAILABLE_POSITIONS")}
        name={[field.name, "availablePos"]}
        rules={[
          {
            required: true,
          },
          () => ({
            validator(_, value) {
              if (!value || value >= 1) {
                return Promise.resolve();
              }
              return Promise.reject(new Error(""));
            },
          }),
        ]}
        hasFeedback
      >
        <InputNumber min={0} defaultValue={0} value={1} />
      </Form.Item>

      <Form.Item
        {...field}
        label={t("JOB_REQUIREMENTS")}
        name={[field.name, "requirements"]}
        hasFeedback
      >
        <TextArea rows={3} placeholder={t("PROVIDE_REQUIREMENTS").toString()} />
      </Form.Item>

      <Form.Item
        {...field}
        label={t("OTHER_MENTIONS")}
        name={[field.name, "mentions"]}
        hasFeedback
      >
        <TextArea rows={3} />
      </Form.Item>

      <Collabsable
        key={`supervisor#${field.key}`}
        panelTitle={t("SUPERVISOR")}
        contentElement={
          <>
            <Form.Item
              {...field}
              label={t("NAME")}
              name={[field.name, "supervisor", "name"]}
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
              {...field}
              label={t("JOB_TITLE")}
              name={[field.name, "supervisor", "jobTitle"]}
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
              {...field}
              label={t("PHONE_NUMBER")}
              name={[field.name, "supervisor", "phoneNumber"]}
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
              {...field}
              label={t("EMAIL")}
              name={[field.name, "supervisor", "email"]}
              rules={[
                {
                  type: "email",
                  message: t("TYPE_VALID_EMAIL").toString(),
                },
                {
                  required: true,
                  message: t("PROVIDE_EMAIL").toString(),
                },
              ]}
              hasFeedback
            >
              <Input placeholder={t("PROVIDE_EMAIL").toString()} />
            </Form.Item>
          </>
        }
      />
    </>
  );
};

export default OfferForm;
