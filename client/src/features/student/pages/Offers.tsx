import { Typography } from "antd";
import { OffersList } from "../components";

const Offers = () => {
  return (
    <>
      <Typography.Title level={1}>Offers List</Typography.Title>
      <Typography.Title level={5} type={"secondary"}>
        Apply to the offer of your dreams ...
      </Typography.Title>

      <OffersList />
    </>
  );
};

export default Offers;
