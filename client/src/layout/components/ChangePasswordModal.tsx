import { Modal } from "antd";
import { PasswordChangeForm } from "common";
import { useTranslation } from "react-i18next";

interface IChangePasswordModalProps {
  openModal: boolean;
  onAfterOK: () => void;
}

const ChangePasswordModal = ({
  openModal,
  onAfterOK,
}: IChangePasswordModalProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Modal
        title={t("CHANGE_ACCOUNT_PASSWORD")}
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
