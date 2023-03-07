import { Col, Descriptions, Row, Typography } from "antd";
import { Card, LoadingPage } from "common";
import useProfile from "../hooks/useProfile";

const Profile = () => {
  const { companyProfileData, isLoading } = useProfile();
  if (!companyProfileData || isLoading)
    return <LoadingPage message="Fetching profile data ..." />;

  return (
    <>
      <Typography.Title level={1}>Your profile</Typography.Title>
      <Typography.Title level={5} type={"secondary"}>
        Review your company profile ...
      </Typography.Title>

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card
            title="Contact Information"
            content={
              <>
                <br />
                <Descriptions layout="vertical">
                  <Descriptions.Item label="Email">
                    {companyProfileData.email}
                  </Descriptions.Item>
                  <Descriptions.Item label="Phone Number">
                    +40{companyProfileData.contactNumber}
                  </Descriptions.Item>
                  <Descriptions.Item label="Address">
                    {companyProfileData.address}
                  </Descriptions.Item>
                </Descriptions>
              </>
            }
          />
        </Col>
        <Col span={12}>
          <Card
            title="Legal Representative"
            content={
              <>
                <br />
                <Descriptions layout="horizontal">
                  <Descriptions.Item label="Name" span={3}>
                    {companyProfileData.legalRep?.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Email" span={3}>
                    {companyProfileData.legalRep?.email}
                  </Descriptions.Item>
                  <Descriptions.Item label="Phone Number" span={3}>
                    +40{companyProfileData.legalRep?.phoneNumber}
                  </Descriptions.Item>
                  <Descriptions.Item label="Job Title" span={3}>
                    {companyProfileData.legalRep?.jobTitle}
                  </Descriptions.Item>
                </Descriptions>
              </>
            }
          />
        </Col>
        <Col span={12}>
          <Card
            title="Internship Handler"
            content={
              <>
                <br />
                <Descriptions layout="horizontal">
                  <Descriptions.Item label="Name" span={3}>
                    {companyProfileData.handler?.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Email" span={3}>
                    {companyProfileData.handler?.email}
                  </Descriptions.Item>
                  <Descriptions.Item label="Phone Number" span={3}>
                    +40{companyProfileData.handler?.phoneNumber}
                  </Descriptions.Item>
                  <Descriptions.Item label="Job Title" span={3}>
                    {companyProfileData.handler?.jobTitle}
                  </Descriptions.Item>
                </Descriptions>
              </>
            }
          />
        </Col>
        <Col span={24}>
          <Card
            title="Internship Options"
            content={
              <>
                <br />
                <Descriptions layout="horizontal">
                  <Descriptions.Item label="Workplace Address" span={3}>
                    {companyProfileData.internshipMainAddress}
                  </Descriptions.Item>
                  <Descriptions.Item label="Other Workplace Addresses" span={3}>
                    {companyProfileData.internshipOtherAddresses}
                  </Descriptions.Item>
                  <Descriptions.Item label="Contract Offered" span={1}>
                    {companyProfileData.internshipContract ? "Yes" : "No"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Compensation Offered" span={1}>
                    {companyProfileData.internshipCompensation ? "Yes" : "No"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Offers" span={0.5}>
                    +40{companyProfileData.numOffers}
                  </Descriptions.Item>
                  <Descriptions.Item label="Positions" span={0.5}>
                    {companyProfileData.numPositions}
                  </Descriptions.Item>
                  <Descriptions.Item label="Advantages" span={3}>
                    {companyProfileData.internshipOtherAdvantages || "-"}
                  </Descriptions.Item>
                </Descriptions>
              </>
            }
          />
        </Col>
        <Col span={24}>
          <Card
            title="Company Description"
            content={
              <Typography.Paragraph>
                <br />
                {companyProfileData.description}
              </Typography.Paragraph>
            }
          />
        </Col>
      </Row>
    </>
  );
};

export default Profile;
