import { Typography } from "antd";
import { useState, useEffect } from "react";
import useCompaniesTable from "../hooks/useCompaniesTable";
import { Row, Col, Table, Input } from "antd";

const { Search } = Input;

const onSearch = (value: string) => console.log(value);

const dummyTableData = [
  {
    key: "1",
    name: "Company 1",
    email: "email_comp_1@gmail.com",
    fieldOfWork: "Electronics",
    offers: 7,
    positions: 25,
    onboardingDate: "2013-04-21T18:25:43-05:00",
  },
  {
    key: "2",
    name: "Company 2",
    email: "email_comp_2@gmail.com",
    fieldOfWork: "Telecom",
    offers: 7,
    positions: 22,
    onboardingDate: "2014-04-21T18:25:43-05:00",
  },
  {
    key: "3",
    name: "Company 3",
    email: "email_comp_3@gmail.com",
    fieldOfWork: "Telecom",
    offers: 8,
    positions: 30,
    onboardingDate: "2015-04-21T18:25:43-05:00",
  },
];

const AdminCompaniesList = () => {
  const { columns, handleChange } = useCompaniesTable();
  const [tableData, setTableData] = useState<any[]>();

  // On Component Mount retrieve table data
  useEffect(() => {
    console.log("get data");
    setTableData(dummyTableData);
  }, []);

  return (
    <>
      <Typography.Title level={1}>Companies List</Typography.Title>
      <Typography.Title level={5} type={"secondary"}>
        View, edit or delete companies from the internship program ...
      </Typography.Title>

      <Row gutter={[16, 16]}>
        <Col span="12">
          <Search
            placeholder="Search for companies by name or account email"
            onSearch={onSearch}
            enterButton
            size="large"
          />
        </Col>
        <Col>
          <Table
            columns={columns}
            dataSource={tableData}
            onChange={handleChange}
            bordered
          />
        </Col>
      </Row>
    </>
  );
};

export default AdminCompaniesList;
