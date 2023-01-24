import { Form, Input } from "antd";

const CompanyLegalRepStep = () => {
  return (
    <>
      <Form.Item
        label="Full Name"
        name={["legalRep", "name"]}
        rules={[
          {
            required: true,
            message: "Please provide the full name for the representative!",
          },
        ]}
        hasFeedback
      >
        <Input placeholder="Company's Legal Representative Full Name" />
      </Form.Item>

      <Form.Item
        label="Job Title"
        name={["legalRep", "jobTitle"]}
        rules={[
          {
            required: true,
            message: "Please provide the job title for the representative!",
          },
        ]}
        hasFeedback
      >
        <Input placeholder="Company's Representative Job Title" />
      </Form.Item>

      <Form.Item
        label="Phone Number"
        name={["legalRep", "phoneNumber"]}
        rules={[
          {
            required: true,
            message: "Please provide the phone number for the representative!",
          },
          () => ({
            validator(_, value) {
              if (!value || value.length === 9) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("Please provide a phone number containnig 9 digits")
              );
            },
          }),
        ]}
        hasFeedback
      >
        <Input
          addonBefore="+40"
          placeholder="Company's Representative Phone Number"
        />
      </Form.Item>

      <Form.Item
        label="Email"
        name={["legalRep", "email"]}
        rules={[
          {
            type: "email",
            message: "Please provide a valid email address!",
          },
          {
            required: true,
            message: "Please provide the email address for the handler!",
          },
        ]}
        hasFeedback
      >
        <Input placeholder="Company's Representative Email" />
      </Form.Item>
    </>
  );
};

export default CompanyLegalRepStep;
