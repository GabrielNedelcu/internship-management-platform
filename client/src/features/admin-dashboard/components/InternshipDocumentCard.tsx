import { useTranslation } from "react-i18next";
import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Space, Tag } from "antd";

import { Card } from "common";
import { IDocumentData, ITagProps } from "common/types";

interface IInternshipDocumentCardProps {
  title: string;
  status: ITagProps;
  message?: string;
  messageType?: "danger" | "success";
  docFieldName: string;
  validated: boolean;
  onDownloadFileCb: () => void;
  onFinishCb: (values: any) => void;
}

const InernshipDocumentCard = ({ ...props }: IInternshipDocumentCardProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Card
        title={props.title}
        description={
          <Tag color={props.status.color}>{t(props.status.message)}</Tag>
        }
        content={
          <>
            {props.status.message !== "NOT_UPLOADED" ? (
              <>
                {" "}
                {props.validated && (
                  <>
                    <br />
                  </>
                )}
                <br />
                <Button
                  icon={<DownloadOutlined />}
                  type="primary"
                  onClick={() => {
                    props.onDownloadFileCb();
                  }}
                >
                  {t("DOWNLOAD_FILE")}
                </Button>
                {!props.validated ? (
                  <Form
                    layout={"horizontal"}
                    onFinish={(values) => {
                      props.onFinishCb(values);
                    }}
                  >
                    <br />
                    <Space.Compact block>
                      <Form.Item name={`${props.docFieldName}.validated`}>
                        <Select
                          style={{ width: 150 }}
                          options={[
                            { value: true, label: t("VALIDATE") },
                            { value: false, label: t("DECLINE") },
                          ]}
                        />
                      </Form.Item>
                      <Form.Item
                        name={`${props.docFieldName}.validationMessage`}
                      >
                        <Input
                          style={{ width: 300 }}
                          placeholder={t("WRITE_MESSAGE").toString()}
                        />
                      </Form.Item>
                    </Space.Compact>
                    <Form.Item>
                      <Button
                        icon={<UploadOutlined />}
                        type="primary"
                        htmlType="submit"
                        block
                      >
                        {t("SAVE_CHANGES")}
                      </Button>
                    </Form.Item>
                  </Form>
                ) : (
                  ""
                )}
              </>
            ) : (
              ""
            )}
          </>
        }
      />
    </>
  );
};

export default InernshipDocumentCard;
