import { useState } from "react";
import { notification } from "antd";
import { useQuery } from "@tanstack/react-query";
import { getOffer } from "../api";
import { useTranslation } from "react-i18next";

const useOfferProfile = (offerId: string) => {
  const { t } = useTranslation();

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
          description: t("CANNOT_RETRIEVE_OFFER_DATA"),
          duration: 10,
        });
      },
    }
  );

  return { offerData, isLoading };
};

export default useOfferProfile;
