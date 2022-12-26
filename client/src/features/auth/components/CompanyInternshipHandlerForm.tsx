import { Form, Input } from "antd";

const CompanyInternshipHandlerForm = () => {
  return (
    <>
      <Form.Item label="Full Name" name="company_internship_handler_name">
        <Input placeholder="Company's Internship Handler Full Name" />
      </Form.Item>
      <Form.Item label="Job Title" name="company_internship_handler_title">
        <Input placeholder="Company's Internship Handler Job Title" />
      </Form.Item>
      <Form.Item
        label="Phone Number"
        name="company_internship_handler_phone_number"
      >
        <Input
          addonBefore="+40"
          placeholder="Company's Internship Handler Phone Number"
        />
      </Form.Item>
      <Form.Item label="Email" name="company_internship_handler_email">
        <Input placeholder="Company's Internship Handler Email" />
      </Form.Item>
    </>
  );
};

export default CompanyInternshipHandlerForm;
