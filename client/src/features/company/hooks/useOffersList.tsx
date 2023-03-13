import { notification } from "antd";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getOffers } from "../api";
import { initialFetchOptions } from "common/constants";
import { IServerResponseMultipleFetch } from "common/types";
import { UserContext } from "app/contexts/UserContext";
import { useTranslation } from "react-i18next";

const useOffersList = () => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const { userID } = useContext(UserContext);

  const [fetchOptions, setFetchOptions] = useState(initialFetchOptions);

  const { data: offers, refetch: refetchOffers } =
    useQuery<IServerResponseMultipleFetch>(
      ["getAllOffersCompany"],
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
