import { Button, Form } from "antd";
import allDoneImg from "../../../assets/Checklist.jpg";

const AllDoneForm = () => {
  return (
    <>
      <img src={allDoneImg} alt="All done here!"></img>
      <h1 className="header">Great, looks like you're done!</h1>
      <p className="paragraph">
        After submitting your company data, a faculty member will review your
        application and decide to accept, or decline your request. Either way,
        we will let you know :)
      </p>
      <Form.Item>
        <Button type="primary" block htmlType="submit">
          Sign Up
        </Button>
      </Form.Item>
    </>
  );
};

export default AllDoneForm;
