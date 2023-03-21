import { Row, Col, Spin } from "antd";
import { useTranslation } from "react-i18next";

import { IProfessorData } from "common/types";
import ProfessorProfileForm from "./ProfessorProfileForm";
import useProfessorCreateUpdate from "../hooks/useProfessorCreateUpdate";

interface IProfessorProfileData {
  professorData: IProfessorData;
}

const ProfessorData = ({ professorData }: IProfessorProfileData) => {
  const { t } = useTranslation();

  const { isLoading, mutateUpdateProfessor } = useProfessorCreateUpdate();

  return (
    <>
      <Spin spinning={isLoading} tip={t("UPDATING_ACCOUNT")}>
        <Row gutter={[16, 16]}>
          <Col span={12} offset={6}>
            <ProfessorProfileForm
              initialData={professorData}
              displayLabels={true}
              finishPrompt={t("UPDATE_ACCOUNT")}
              onFinish={(newData: IProfessorData) => {
                mutateUpdateProfessor({ profId: professorData._id, newData });
              }}
            />
          </Col>
        </Row>
      </Spin>
    </>
  );
};

export default ProfessorData;
