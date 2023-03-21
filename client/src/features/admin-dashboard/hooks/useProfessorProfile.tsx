import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { notification } from "antd";
import { useTranslation } from "react-i18next";

import { IProfessorData } from "common/types";
import { getProfessor, updateProfessor } from "../api";

interface IUpdateProfessorProps {
  profId: string;
  newData: IProfessorData;
}

const useProfessorProfile = (professorId: string) => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { data: professorData, refetch: refetchProfessorData } =
    useQuery<IProfessorData>(
      ["getProfessor", professorId],
      () => {
        setIsLoading(true);
        return getProfessor(professorId || "");
      },
      {
        onSuccess: () => {
          setIsLoading(false);
        },
        onError: () => {
          setIsLoading(false);
          notification.error({
            message: "Ooops ...",
            description: t("CANNOT_RETRIEVE_TEACHER_DATA"),
            duration: 10,
          });
        },
      }
    );

  const { mutate: mutateUpdateProfessor } = useMutation(
    ["updateProfessor"],
    (updateProps: IUpdateProfessorProps) => {
      setIsLoading(true);
      return updateProfessor(updateProps.profId, updateProps.newData);
    },
    {
      onSuccess: () => {
        setIsLoading(false);
        refetchProfessorData();
        notification.success({
          message: t("ACCOUNT_UPDATED"),
          description: t("UPDATE_ACCOUNT_SUCCESS_MSG"),
          duration: 10,
        });
      },
      onError: () => {
        setIsLoading(false);

        notification.error({
          message: "Ooops ...",
          description: t("UPDATE_ACCOUNT_ERR_MSG"),
          duration: 10,
        });
      },
    }
  );

  return { isLoading, professorData, mutateUpdateProfessor };
};

export default useProfessorProfile;
