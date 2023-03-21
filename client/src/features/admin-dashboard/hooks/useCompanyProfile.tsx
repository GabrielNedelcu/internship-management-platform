import { useState } from "react";
import { notification } from "antd";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { ICompanyData } from "common/types";
import { getCompany, patchCompany } from "../api";

const useCompanyProfile = (companyID: string) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const [isLoading, setIsLoading] = useState(false);

  const { data: companyData } = useQuery<ICompanyData>(
    ["getCompany", companyID],
    () => {
      setIsLoading(true);
      return getCompany(companyID);
    },
    {
      onSuccess: () => {
        setIsLoading(false);
      },
      onError: () => {
        setIsLoading(false);
        notification.error({
          message: "Ooops ...",
          description: t("CANNOT_RETRIEVE_COMPANY_DATA"),
          duration: 10,
        });
      },
    }
  );

  const { mutate: mutateAcceptDeclineCompany } = useMutation(
    ["acceptDeclineCompany"],
    (accept: boolean) => {
      setIsLoading(true);
      return patchCompany(companyID, {
        validated: accept,
      });
    },
    {
      onSuccess: () => {
        setIsLoading(false);

        queryClient.invalidateQueries(["getCompany", companyID]);

        notification.success({
          message: t("GREAT"),
          description: t("COMPANY_ACCEPTED"),
          duration: 10,
        });
      },
      onError: () => {
        setIsLoading(false);
        notification.error({
          message: "Oops ...",
          description: t("CANNOT_ACCEPT_COMPANIES"),
          duration: 10,
        });
      },
    }
  );

  return { companyData, isLoading, mutateAcceptDeclineCompany };
};

export default useCompanyProfile;
