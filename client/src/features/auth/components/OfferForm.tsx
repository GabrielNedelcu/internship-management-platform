import { Form, FormListFieldData, Input, InputNumber } from "antd";
import { Collabsable } from "../../../common";
const { TextArea } = Input;

const OfferForm = (props: { field: FormListFieldData }) => {
  const field = props.field;
  return (
    <>
      <Form.Item
        {...field}
        label="Job Title"
        name={[field.name, "title"]}
        rules={[
          {
            required: true,
            message: "Please provide the offerțs job title",
          },
        ]}
        hasFeedback
      >
        <Input placeholder="Please enter the job's title." />
      </Form.Item>

      <Form.Item
        {...field}
        label="Job Description"
        name={[field.name, "description"]}
        rules={[
          {
            required: true,
            message: "Please provide the offer's description",
          },
        ]}
        hasFeedback
      >
        <TextArea rows={3} placeholder="Please enter the job's description" />
      </Form.Item>

      <Form.Item
        {...field}
        label="Departament"
        name={[field.name, "departament"]}
        rules={[
          {
            required: true,
            message: "Please provide the offer's departament!",
          },
        ]}
        hasFeedback
      >
        <Input placeholder="Please enter the departament in which the offer will be" />
      </Form.Item>

      <Form.Item
        {...field}
        label="Available Positions"
        name={[field.name, "availablePos"]}
        rules={[
          {
            required: true,
            message: "Please provide the number of available positions",
          },
          () => ({
            validator(_, value) {
              if (!value || value >= 1) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("Please provide at least 1 available position")
              );
            },
          }),
        ]}
        hasFeedback
      >
        <InputNumber min={0} defaultValue={0} value={1} />
      </Form.Item>

      <Form.Item
        {...field}
        label="Requirements"
        name={[field.name, "requirements"]}
        hasFeedback
      >
        <TextArea rows={3} placeholder="Please enter the job's requirements" />
      </Form.Item>

      <Form.Item
        {...field}
        label="Other Mentions"
        name={[field.name, "mentions"]}
        hasFeedback
      >
        <TextArea
          rows={3}
          placeholder="Please enter, if needed, other metions. E.g. All the CVs must pe also sent to the following email address ..."
        />
      </Form.Item>

      <Collabsable
        key={`supervisor#${field.key}`}
        panelTitle={"Supervisor"}
        contentElement={
          <>
            <Form.Item
              {...field}
              label="Full Name"
              name={[field.name, "supervisor", "name"]}
              rules={[
                {
                  required: true,
                  message:
                    "Please provide the full name for the supervisor for this offer!",
                },
              ]}
              hasFeedback
            >
              <Input placeholder="Offer's supervisor's Full Name" />
            </Form.Item>

            <Form.Item
              {...field}
              label="Job Title"
              name={[field.name, "supervisor", "jobTitle"]}
              rules={[
                {
                  required: true,
                  message:
                    "Please provide the job title for the supervisor for this offer!",
                },
              ]}
              hasFeedback
            >
              <Input placeholder="Offer's supervisor's Job Title" />
            </Form.Item>

            <Form.Item
              {...field}
              label="Phone Number"
              name={[field.name, "supervisor", "phoneNumber"]}
              rules={[
                {
                  required: true,
                  message:
                    "Please provide the phone number for the supervisor for this offer!",
                },
                () => ({
                  validator(_, value) {
                    if (!value || value.length === 9) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "Please provide a phone number containnig 9 digits"
                      )
                    );
                  },
                }),
              ]}
              hasFeedback
            >
              <Input
                addonBefore="+40"
                placeholder="Offer's supervisor's Phone Number"
              />
            </Form.Item>

            <Form.Item
              {...field}
              label="Email"
              name={[field.name, "supervisor", "email"]}
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
              <Input placeholder="Offer's supervisor's Email" />
            </Form.Item>
          </>
        }
      />
    </>
  );
};

export default OfferForm;
