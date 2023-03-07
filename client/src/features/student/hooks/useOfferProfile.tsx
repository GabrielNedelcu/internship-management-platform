import { useState } from "react";
import { notification } from "antd";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getOffer, applyToOffer } from "../api";

const useOfferProfile = (offerId: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { data, refetch: refetchOfferData } = useQuery(
    ["getOffer", offerId],
    () => {
      setLoading(true);
      return getOffer(offerId, {});
    },
    {
      onSuccess: () => {
        setLoading(false);
      },
      onError: () => {
        setLoading(false);
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
      setLoading(true);
      return applyToOffer(offerId, data.companyID);
    },
    {
      onSuccess: (res) => {
        setLoading(false);
        refetchOfferData();
        notification.success({
          message: "Applied successfully",
          description: `Great! You have just applied to this offer. Keep an eye on "My Applications" page to see the status of your application`,
          duration: 10,
        });
      },
      onError: () => {
        setLoading(false);
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

  return { data, loading, handleApply, handleRemoveApplication };
};

export default useOfferProfile;
