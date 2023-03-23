import { useTranslation } from "react-i18next";
import { Col, Row, Spin } from "antd";

import { InternshipDocumentCard } from ".";
import useInternshipDocuments from "../hooks/useInternshipDocuments";
import { INTERNSHIP_DOCS, TEMPLATES } from "common/constants";
import { LoadingPage } from "common";
import { getDocumentStatus } from "common/utils";

interface IInternshipJournalProps {
  internshipId: string;
}

const InternshipDocuments = ({ internshipId }: IInternshipJournalProps) => {
  const { t } = useTranslation();

  const {
    isLoading,
    internshipData,
    downloadTemplateCb,
    downloadInternshipDocCb,
    mutateUpdateInternshipDocs,
  } = useInternshipDocuments(internshipId);

  if (!internshipData)
    return <LoadingPage message={t("FETCHING_INTERNSHIP")} />;

  return (
    <>
      <Spin spinning={isLoading}>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <InternshipDocumentCard
              validated={
                internshipData.documents?.tripartit?.validated || false
              }
              title={t("TRIPARTIT_CONVENTION")}
              status={getDocumentStatus(internshipData.documents?.tripartit)}
              docFieldName="documents.tripartit.filename"
              onDownloadTemplateCb={() => {
                downloadTemplateCb(TEMPLATES.TRIPARTIT);
              }}
              onUploadFileCb={mutateUpdateInternshipDocs}
              onDownloadFileCb={() =>
                downloadInternshipDocCb(INTERNSHIP_DOCS.TRIPARTIT)
              }
              message={
                internshipData.documents?.tripartit?.validated
                  ? t("DOCUMENT_VALIDATED").toString()
                  : internshipData.documents?.tripartit?.validationMessage
              }
              messageType={
                internshipData.documents?.tripartit?.validated
                  ? "success"
                  : "danger"
              }
            />
          </Col>

          <Col span={8}>
            <InternshipDocumentCard
              validated={internshipData.documents?.annex2?.validated || false}
              title={`${t("ANNEX")} 2`}
              status={getDocumentStatus(internshipData.documents?.annex2)}
              docFieldName="documents.annex2.filename"
              onDownloadTemplateCb={() => {
                downloadTemplateCb(TEMPLATES.ANNEX2);
              }}
              onUploadFileCb={mutateUpdateInternshipDocs}
              onDownloadFileCb={() =>
                downloadInternshipDocCb(INTERNSHIP_DOCS.ANNEX2)
              }
              message={
                internshipData.documents?.annex2?.validated
                  ? t("DOCUMENT_VALIDATED").toString()
                  : internshipData.documents?.annex2?.validationMessage
              }
              messageType={
                internshipData.documents?.annex2?.validated
                  ? "success"
                  : "danger"
              }
            />
          </Col>

          <Col span={8}>
            <InternshipDocumentCard
              validated={internshipData.documents?.annex3?.validated || false}
              title={`${t("ANNEX")} 3`}
              status={getDocumentStatus(internshipData.documents?.annex3)}
              docFieldName="documents.annex3.filename"
              onDownloadTemplateCb={() => {
                downloadTemplateCb(TEMPLATES.ANNEX3);
              }}
              onUploadFileCb={mutateUpdateInternshipDocs}
              onDownloadFileCb={() =>
                downloadInternshipDocCb(INTERNSHIP_DOCS.ANNEX3)
              }
              message={
                internshipData.documents?.annex3?.validated
                  ? t("DOCUMENT_VALIDATED").toString()
                  : internshipData.documents?.annex3?.validationMessage
              }
              messageType={
                internshipData.documents?.annex3?.validated
                  ? "success"
                  : "danger"
              }
            />
          </Col>

          <Col span={8}>
            <InternshipDocumentCard
              validated={internshipData.documents?.annex7?.validated || false}
              title={`${t("ANNEX")} 7`}
              status={getDocumentStatus(internshipData.documents?.annex7)}
              docFieldName="documents.annex7.filename"
              onDownloadTemplateCb={() => {
                downloadTemplateCb(TEMPLATES.ANNEX7);
              }}
              onUploadFileCb={mutateUpdateInternshipDocs}
              onDownloadFileCb={() =>
                downloadInternshipDocCb(INTERNSHIP_DOCS.ANNEX7)
              }
              message={
                internshipData.documents?.annex7?.validated
                  ? t("DOCUMENT_VALIDATED").toString()
                  : internshipData.documents?.annex7?.validationMessage
              }
              messageType={
                internshipData.documents?.annex7?.validated
                  ? "success"
                  : "danger"
              }
            />
          </Col>
        </Row>
      </Spin>
    </>
  );
};

export default InternshipDocuments;
