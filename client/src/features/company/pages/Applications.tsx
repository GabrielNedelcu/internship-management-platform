import { Typography } from "antd";
import ApplicationsList from "../components/ApplicationsList";
const Applications = () => {
  return (
    <>
      <Typography.Title level={1}>Aplications</Typography.Title>
      <Typography.Title level={5} type={"secondary"}>
        Here is the list of all aplications to your company ...
      </Typography.Title>

      <ApplicationsList />
    </>
  );
};

export default Applications;
