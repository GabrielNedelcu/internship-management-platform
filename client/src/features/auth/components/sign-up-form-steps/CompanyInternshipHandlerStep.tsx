import { Form, Input } from "antd";

const CompanyInternshipHandlerStep = () => {
  return (
    <>
      <Form.Item
        label="Full Name"
        name={["handler", "name"]}
        rules={[
          {
            required: true,
            message: "Please provide the full name for the handler!",
          },
        ]}
        hasFeedback
      >
        <Input placeholder="Company's Internship Handler Full Name" />
      </Form.Item>

      <Form.Item
        label="Job Title"
        name={["handler", "jobTitle"]}
        rules={[
          {
            required: true,
            message: "Please provide the job title for the handler!",
          },
        ]}
        hasFeedback
      >
        <Input placeholder="Company's Internship Handler Job Title" />
      </Form.Item>

      <Form.Item
        label="Phone Number"
        name={["handler", "phoneNumber"]}
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
          placeholder="Company's Internship Handler Phone Number"
        />
      </Form.Item>

      <Form.Item
        label="Email"
        name={["handler", "email"]}
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
        <Input placeholder="Company's Internship Handler Email" />
      </Form.Item>
    </>
  );
};

export default CompanyInternshipHandlerStep;
