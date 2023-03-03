import { Typography } from "antd";
import CompaniesList from "../components/CompaniesList";

const Companies = () => {
  return (
    <>
      <Typography.Title level={1}>Companies List</Typography.Title>
      <Typography.Title level={5} type={"secondary"}>
        Find the perfect company for your professional journey ...
      </Typography.Title>

      <CompaniesList />
    </>
  );
};

export default Companies;
