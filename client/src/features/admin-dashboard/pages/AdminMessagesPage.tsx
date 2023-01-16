import { Typography } from "antd";

const AdminMessagesPage = () => {
  return (
    <>
      <Typography.Title level={1}>Messages</Typography.Title>
      <Typography.Title level={5} type={"secondary"}>
        View, respond and delete messages sent by students or companies ...
      </Typography.Title>
    </>
  );
};

export default AdminMessagesPage;
