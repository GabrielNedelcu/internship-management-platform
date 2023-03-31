import { notification } from "antd";
import { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";

import {
  ICompanyData,
  ICountServerResponse,
  IServerResponseMultipleFetch,
} from "common/types";
import {
  getCompany,
  getInReviewApplications,
  getInternships,
  getOffers,
  getSelfApplications,
} from "../api";
import { UserContext } from "app/contexts/UserContext";

const useCompanyStats = () => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const { userID } = useContext(UserContext);

  const { data: applicationsList } = useQuery<IServerResponseMultipleFetch>(
    ["getSelfApplications"],
    () => {
      setIsLoading(true);
      return getSelfApplications("", {
        pagination: { page: 1, pageSize: 4 },
        sort: "desc.createdAt",
      });
    },
    {
      onSuccess: () => {
        setIsLoading(false);
      },
      onError: () => {
        setIsLoading(false);
        notification.error({
          message: "Ooops ...",
          description: t("CANNOT_RETRIEVE_APPLICATIONS"),
          duration: 10,
        });
      },
    }
  );

  const { data: internshipsList } = useQuery<IServerResponseMultipleFetch>(
    ["getInternships"],
    () => {
      setIsLoading(true);
      return getInternships("", {
        pagination: { page: 1, pageSize: 4 },
        sort: "desc.createdAt",
      });
    },
    {
      onSuccess: () => {
        setIsLoading(false);
      },
      onError: () => {
        setIsLoading(false);
        notification.error({
          message: "Ooops ...",
          description: t("CANNOT_RETRIEVE_INTERNSHIPS"),
          duration: 10,
        });
      },
    }
  );

  const { data: offers } = useQuery<IServerResponseMultipleFetch>(
    ["getAllOffersCompany"],
    () => {
      setIsLoading(true);
      return getOffers(
        "",
        {
          fields: "title,availablePos,remainingAvailablePos,applications",
          pagination: { page: 1, pageSize: 4 },
          sort: "desc.remainingAvailablePos",
        },
        userID
      );
    },
    {
      onSuccess: () => {
        setIsLoading(false);
      },
      onError: () => {
        setIsLoading(false);
        notification.error({
          message: "Ooops ...",
          description: t("CANNOT_RETRIEVE_OFFERS"),
          duration: 10,
        });
      },
    }
  );

  const { data: companyProfileData } = useQuery<ICompanyData>(
    ["getSelfStudent"],
    () => {
      setIsLoading(true);
      return getCompany(userID, { fields: "numPositions" });
    },
    {
      onSuccess: () => {
        setIsLoading(false);
      },
      onError: () => {
        setIsLoading(false);
        notification.error({
          message: "Ooops ...",
          description: t("CANNOT_RETRIEVE_PROFILE_DATA"),
          duration: 10,
        });
      },
    }
  );

  const { data: inReviewApps } = useQuery<IServerResponseMultipleFetch>(
    ["getSelfApplicationsInReview"],
    () => {
      setIsLoading(true);
      return getSelfApplications("", {
        pagination: { page: 1, pageSize: 1 },
        sort: "desc.createdAt",
        filters: [{ field: "status", values: ["inReview"] }],
      });
    },
    {
      onSuccess: () => {
        setIsLoading(false);
      },
      onError: () => {
        setIsLoading(false);
        notification.error({
          message: "Ooops ...",
          description: t("CANNOT_RETRIEVE_APPLICATIONS"),
          duration: 10,
        });
      },
    }
  );

  return {
    isLoading,
    applicationsList,
    internshipsList,
    offers,
    companyProfileData,
    inReviewApps,
  };
};

export default useCompanyStats;
