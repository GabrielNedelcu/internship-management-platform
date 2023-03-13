import { Form, Button } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

import { Collabsable } from "../../../../common";
import { OfferForm } from "../";
import { useTranslation } from "react-i18next";

const CompanyOffersStep = () => {
  const { t } = useTranslation();

  return (
    <>
      <Form.List name="offers">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => {
              return (
                <>
                  <Collabsable
                    key={index}
                    panelTitle={`${t("OFFER")} #${index}`}
                    contentElement={<OfferForm field={field} />}
                    extraButton={
                      <MinusCircleOutlined
                        onClick={() => {
                          remove(field.name);
                        }}
                      />
                    }
                  />
                  <br />
                </>
              );
            })}
            <Form.Item>
              <Button
                type="primary"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                {t("ADD_OFFER")}
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </>
  );
};

export default CompanyOffersStep;
