import { Form, Input, InputNumber, Select } from "antd";
import { Collabsable } from "../../../common";
const { TextArea } = Input;

const OfferForm = () => {
  return (
    <>
      <Form.Item label="Job Title" name="offer_title">
        <Input placeholder="Please enter the job's title." />
      </Form.Item>
      <Form.Item label="Job Description" name="offer_description">
        <TextArea rows={3} placeholder="Please enter the job's description" />
      </Form.Item>
      <Form.Item label="Departament" name="offer_departament">
        <Input placeholder="Please enter the departament in which the offer will be" />
      </Form.Item>
      <Form.Item label="Available Positions" name="offer_available_positions">
        <InputNumber min={1} defaultValue={1} />
      </Form.Item>
      <Form.Item label="Requirements" name="offer_requirements">
        <TextArea rows={3} placeholder="Please enter the job's requirements" />
      </Form.Item>
      <Form.Item label="Other Mentions" name="offer_mentions">
        <TextArea
          rows={3}
          placeholder="Please enter, if needed, other metions. E.g. All the CVs must pe also sent to the following email address ..."
        />
      </Form.Item>
      <Collabsable
        panelTitle={"Supervisor"}
        contentElement={
          <>
            <Form.Item label="Full Name" name="offer_supervisor_name">
              <Input placeholder="Offer's supervisor's Full Name" />
            </Form.Item>
            <Form.Item label="Job Title" name="offer_supervisor_job_title">
              <Input placeholder="Offer's supervisor's Job Title" />
            </Form.Item>
            <Form.Item
              label="Phone Number"
              name="offer_supervisor_phone_number"
            >
              <Input
                addonBefore="+40"
                placeholder="Offer's supervisor's Phone Number"
              />
            </Form.Item>
            <Form.Item label="Email" name="offer_supervisor_email">
              <Input placeholder="Offer's supervisor's Email" />
            </Form.Item>
          </>
        }
      />
    </>
  );
};

export default OfferForm;
