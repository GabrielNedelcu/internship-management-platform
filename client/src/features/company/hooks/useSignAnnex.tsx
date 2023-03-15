import download from "downloadjs";
import { notification } from "antd";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { ICompanyData } from "common/types";
import { UserContext } from "app/contexts/UserContext";
import { getAnnex1Template, uploadCompanyAnnex } from "../api";
import { useTranslation } from "react-i18next";

const useSignAnnex = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const { userID } = useContext(UserContext);

  const { mutate: mutateUpdateCompany } = useMutation(
    ["updateCompany", userID],
    (data: ICompanyData) => {
      setIsLoading(true);
      return uploadCompanyAnnex(userID, data);
    },
    {
      onSuccess: () => {
        setIsLoading(false);
        notification.success({
          message: t("GREAT"),
          description: t("CONTRACT_UPLOADED"),
          duration: 10,
        });
        return navigate(`/company/overview`);
      },
      onError: () => {
        setIsLoading(false);
        notification.error({
          message: "Ooops ...",
          description: t("CONTRACT_UPLOAD_ERR"),
          duration: 10,
        });
      },
    }
  );

  const handleDownloadAnnex = async () => {
    const res = await getAnnex1Template();
    download(res, "annex_1.docx");
  };

  return { mutateUpdateCompany, handleDownloadAnnex, isLoading };
};

export default useSignAnnex;
