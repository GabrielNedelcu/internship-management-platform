import { useState } from "react";
import download from "downloadjs";
import { notification } from "antd";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "@tanstack/react-query";

import { IInternshipData } from "common/types";

import {
  downloadInternshipDocument,
  downloadTemplate,
  getInternship,
  updateInternshipDocs,
} from "../api";

const useInternshipDocuments = (internshipId: string) => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);

  const { data: internshipData, refetch: refetchInternshipData } =
    useQuery<IInternshipData>(
      ["getInternshipDocuments", internshipId],
      () => {
        return getInternship(internshipId, "documents");
      },
      {
        onSuccess: () => {
          setIsLoading(false);
        },
        onError: () => {
          setIsLoading(false);
          notification.error({
            message: "Ooops ...",
            description: t("FETCHING_INTERNSHIP_ERR"),
            duration: 10,
          });
        },
      }
    );

  const { mutate: mutateUpdateInternshipDocs } = useMutation(
    ["updateInternshipDocs", internshipId],
    (newData: IInternshipData) => {
      setIsLoading(true);
      return updateInternshipDocs(internshipId, newData);
    },
    {
      onSuccess: () => {
        setIsLoading(false);
        refetchInternshipData();
        notification.success({
          message: t("GREAT"),
          description: t("JOURNAL_UPDATED"),
          duration: 10,
        });
      },
      onError: () => {
        setIsLoading(false);
        refetchInternshipData();
        notification.error({
          message: "Ooops ...",
          description: t("JOURNAL_UPDATED_ERR"),
          duration: 10,
        });
      },
    }
  );

  const downloadTemplateCb = async (templateName: string) => {
    const res = await downloadTemplate(templateName);
    download(res, templateName);
  };

  const downloadInternshipDocCb = async (doctype: string) => {
    const res = await downloadInternshipDocument(internshipId, doctype);
    download(res, `${doctype}.pdf`);
  };

  return {
    isLoading,
    internshipData,
    downloadTemplateCb,
    downloadInternshipDocCb,
    mutateUpdateInternshipDocs,
  };
};

export default useInternshipDocuments;
