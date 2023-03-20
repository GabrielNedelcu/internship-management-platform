import { useState } from "react";
import { notification } from "antd";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import { wait } from "@testing-library/user-event/dist/utils";

import { patchInternship } from "../api";

const useAssignProfessor = (
  internshipId: string,
  onCloseModal: () => void,
  afterAssignCb: () => void
) => {
  const { t } = useTranslation();

  const [selectedProfessorId, setSelectedProfessorId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { mutate: mutateAssignProfessor } = useMutation(
    ["assignProfessor"],
    (assignedProfessorId: string) => {
      setIsLoading(true);
      return patchInternship(internshipId, { professor: assignedProfessorId });
    },
    {
      onSuccess: () => {
        setIsLoading(false);
        notification.success({
          message: t("PROFESSOR_ASIGNED"),
          description: t("PROFESSOR_ASIGNED_MSG"),
          duration: 10,
        });
        afterAssignCb();
        wait(3000).then(() => onCloseModal());
      },
      onError: () => {
        setIsLoading(false);
        notification.error({
          message: "Ooops ...",
          description: t("PROFESSOR_ASIGNED_ERR"),
          duration: 10,
        });
        onCloseModal();
        wait(3000).then(() => onCloseModal());
      },
    }
  );

  return {
    isLoading,
    selectedProfessorId,
    setSelectedProfessorId,
    mutateAssignProfessor,
  };
};

export default useAssignProfessor;
