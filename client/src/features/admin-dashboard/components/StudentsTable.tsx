import { Row, Col, Table } from "antd";
import { IInternshipData } from "common/types";
import useStudentsTable from "../hooks/useStudentsTable";

interface IStudentsTableProps {
  offerId?: string;
  companyId?: string;
  professorId?: string;
}

const StudentsTable = ({ ...props }: IStudentsTableProps) => {
  const {
    isLoading,
    columns,
    fetchOptions,
    handleTablePropsChange,
    studentsList,
  } = useStudentsTable(props.offerId, props.companyId, props.professorId);
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col>
          <br />
          <Table
            columns={columns}
            dataSource={studentsList?.data.map(
              (internshipInfo: IInternshipData) => internshipInfo.studentData
            )}
            loading={isLoading}
            onChange={handleTablePropsChange}
            pagination={{
              ...fetchOptions.paginationParams,
              total: studentsList?.totalCount,
            }}
            bordered
            rowKey="_id"
          />
        </Col>
      </Row>
    </>
  );
};

export default StudentsTable;
