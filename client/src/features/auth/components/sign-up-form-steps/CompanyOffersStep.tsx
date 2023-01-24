import { Form, Button } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

import { Collabsable } from "../../../../common";
import { OfferForm } from "../";

const CompanyOffersStep = () => {
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
                    panelTitle={`Offer #${index}`}
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
