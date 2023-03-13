import { notification } from "antd";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getOffers } from "../api";
import { initialFetchOptions } from "common/constants";
import { IServerResponseMultipleFetch } from "common/types";
import { useTranslation } from "react-i18next";

const useOffersList = (companyID?: string) => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);

  const [fetchOptions, setFetchOptions] = useState(initialFetchOptions);

  const { data: offers, refetch: refetchOffers } =
    useQuery<IServerResponseMultipleFetch>(
      ["getAllOffersStudent"],
      () => {
        setIsLoading(true);
        return getOffers(
          fetchOptions.searchValue,
          {
            fields:
              "title,companyName,description,departament,availablePos,remainingAvailablePos,applications",
            pagination: fetchOptions.paginationParams,
            sort: fetchOptions.sortOrder,
          },
          companyID
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

  useEffect(() => {
    refetchOffers();
  }, [fetchOptions]);

  return {
    offers,
    isLoading,
    fetchOptions,
    setFetchOptions,
  };
};

export default useOffersList;
