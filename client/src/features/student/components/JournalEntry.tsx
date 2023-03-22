import { DatePicker, Form, FormListFieldData, Input } from "antd";
import { useTranslation } from "react-i18next";

const JounralEntry = (props: { field: FormListFieldData }) => {
  const { t } = useTranslation();

  return (
    <>
      <Form.Item
        {...props.field}
        label={t("START_DATE")}
        name={[props.field.name, "startDate"]}
        rules={[
          {
            required: true,
            message: t("SELECT_START_DATE").toString(),
          },
        ]}
        hasFeedback
      >
        <DatePicker
          style={{ width: "100%" }}
          placeholder={t("SELECT_START_DATE").toString()}
        />
      </Form.Item>

      <Form.Item
        {...props.field}
        label={t("END_DATE")}
        name={[props.field.name, "endDate"]}
        rules={[
          {
            required: true,
            message: t("SELECT_END_DATE").toString(),
          },
        ]}
        hasFeedback
      >
        <DatePicker
          style={{ width: "100%" }}
          placeholder={t("SELECT_END_DATE").toString()}
        />
      </Form.Item>

      <Form.Item
        {...props.field}
        label={t("DESCRIPTION")}
        name={[props.field.name, "description"]}
        rules={[
          {
            required: true,
            message: t("PROVIDE_DESCRIPTION").toString(),
          },
        ]}
        hasFeedback
      >
        <Input.TextArea rows={4} />
      </Form.Item>
    </>
  );
};

export default JounralEntry;
