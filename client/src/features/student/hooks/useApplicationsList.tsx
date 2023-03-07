import { notification } from "antd";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { IPagination } from "common/types";
import { getSelfApplications } from "../api";

const useApplicationsList = () => {
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [paginationParams, setPaginationParams] = useState<IPagination>({
    page: 1,
    pageSize: 20,
  });
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");

  const { data: applications, refetch } = useQuery(
    ["getSelfApplications"],
    () => {
      setIsPageLoading(true);
      return getSelfApplications(searchValue, {
        pagination: paginationParams,
        sort: sortOrder,
      });
    },
    {
      onSuccess: () => {
        setIsPageLoading(false);
      },
      onError: () => {
        setIsPageLoading(false);
        notification.error({
          message: "Ooops ...",
          description:
            "Cannot retrieve your applications from the server ... please try again!",
          duration: 10,
        });
      },
    }
  );

  useEffect(() => {
    refetch();
  }, [paginationParams, sortOrder, searchValue]);

  return {
    applications,
    isPageLoading,
    paginationParams,
    setPaginationParams,
    setSortOrder,
    setSearchValue,
  };
};

export default useApplicationsList;
