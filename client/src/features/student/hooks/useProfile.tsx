import { useState } from "react";
import { notification } from "antd";
import { useQuery } from "@tanstack/react-query";
import { getSelfStudent } from "../api";
import { useTranslation } from "react-i18next";

const useProfile = () => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  const { data: studentProfileData } = useQuery(
    ["getSelfStudent"],
    () => {
      setLoading(true);
      return getSelfStudent({});
    },
    {
      onSuccess: () => {
        setLoading(false);
      },
      onError: () => {
        setLoading(false);
        notification.error({
          message: "Ooops ...",
          description: t("CANNOT_RETRIEVE_PROFILE_DATA"),
          duration: 10,
        });
      },
    }
  );

  return { studentProfileData, loading };
};

export default useProfile;
