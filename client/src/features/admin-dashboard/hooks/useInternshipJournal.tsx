import { useState } from "react";
import { notification } from "antd";
import { useTranslation } from "react-i18next";

import { getInternship } from "../api";
import { useQuery } from "@tanstack/react-query";
import { IInternshipData } from "common/types";

const useInternshipJournal = (internshipId: string) => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);

  const { data: internshipData } = useQuery<IInternshipData>(
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

  return { isLoading, internshipData };
};

export default useInternshipJournal;
