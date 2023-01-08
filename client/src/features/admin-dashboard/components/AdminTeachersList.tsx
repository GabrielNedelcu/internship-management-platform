import { useState, useEffect } from "react";
import { Typography, Input, Row, Col, Table } from "antd";
import useTeachersTable from "../hooks/useTeachersTable";
const { Search } = Input;

const onSearch = (value: string) => console.log(value);

const dummyTableData = [
  {
    key: "1",
    name: "A Nedelcu P. Gabriel",
    email: "gabriel.nedelcu@stud.upb.ro",
    jobTitle: "Teacher",
    departament: "ELA",
    phone: "0757379352",
    studentsNo: 5,
    availableStudentsNo: 3,
  },
  {
    key: "2",
    name: "C Nedelcu P. Gabriel",
    email: "gabriel.nedelcu@stud.upb.ro",
    jobTitle: "Teacher",
    departament: "ELA",
    phone: "0757379352",
    studentsNo: 5,
    availableStudentsNo: 3,
  },
  {
    key: "3",
    name: "B Nedelcu P. Gabriel",
    email: "gabriel.nedelcu@stud.upb.ro",
    jobTitle: "Teacher",
    departament: "ELA",
    phone: "0757379352",
    studentsNo: 5,
    availableStudentsNo: 3,
  },
  {
    key: "4",
    name: "D Nedelcu P. Gabriel",
    email: "gabriel.nedelcu@stud.upb.ro",
    jobTitle: "Teacher",
    departament: "ELA",
    phone: "0757379352",
    studentsNo: 5,
    availableStudentsNo: 3,
  },
  {
    key: "5",
    name: "E Nedelcu P. Gabriel",
    email: "gabriel.nedelcu@stud.upb.ro",
    jobTitle: "Teacher",
    departament: "ELA",
    phone: "0757379352",
    studentsNo: 5,
    availableStudentsNo: 3,
  },
];

const AdminTeachersList = () => {
  const { columns, handleChange } = useTeachersTable();
  const [tableData, setTableData] = useState<any[]>();

  // On Component Mount retrieve table data
  useEffect(() => {
    setTableData(dummyTableData);
  }, []);

  return (
    <>
      <Typography.Title level={1}>Teachers List</Typography.Title>
      <Typography.Title level={5} type={"secondary"}>
        Add, view, edit or delete teachers from the internship program ...
      </Typography.Title>

      <Row gutter={[16, 16]}>
        <Col span="12">
          <Search
            placeholder="Search for teachers by email or name"
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

export default AdminTeachersList;
