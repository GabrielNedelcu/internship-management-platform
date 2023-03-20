import { Modal, Form, Select, Button, Divider, Typography } from "antd";
import { useTranslation } from "react-i18next";

import { IProfessorData } from "common/types";
import useAssignProfessor from "../hooks/useAssignProfessor";
import { LoadingPage } from "common";

interface IAssignProfessorModalProps {
  openModal: boolean;
  professors: IProfessorData[];
  internshipId: string;
  professorId?: string;
  closeModalCb: () => void;
  afterAssignCb: () => void;
}

const AssignProfessorModal = ({ ...props }: IAssignProfessorModalProps) => {
  const { t } = useTranslation();

  const onCloseModal = () => {
    setSelectedProfessorId("");
    form.resetFields();
    props.closeModalCb();
  };

  const {
    isLoading,
    selectedProfessorId,
    setSelectedProfessorId,
    mutateAssignProfessor,
  } = useAssignProfessor(props.internshipId, onCloseModal, props.afterAssignCb);

  const [form] = Form.useForm();

  if (isLoading) return <LoadingPage message="" />;

  return (
    <>
      <Modal
        title={t("ASSIGN_PROFESSOR")}
        open={props.openModal}
        footer={null}
        onCancel={onCloseModal}
      >
        <Form
          initialValues={{ professor: props.professorId }}
          form={form}
          onFinish={() => {
            mutateAssignProfessor(selectedProfessorId);
          }}
        >
          <Form.Item name="professor">
            <Select
              showSearch
              placeholder={t("SELECT_PROFESSOR")}
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={props.professors?.map(
                (professorData: IProfessorData) => {
                  return {
                    label: professorData.name,
                    value: professorData._id,
                  };
                }
              )}
              onChange={(value) => {
                setSelectedProfessorId(value);
              }}
            />
          </Form.Item>
          <Form.Item>
            <Typography.Text>{`${t("AVAILABLE_POSITIONS")}: ${
              props.professors.find(
                (professor) => professor._id === selectedProfessorId
              )?.numAvailablePositions || ""
            }`}</Typography.Text>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {t("ASSIGN")}
            </Button>
          </Form.Item>
        </Form>
        <Divider>{t("OR")}</Divider>
        <Button
          size="large"
          block
          onClick={() => {
            const randomProfessor =
              props.professors[
                Math.floor(Math.random() * props.professors.length)
              ];

            mutateAssignProfessor(randomProfessor._id);
          }}
        >
          {t("AUTO_ASSIGN")}
        </Button>
      </Modal>
    </>
  );
};

export default AssignProfessorModal;
