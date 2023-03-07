import { notification } from "antd";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCompanies } from "../api";
import { initialFetchOptions } from "common/constants";
import { IServerResponseMultipleFetch } from "common/types";

const useCompaniesList = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [fetchOptions, setFetchOptions] = useState(initialFetchOptions);

  const { data: companies, refetch: refetchCompanies } =
    useQuery<IServerResponseMultipleFetch>(
      ["getAllCompaniesStudent"],
      () => {
        setIsLoading(true);
        return getCompanies(fetchOptions.searchValue, {
          fields: "name,description,fieldOfWork,numOffers,numPositions",
          pagination: fetchOptions.paginationParams,
          sort: fetchOptions.sortOrder,
        });
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
              "Cannot retrieve the companies from the server ... please try again!",
            duration: 10,
          });
        },
      }
    );

  useEffect(() => {
    refetchCompanies();
  }, [fetchOptions]);

  return {
    companies,
    isLoading,
    fetchOptions,
    setFetchOptions,
  };
};

export default useCompaniesList;
