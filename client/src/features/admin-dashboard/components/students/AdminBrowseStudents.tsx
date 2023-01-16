import { useState, useEffect } from "react";
import useStudentsTable from "../../hooks/useStudentsTable";
import { Row, Col, Table, Input } from "antd";
//import AdminEditStudentModal from "./AdminEditStudentModal";

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

const AdminBrowseStudents = () => {
  const { columns, handleChange } = useStudentsTable();
  const [tableData, setTableData] = useState<any[]>();

  // On Component Mount retrieve table data
  useEffect(() => {
    console.log("get data");
    setTableData(dummyTableData);
  }, []);

  return (
    <>
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
          {/* <AdminEditStudentModal></AdminEditStudentModal> */}
        </Col>
      </Row>
    </>
  );
};

export default AdminBrowseStudents;
