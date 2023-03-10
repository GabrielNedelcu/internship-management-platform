import { useState } from "react";
import { notification } from "antd";
import { useQuery } from "@tanstack/react-query";
import { getOfferStats } from "../api";
import { IOfferStats } from "common/types";

const useOfferStats = (offerId: string) => {
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
          description:
            "Cannot retrieve the offer stats from the server ... please try again!",
          duration: 10,
        });
      },
    }
  );

  return { offerStats, isLoading };
};

export default useOfferStats;
