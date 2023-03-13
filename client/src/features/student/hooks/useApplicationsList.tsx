import { notification } from "antd";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSelfApplications } from "../api";
import { initialFetchOptions } from "common/constants";
import { IServerResponseMultipleFetch } from "common/types";
import { useTranslation } from "react-i18next";

const useApplicationsList = () => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);

  const [fetchOptions, setFetchOptions] = useState(initialFetchOptions);

  const { data: applications, refetch: refetchApplications } =
    useQuery<IServerResponseMultipleFetch>(
      ["getSelfApplications"],
      () => {
        setIsLoading(true);
        return getSelfApplications(fetchOptions.searchValue, {
          pagination: fetchOptions.paginationParams,
          sort: fetchOptions.sortOrder,
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

  useEffect(() => {
    refetchApplications();
  }, [fetchOptions]);

  return {
    applications,
    isLoading,
    fetchOptions,
    setFetchOptions,
  };
};

export default useApplicationsList;
