import { notification } from "antd";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getOffers } from "../api";
import { IPagination } from "../../../common/types";

const useOffersList = (companyID?: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<IPagination>({
    page: 1,
    pageSize: 20,
  });
  const [sort, setSort] = useState<string>("");
  const [filter, setFilter] = useState<string>("");

  const { data, refetch } = useQuery(
    ["getAllOffersStudent"],
    () => {
      setLoading(true);
      return getOffers(
        filter,
        {
          fields:
            "title,companyName,description,departament,availablePos,remainingAvailablePos,applications",
          pagination,
          sort,
        },
        companyID
      );
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
            "Cannot retrieve the offers from the server ... please try again!",
          duration: 10,
        });
      },
    }
  );

  useEffect(() => {
    refetch();
  }, [pagination, sort, filter]);

  return { data, loading, pagination, setPagination, setSort, setFilter };
};

export default useOffersList;
