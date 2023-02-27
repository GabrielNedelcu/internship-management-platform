import {
  Spin,
  Typography,
  notification,
  Row,
  Col,
  Button,
  Space,
  Tooltip,
} from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  ContainerOutlined,
  UserOutlined,
  ControlOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

import { TabNavigation } from "common";
import type { TTab } from "common";

import {
  ConpanyGeneralInfo,
  CompanyEmployeesInfo,
  CompanyInternshipInfo,
  CompanyOffersInfo,
} from "../components";
import { getCompany, acceptCompany } from "../api/companiesAPI";

const AdminCompanyProfile = () => {
  const params = useParams();
  const companyID = params.companyId || "0";

  const queryClient = useQueryClient();

  const [loading, setLoading] = useState<boolean>(false);

  const { data } = useQuery(
    ["getCompany", companyID],
    () => {
      setLoading(true);
      return getCompany(companyID);
    },
    {
      onSuccess: (data) => {
        setLoading(false);
      },
      onError: () => {
        setLoading(false);
        notification.error({
          message: "Ooops ...",
          description:
            "Cannot retrieve the company's data from the server ... please try again!",
          duration: 10,
        });
      },
    }
  );

  const { mutate: mutateAcceptCompany } = useMutation(
    ["acceptCompany", companyID],
    (companyId: string) => {
      setLoading(true);
      return acceptCompany(companyId);
    },
    {
      onSuccess: () => {
        // Invalidate query in order to fetch all the companies excepting the one that has been
        // accepted on the platform
        queryClient.invalidateQueries(["getCompany", companyID]);

        notification.success({
          message: "Great!",
          description: "The company has just been accepted on the platform!",
          duration: 10,
        });
      },
      onError: () => {
        setLoading(false);
        notification.error({
          message: "Something went wrong ...",
          description:
            "An error occured while accepting the company on the platform! Please try again later ...",
          duration: 10,
        });
      },
    }
  );

  if (!data)
    return (
      <>
        <Spin spinning={true} size="large" tip={"Fetching company data ..."} />
      </>
    );

  const tabs: TTab[] = [
    {
      label: (
        <span>
          <ContainerOutlined />
          General Information
        </span>
      ),
      key: "1",
      children: (
        <ConpanyGeneralInfo
          address={data.address ?? "asdasdasd"}
          fieldOfWork={data.fieldOfWork}
          contactNumber={data.contactNumber}
          description={data.description}
        />
      ),
    },
    {
      label: (
        <span>
          <UserOutlined />
          Employees
        </span>
      ),
      key: "2",
      children: (
        <CompanyEmployeesInfo legalRep={data.legalRep} handler={data.handler} />
      ),
    },
    {
      label: (
        <span>
          <ControlOutlined />
          Internship Options
        </span>
      ),
      key: "3",
      children: (
        <CompanyInternshipInfo
          internshipMainAddress={data.internshipMainAddress}
          internshipOtherAddresses={data.internshipOtherAddresses}
          internshipOtherAdvantages={data.internshipOtherAdvantages}
          internshipCompensation={data.internshipCompensation}
          internshipContract={data.internshipContract}
        />
      ),
    },
    {
      label: (
        <span>
          <UnorderedListOutlined />
          Offers
        </span>
      ),
      key: "4",
      children: <CompanyOffersInfo companyId={data._id} />,
    },
  ];

  return (
    <>
      <Spin spinning={loading} size="large" tip={"Fetching company data ..."}>
        <Row gutter={[16, 16]}>
          <Col span={18}>
            <Typography.Title level={1}>{data.name}</Typography.Title>
            <Typography.Title level={5} type={"secondary"}>
              {data.email}
            </Typography.Title>
          </Col>
          {!data.validated && (
            <Col span={6} style={{ display: "flex", justifyContent: "end" }}>
              <Space>
                <Button
                  size="large"
                  onClick={() => {
                    mutateAcceptCompany(companyID);
                  }}
                >
                  Accept Company
                </Button>
                <Button
                  danger
                  size="large"
                  onClick={() => {
                    //TODO
                  }}
                >
                  Reject Company
                </Button>
              </Space>
            </Col>
          )}
        </Row>

        <TabNavigation tabList={tabs} />
      </Spin>
    </>
  );
};

export default AdminCompanyProfile;
