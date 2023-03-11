import { Modal } from "antd";
import { PasswordChangeForm } from "common";

interface IChangePasswordModalProps {
  openModal: boolean;
  onAfterOK: () => void;
}

const ChangePasswordModal = ({
  openModal,
  onAfterOK,
}: IChangePasswordModalProps) => {
  return (
    <>
      <Modal
        title="Change your account's password ..."
        open={openModal}
        footer={null}
        onCancel={() => onAfterOK()}
      >
        <br />
        <PasswordChangeForm afterSubmitCallback={onAfterOK} />
      </Modal>
    </>
  );
};

export default ChangePasswordModal;
