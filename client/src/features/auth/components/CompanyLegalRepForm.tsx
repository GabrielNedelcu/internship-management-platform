import { Form, Input } from "antd";

const CompanyLegalRepForm = () => {
  return (
    <>
      <Form.Item label="Full Name" name="company_legal_rep_name">
        <Input placeholder="Company's Representative Full Name" />
      </Form.Item>
      <Form.Item label="Job Title" name="company_legal_rep_job_title">
        <Input placeholder="Company's Representative Job Title" />
      </Form.Item>
      <Form.Item label="Phone Number" name="company_legal_rep_phone_number">
        <Input
          addonBefore="+40"
          placeholder="Company's Representative Phone Number"
        />
      </Form.Item>
      <Form.Item label="Email" name="company_legal_rep_email">
        <Input placeholder="Company's Representative Email" />
      </Form.Item>
    </>
  );
};

export default CompanyLegalRepForm;
