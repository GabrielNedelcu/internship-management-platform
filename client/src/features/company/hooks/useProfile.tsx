import { useContext, useState } from "react";
import { notification } from "antd";
import { useQuery } from "@tanstack/react-query";
import { ICompanyData } from "common/types";
import { getCompany } from "../api";
import { UserContext } from "app/contexts/UserContext";

const useProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { userID } = useContext(UserContext);

  const { data: companyProfileData } = useQuery<ICompanyData>(
    ["getSelfStudent"],
    () => {
      setIsLoading(true);
      return getCompany(userID, {});
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
            "Cannot retrieve profile data from the server ... please try again!",
          duration: 10,
        });
      },
    }
  );

  return { companyProfileData, isLoading };
};

export default useProfile;
