import { Form, Input, Switch } from "antd";
const { TextArea } = Input;

const InternshipSetupStep = () => {
  return (
    <>
      <Form.Item label="Address" name="company_internship_main_address">
        <Input placeholder="Please enter the address at which the students will be present" />
      </Form.Item>
      <Form.Item
        label="Other Addresses"
        name="company_internship_other_addresses"
      >
        <TextArea
          rows={2}
          placeholder="Please enter any other addresses at which the students will work"
        />
      </Form.Item>
      <Form.Item label="Contract" name="company_internship_contract">
        <Switch
          checkedChildren="yes"
          unCheckedChildren="no"
          defaultChecked={false}
        />
      </Form.Item>
      <Form.Item label="Compensation" name="company_internship_compensation">
        <Switch
          checkedChildren="yes"
          unCheckedChildren="no"
          defaultChecked={false}
        />
      </Form.Item>
      <Form.Item
        label="Other Advantages"
        name="company_internship_other_advantages"
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
