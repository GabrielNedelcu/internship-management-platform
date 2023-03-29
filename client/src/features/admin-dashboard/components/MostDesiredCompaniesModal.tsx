import { Modal, Typography, Divider, List, Avatar } from "antd";
import { ICompanyApplications } from "common/types";
import { useTranslation } from "react-i18next";

interface IMostDesiredCompaniesModalProps {
  openModal: boolean;
  fullList: ICompanyApplications[];
  closeModalCb: () => void;
}

const MostDesiredCompaniesModal = ({
  ...props
}: IMostDesiredCompaniesModalProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Modal
        open={props.openModal}
        onCancel={props.closeModalCb}
        footer={[]}
        width={800}
      >
        <Typography.Title level={2}>
          {t("MOST_DESIRED_COMPANIES")}
        </Typography.Title>

        <Divider />
        <div
          id="scrollableDiv"
          style={{
            height: 400,
            overflow: "auto",
            padding: "0 16px",
          }}
        >
          <List
            itemLayout="horizontal"
            dataSource={props.fullList}
            renderItem={(company: ICompanyApplications) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={`https://ui-avatars.com/api/?name=${company.companyName}&background=0F1C80&color=FFFFFF&bold=true`}
                    />
                  }
                  title={
                    <a href={`/dashboard/admin/company/${company._id}`}>
                      {company.companyName}
                    </a>
                  }
                  description={`${company.applications} ${t("APPLICATIONS")}`}
                />
              </List.Item>
            )}
          />
        </div>
      </Modal>
    </>
  );
};

export default MostDesiredCompaniesModal;
