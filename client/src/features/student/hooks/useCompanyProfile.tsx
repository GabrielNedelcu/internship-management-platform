import { useState } from "react";
import { notification } from "antd";
import { useQuery } from "@tanstack/react-query";
import { getCompany } from "../api";

const useOfferProfile = (companyId: string) => {
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
          description:
            "Cannot retrieve the company data from the server ... please try again!",
          duration: 10,
        });
      },
    }
  );

  return { companyData, isLoading };
};

export default useOfferProfile;
