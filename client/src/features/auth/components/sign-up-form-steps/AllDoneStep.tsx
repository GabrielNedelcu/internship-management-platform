import { Button, Form } from "antd";
import { useTranslation } from "react-i18next";
import allDoneImg from "../../../../assets/Checklist.jpg";

const AllDoneStep = () => {
  const { t } = useTranslation();

  return (
    <>
      <img src={allDoneImg} alt="All done here!"></img>
      <h1 className="header">{t("ALL_DONE")}</h1>
      <p className="paragraph">{t("ALL_DONE_MSG")}</p>
      <Form.Item>
        <Button type="primary" block htmlType="submit">
          Sign Up
        </Button>
      </Form.Item>
    </>
  );
};

export default AllDoneStep;
