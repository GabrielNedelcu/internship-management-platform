import { useState } from "react";
import { notification } from "antd";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";

import { URL_ROUTES } from "common/constants";
import { getDocumentsCount, getOffersStats } from "../api";
import { ICountServerResponse, IOffersStats } from "common/types";

const useStats = () => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);

  const { data: studentsCount } = useQuery<ICountServerResponse>(
    ["getStudentsCount"],
    () => {
      setIsLoading(true);
      return getDocumentsCount(URL_ROUTES.STUDENTS);
    },
    {
      onSuccess: () => {
        setIsLoading(false);
      },
      onError: () => {
        setIsLoading(false);
        notification.error({
          message: "Ooops ...",
          description: t("CANNOT_RETRIEVE_DATA"),
          duration: 10,
        });
      },
    }
  );

  const { data: professorsCount } = useQuery<ICountServerResponse>(
    ["getProfessorsCount"],
    () => {
      setIsLoading(true);
      return getDocumentsCount(URL_ROUTES.PROFESSORS);
    },
    {
      onSuccess: () => {
        setIsLoading(false);
      },
      onError: () => {
        setIsLoading(false);
        notification.error({
          message: "Ooops ...",
          description: t("CANNOT_RETRIEVE_DATA"),
          duration: 10,
        });
      },
    }
  );

  const { data: applicationsCount } = useQuery<ICountServerResponse>(
    ["getApplicationsCount"],
    () => {
      setIsLoading(true);
      return getDocumentsCount(URL_ROUTES.APPLICATIONS);
    },
    {
      onSuccess: () => {
        setIsLoading(false);
      },
      onError: () => {
        setIsLoading(false);
        notification.error({
          message: "Ooops ...",
          description: t("CANNOT_RETRIEVE_DATA"),
          duration: 10,
        });
      },
    }
  );

  const { data: internshipsCount } = useQuery<ICountServerResponse>(
    ["getInternshipsCount"],
    () => {
      setIsLoading(true);
      return getDocumentsCount(URL_ROUTES.INTERNSHIPS);
    },
    {
      onSuccess: () => {
        setIsLoading(false);
      },
      onError: () => {
        setIsLoading(false);
        notification.error({
          message: "Ooops ...",
          description: t("CANNOT_RETRIEVE_DATA"),
          duration: 10,
        });
      },
    }
  );

  const { data: offersStats } = useQuery<IOffersStats>(
    ["getOffersStats"],
    () => {
      setIsLoading(true);
      return getOffersStats();
    },
    {
      onSuccess: () => {
        setIsLoading(false);
      },
      onError: () => {
        setIsLoading(false);
        notification.error({
          message: "Ooops ...",
          description: t("CANNOT_RETRIEVE_STATS"),
          duration: 10,
        });
      },
    }
  );

  return {
    isLoading,
    studentsCount,
    professorsCount,
    applicationsCount,
    internshipsCount,
    offersStats,
  };
};

export default useStats;
