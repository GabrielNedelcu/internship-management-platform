import { useState } from "react";
import { notification } from "antd";
import { useQuery } from "@tanstack/react-query";
import { getSelfStudent } from "../api";

const useProfile = () => {
  const [loading, setLoading] = useState(false);

  const { data: studentProfileData } = useQuery(
    ["getSelfStudent"],
    () => {
      setLoading(true);
      return getSelfStudent({});
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
            "Cannot retrieve profile data from the server ... please try again!",
          duration: 10,
        });
      },
    }
  );

  return { studentProfileData, loading };
};

export default useProfile;
