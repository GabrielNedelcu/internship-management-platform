import { useState } from "react";
import { notification } from "antd";
import { useQuery } from "@tanstack/react-query";
import { getOfferStats } from "../api";
import { IOfferStats } from "common/types";
import { useTranslation } from "react-i18next";

const useOfferStats = (offerId: string) => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);

  const { data: offerStats } = useQuery<IOfferStats>(
    ["getOfferStats", offerId],
    () => {
      setIsLoading(true);
      return getOfferStats(offerId);
    },
    {
      onSuccess: () => {
        setIsLoading(false);
      },
      onError: () => {
        setIsLoading(false);
        notification.error({
          message: "Ooops ...",
          description: t("CANNOT_RETRIEVE_OFFERS_STATS"),
          duration: 10,
        });
      },
    }
  );

  return { offerStats, isLoading };
};

export default useOfferStats;
