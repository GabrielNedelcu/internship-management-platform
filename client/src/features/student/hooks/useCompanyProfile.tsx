import { useState } from "react";
import { notification } from "antd";
import { useQuery } from "@tanstack/react-query";
import { getCompany } from "../api";

const useOfferProfile = (companyId: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { data } = useQuery(
    ["getCompany", companyId],
    () => {
      setLoading(true);
      return getCompany(companyId, {
        fields:
          "name,description,fieldOfWork,internshipOtherAdvantages,internshipCompensation,internshipContract,numOffers,numPositions",
      });
    },
    {
      onSuccess: () => {
        setLoading(false);
      },
      onError: () => {
        setLoading(false);
        notification.error({
          message: "Ooops ...",
          description:
            "Cannot retrieve the company data from the server ... please try again!",
          duration: 10,
        });
      },
    }
  );

  return { data, loading };
};

export default useOfferProfile;
