import { useState } from "react";
import { notification } from "antd";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getOffer, applyToOffer } from "../api";

const useOfferProfile = (offerId: string) => {
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
          description:
            "Cannot retrieve the offer data from the server ... please try again!",
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
          message: "Applied successfully",
          description: `Great! You have just applied to this offer. Keep an eye on "My Applications" page to see the status of your application`,
          duration: 10,
        });
      },
      onError: () => {
        setIsLoading(false);
        notification.error({
          message: "Ooops ...",
          description: "An unexpected error occured! Please try again later...",
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
