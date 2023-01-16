import { Form, Input, Select } from "antd";
const { TextArea } = Input;

const CompanyGeneralInfoStep = () => {
  return (
    <>
      <Form.Item label="Company Name" name="company_name">
        <Input placeholder="Please enter the full company's name." />
      </Form.Item>
      <Form.Item label="Company Description" name="company_address">
        <TextArea
          rows={3}
          placeholder="Please enter the company's description."
        />
      </Form.Item>
      <Form.Item label="Field of work" name="company_field_of_work">
        <Select placeholder="Please select the company's field of work">
          <Select.Option value="demo1">Telecom</Select.Option>
          <Select.Option value="demo2">Software Developement</Select.Option>
          <Select.Option value="demo3">Electronics</Select.Option>
          <Select.Option value="demo4">Other</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Company Address" name="company_address">
        <Input placeholder="Please enter the full company's address" />
      </Form.Item>
      <Form.Item label="Phone Number" name="company_phone_number">
        <Input
          addonBefore="+40"
          placeholder="Please enter a contact phone number for the company"
        />
      </Form.Item>
    </>
  );
};

export default CompanyGeneralInfoStep;
