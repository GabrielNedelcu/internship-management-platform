import { Form, Input, Select } from "antd";
const { TextArea } = Input;

const CompanyGeneralInfoStep = () => {
  return (
    <>
      <Form.Item
        label="Company Name"
        name="name"
        rules={[{ required: true, message: "Please provide a company name!" }]}
        hasFeedback
      >
        <Input placeholder="Please enter the full company's name." />
      </Form.Item>

      <Form.Item
        label="Company Description"
        name="description"
        rules={[
          {
            required: true,
            message: "Please provide a description for your company",
          },
        ]}
        hasFeedback
      >
        <TextArea
          rows={3}
          placeholder="Please provide a comprehensive company description. This will be visible to all students who view your company."
        />
      </Form.Item>

      <Form.Item
        label="Field of work"
        name="fieldOfWork"
        rules={[
          {
            required: true,
            message: "Please select the field of work for your company",
          },
        ]}
      >
        <Select placeholder="Please select the company's field of work">
          <Select.Option value="telecom">Telecom</Select.Option>
          <Select.Option value="softwareDev">
            Software Developement
          </Select.Option>
          <Select.Option value="electronics">Electronics</Select.Option>
          <Select.Option value="other">Other</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Company Address"
        name="address"
        rules={[
          {
            required: true,
            message: "Please select the field of work for your company",
          },
        ]}
        hasFeedback
      >
        <Input placeholder="Please enter the full company's address, as found in official documents" />
      </Form.Item>

      <Form.Item
        label="Phone Number"
        name="contactNumber"
        rules={[
          {
            required: true,
            message: "Please select the field of work for your company",
          },
          () => ({
            validator(_, value) {
              if (!value || value.length === 9) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("Please enter a phone number containnig 9 digits")
              );
            },
          }),
        ]}
        hasFeedback
      >
        <Input
          addonBefore="+40"
          placeholder="Please enter a contact phone number for the company"
        />
      </Form.Item>
    </>
  );
};

export default CompanyGeneralInfoStep;
