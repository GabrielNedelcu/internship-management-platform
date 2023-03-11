import { Modal } from "antd";
import { Tabs } from "common";
import { ITabProps } from "common/types";

const AdminEditStudentModal = () => {
  const tabs: ITabProps[] = [
    {
      label: <span>General Information</span>,
      key: "1",
      children: <></>,
    },
    {
      label: <span>Sensitive Information</span>,
      key: "2",
      children: <></>,
    },
    {
      label: <span>Internship Information</span>,
      key: "3",
      children: <></>,
    },
    {
      label: <span>Documents</span>,
      key: "4",
      children: <></>,
    },
    {
      label: <span></span>,
      key: "5",
      children: <></>,
    },
  ];

  return (
    <>
      <Modal
        title="View and Edit Student Data"
        open={false}
        width={1100}
        //onOk={handleOk}
        //confirmLoading={confirmLoading}
        //onCancel={handleCancel}
      >
        <Tabs tabList={tabs} />
      </Modal>
    </>
  );
};

export default AdminEditStudentModal;
