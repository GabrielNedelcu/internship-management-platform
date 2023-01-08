import { useState, useEffect } from "react";
import { Typography, Input, Row, Col, Table } from "antd";
import useStudentsTable from "../hooks/useStudentsTable";
const { Search } = Input;

const onSearch = (value: string) => console.log(value);

const dummyTableData = [
  {
    key: "1",
    name: "A Nedelcu P. Gabriel",
    group: "443B",
    major: "ELA",
    email: "gabriel.nedelcu@stud.upb.ro",
    id: "1234123412343452345",
  },
  {
    key: "2",
    name: "C Nedelcu P. Gabriel",
    group: "443B",
    major: "ELA",
    email: "gabriel.nedelcu@stud.upb.ro",
    id: "1234123412343452345",
  },
  {
    key: "3",
    name: "B Nedelcu P. Gabriel",
    group: "443B",
    major: "ELA",
    email: "gabriel.nedelcu@stud.upb.ro",
    id: "1234123412343452345",
  },
  {
    key: "4",
    name: "D Nedelcu P. Gabriel",
    group: "443B",
    major: "ELA",
    email: "gabriel.nedelcu@stud.upb.ro",
    id: "1234123412343452345",
  },
  {
    key: "5",
    name: "E Nedelcu P. Gabriel",
    group: "443B",
    major: "RST",
    email: "gabriel.nedelcu@stud.upb.ro",
    id: "1234123412343452345",
  },
];

const AdminStudentsList = () => {
  const { columns, handleChange } = useStudentsTable();
  const [tableData, setTableData] = useState<any[]>();

  // On Component Mount retrieve table data
  useEffect(() => {
    setTableData(dummyTableData);
  }, []);

  return (
    <>
      <Typography.Title level={1}>Students List</Typography.Title>
      <Typography.Title level={5} type={"secondary"}>
        Add, view, edit or delete students from the internship program ...
      </Typography.Title>

      <Row gutter={[16, 16]}>
        <Col span="12">
          <Search
            placeholder="Search for students by name or email"
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

export default AdminStudentsList;
