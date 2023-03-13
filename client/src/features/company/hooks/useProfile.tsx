import { useContext, useState } from "react";
import { notification } from "antd";
import { useQuery } from "@tanstack/react-query";
import { ICompanyData } from "common/types";
import { getCompany } from "../api";
import { UserContext } from "app/contexts/UserContext";
import { useTranslation } from "react-i18next";

const useProfile = () => {
  const { t } = useTranslation();

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
          description: t("CANNOT_RETRIEVE_PROFILE_DATA"),
          duration: 10,
        });
      },
    }
  );

  return { companyProfileData, isLoading };
};

export default useProfile;
