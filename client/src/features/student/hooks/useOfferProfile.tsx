import { useState } from "react";
import { notification } from "antd";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getOffer, applyToOffer, getSelfStudent } from "../api";
import { useTranslation } from "react-i18next";
import { IOfferData, IStudentData } from "common/types";

const useOfferProfile = (offerId: string) => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);

  const { data: studentData } = useQuery<IStudentData>(
    ["getSelfStudent"],
    () => {
      setIsLoading(true);
      return getSelfStudent({ fields: "internship" });
    },
    {
      onSuccess: () => {
        setIsLoading(false);
      },
      onError: () => {
        setIsLoading(false);
      },
    }
  );

  const { data: offerData, refetch: refetchOfferData } = useQuery<IOfferData>(
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
      return applyToOffer(offerId, offerData?.companyID || "");
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

  return { studentData, offerData, isLoading, handleApply };
};

export default useOfferProfile;
