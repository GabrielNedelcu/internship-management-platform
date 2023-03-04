import { useState } from "react";
import { notification } from "antd";
import { useQuery } from "@tanstack/react-query";
import { getOffer } from "../api";

const useOfferProfile = (offerId: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { data } = useQuery(
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

  return { data, loading };
};

export default useOfferProfile;
