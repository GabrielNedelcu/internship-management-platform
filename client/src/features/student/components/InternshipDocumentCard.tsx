import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  notification,
  Space,
  Tag,
  Typography,
  Upload,
  UploadProps,
} from "antd";
import { Card } from "common";
import { IInternshipData, ITagProps } from "common/types";
import { useTranslation } from "react-i18next";

interface IInternshipDocumentCardProps {
  title: string;
  status: ITagProps;
  message?: string;
  messageType?: "danger" | "success";
  docFieldName: string;
  validated: boolean;
  onDownloadTemplateCb: () => void;
  onDownloadFileCb: () => void;
  onUploadFileCb: (values: IInternshipData) => void;
}

const uploadProps: UploadProps = {
  name: "file",
  accept: ".pdf",
  multiple: false,
  maxCount: 1,
  showUploadList: false,
  beforeUpload: (file) => {
    notification.success({
      message: "File uploaded",
      duration: 10,
    });
    return false;
  },
};

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
            {props.validated && (
              <>
                <br />
              </>
            )}
            <Space>
              <Button
                icon={<DownloadOutlined />}
                onClick={props.onDownloadTemplateCb}
              >
                {t("DOWNLOAD_TEMPLATE")}
              </Button>
              {!props.validated ? (
                <Form layout={"horizontal"} onFinish={props.onUploadFileCb}>
                  <br />
                  <Space align="end">
                    <Form.Item name={props.docFieldName}>
                      <Upload {...uploadProps}>
                        <Button>{t("CHOOSE")}</Button>
                      </Upload>
                    </Form.Item>
                    <Form.Item>
                      <Button
                        icon={<UploadOutlined />}
                        type="primary"
                        htmlType="submit"
                      >
                        {t("UPLOAD_FILE")}
                      </Button>
                    </Form.Item>
                  </Space>
                </Form>
              ) : (
                <Button
                  icon={<DownloadOutlined />}
                  type="primary"
                  onClick={() => {
                    props.onDownloadFileCb();
                  }}
                >
                  {t("DOWNLOAD_FILE")}
                </Button>
              )}
            </Space>
            {props.validated && (
              <>
                <br />
                <br />
              </>
            )}

            <Typography.Text
              type={props.messageType ? props.messageType : "secondary"}
              italic
            >
              {props?.message}
            </Typography.Text>
          </>
        }
      />
    </>
  );
};

export default InernshipDocumentCard;
