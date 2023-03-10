import { useState } from "react";
import { notification } from "antd";
import { useQuery } from "@tanstack/react-query";
import { getOffer } from "../api";

const useOfferProfile = (offerId: string) => {
  const [isLoading, setIsLoading] = useState(false);

  const { data: offerData } = useQuery(
    ["getOffer", offerId],
    () => {
      setIsLoading(true);
      return getOffer(offerId, {});
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
            "Cannot retrieve the offer data from the server ... please try again!",
          duration: 10,
        });
      },
    }
  );

  return { offerData, isLoading };
};

export default useOfferProfile;
