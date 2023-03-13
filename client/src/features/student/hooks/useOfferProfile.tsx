import { useState } from "react";
import { notification } from "antd";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getOffer, applyToOffer } from "../api";
import { useTranslation } from "react-i18next";

const useOfferProfile = (offerId: string) => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);

  const { data: offerData, refetch: refetchOfferData } = useQuery(
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

  const { mutate: mutateApply } = useMutation(
    ["applyToOffer", offerId],
    () => {
      setIsLoading(true);
      return applyToOffer(offerId, offerData.companyID);
    },
    {
      onSuccess: () => {
        setIsLoading(false);
        refetchOfferData();
        notification.success({
          message: t("APPLIED_SUCCESSFULLY"),
          description: t("APPLIED_SUCCESSFULLY_MSG"),
          duration: 10,
        });
      },
      onError: () => {
        setIsLoading(false);
        notification.error({
          message: "Ooops ...",
          description: t("ERROR_OCCURED"),
          duration: 10,
        });
      },
    }
  );

  const handleApply = () => {
    mutateApply();
  };

  const handleRemoveApplication = () => {};

  return { offerData, isLoading, handleApply, handleRemoveApplication };
};

export default useOfferProfile;
