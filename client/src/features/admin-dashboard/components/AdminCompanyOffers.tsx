import { Typography } from "antd";
import { useState, useEffect } from "react";
import useOffersTable from "../hooks/useOffersTable";
import { Row, Col, Table, Input } from "antd";

const { Search } = Input;

const onSearch = (value: string) => console.log(value);

const dummyTableData = [
  {
    key: "1",
    jobTitle: "A Job Title",
    company: "Company 1",
    departament: "R&D",
    offeredPositions: 5,
    availablePositions: 2,
  },
  {
    key: "2",
    jobTitle: "A Job Title",
    company: "Company 2",
    departament: "R&D",
    offeredPositions: 5,
    availablePositions: 2,
  },
  {
    key: "3",
    jobTitle: "A Job Title",
    company: "Company 3",
    departament: "R&D",
    offeredPositions: 5,
    availablePositions: 2,
  },
  {
    key: "4",
    jobTitle: "A Job Title",
    company: "Company 4",
    departament: "R&D",
    offeredPositions: 5,
    availablePositions: 2,
  },
  {
    key: "5",
    jobTitle: "A Job Title",
    company: "Company 5",
    departament: "R&D",
    offeredPositions: 5,
    availablePositions: 2,
  },
  {
    key: "6",
    jobTitle: "A Job Title",
    company: "Company 6",
    departament: "R&D",
    offeredPositions: 5,
    availablePositions: 2,
  },
  {
    key: "7",
    jobTitle: "A Job Title",
    company: "Company 7",
    departament: "R&D",
    offeredPositions: 5,
    availablePositions: 2,
  },
];

const AdminCompanyOffers = () => {
  const { columns, handleChange } = useOffersTable();
  const [tableData, setTableData] = useState<any[]>();

  // On Component Mount retrieve table data
  useEffect(() => {
    console.log("get data");
    setTableData(dummyTableData);
  }, []);

  return (
    <>
      <Typography.Title level={1}>Company Offers</Typography.Title>
      <Typography.Title level={5} type={"secondary"}>
        View, edit and delete company offers ...
      </Typography.Title>

      <Row gutter={[16, 16]}>
        <Col span="12">
          <Search
            placeholder="Search for offers by job title or company name"
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

export default AdminCompanyOffers;
