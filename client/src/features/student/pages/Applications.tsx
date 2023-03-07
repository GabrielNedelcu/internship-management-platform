import { Typography } from "antd";
import ApplicationsList from "../components/ApplicationsList";

const Applications = () => {
  return (
    <>
      <Typography.Title level={1}>Your applications</Typography.Title>
      <Typography.Title level={5} type={"secondary"}>
        Review all the offers you have applied to ...
      </Typography.Title>

      <ApplicationsList />
    </>
  );
};

export default Applications;
