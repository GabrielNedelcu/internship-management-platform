import { Form, Input, Switch } from "antd";
const { TextArea } = Input;

const InternshipSetupStep = () => {
  return (
    <>
      <Form.Item
        label="Address"
        name="internshipMainAddress"
        rules={[
          {
            required: true,
            message: "Please provide the address!",
          },
        ]}
        hasFeedback
      >
        <Input placeholder="Please enter the address at which the students will be present" />
      </Form.Item>

      <Form.Item
        label="Other Addresses"
        name="internshipOtherAddresses"
        hasFeedback
      >
        <TextArea
          rows={2}
          placeholder="Please enter any other addresses at which the students will work"
        />
      </Form.Item>

      <Form.Item
        label="Contract"
        name="internshipContract"
        valuePropName="checked"
        initialValue
      >
        <Switch checkedChildren="yes" unCheckedChildren="no" />
      </Form.Item>

      <Form.Item
        label="Compensation"
        name="internshipCompensation"
        valuePropName="checked"
        initialValue
      >
        <Switch checkedChildren="yes" unCheckedChildren="no" />
      </Form.Item>

      <Form.Item
        label="Other Advantages"
        name="internshipOtherAdvantages"
        hasFeedback
      >
        <TextArea
          rows={2}
          placeholder="Please enter any other advantages (meal tickets, bonuses, etc.)"
        />
      </Form.Item>
    </>
  );
};

export default InternshipSetupStep;
