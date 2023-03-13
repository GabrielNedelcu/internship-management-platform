import { useState } from "react";
import { notification } from "antd";
import { useQuery } from "@tanstack/react-query";
import { getCompany } from "../api";
import { useTranslation } from "react-i18next";

const useOfferProfile = (companyId: string) => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);

  const { data: companyData } = useQuery(
    ["getCompany", companyId],
    () => {
      setIsLoading(true);
      return getCompany(companyId, {
        fields:
          "name,description,fieldOfWork,internshipOtherAdvantages,internshipCompensation,internshipContract,numOffers,numPositions",
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
          description: t("CANNOT_RETRIEVE_COMPANY_DATA"),
          duration: 10,
        });
      },
    }
  );

  return { companyData, isLoading };
};

export default useOfferProfile;
