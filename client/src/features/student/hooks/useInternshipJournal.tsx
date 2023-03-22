import { useState } from "react";
import { notification } from "antd";
import { useTranslation } from "react-i18next";

import { getInternship, patchInternship } from "../api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IInternshipData } from "common/types";

const useInternshipJournal = (internshipId: string) => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);

  const { data: internshipData, refetch: refetchInternshipData } =
    useQuery<IInternshipData>(
      ["getInternshipJournal", internshipId],
      () => {
        return getInternship(internshipId, "journal");
      },
      {
        onSuccess: () => {
          setIsLoading(false);
        },
        onError: () => {
          setIsLoading(false);
          notification.error({
            message: "Ooops ...",
            description: t("FETCHING_INTERNSHIP_ERR"),
            duration: 10,
          });
        },
      }
    );

  const { mutate: mutateUpdateInternshipJournal } = useMutation(
    ["updateInternshipJournal", internshipId],
    (newData: IInternshipData) => {
      setIsLoading(true);
      return patchInternship(internshipId, newData);
    },
    {
      onSuccess: () => {
        setIsLoading(false);
        refetchInternshipData();
        notification.success({
          message: t("GREAT"),
          description: t("JOURNAL_UPDATED"),
          duration: 10,
        });
      },
      onError: () => {
        setIsLoading(false);
        refetchInternshipData();
        notification.error({
          message: "Ooops ...",
          description: t("JOURNAL_UPDATED_ERR"),
          duration: 10,
        });
      },
    }
  );

  return { isLoading, internshipData, mutateUpdateInternshipJournal };
};

export default useInternshipJournal;
