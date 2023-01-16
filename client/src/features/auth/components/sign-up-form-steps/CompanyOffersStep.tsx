import { Form, Button } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

import { Collabsable } from "../../../../common";
import { OfferForm } from "../";

const CompanyOffersStep = () => {
  return (
    <>
      <Form.List name="company-offers">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => {
              console.log(fields.length);
              console.log(index);

              return (
                <Form.Item>
                  <Collabsable
                    panelTitle={`Offer #${index}`}
                    contentElement={<OfferForm />}
                    extraButton={
                      <MinusCircleOutlined
                        onClick={() => {
                          remove(field.name);
                        }}
                      />
                    }
                  />
                </Form.Item>
              );
            })}
            <Form.Item>
              <Button
                type="primary"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add Offer
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </>
  );
};

export default CompanyOffersStep;
