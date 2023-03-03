import { Row, Col, Pagination } from "antd";

interface IPaginationCompProps {
  total: number;
  handleChange: (page: number, pageSize: number) => void;
}

const PaginationComp = ({ ...props }: IPaginationCompProps) => {
  return (
    <>
      <br />
      <Row>
        <Col span={12} offset={6}>
          <Pagination
            total={props.total}
            showTotal={(total, range) =>
              `${range[0]}-${range[1]} of ${total} items`
            }
            defaultPageSize={20}
            defaultCurrent={1}
            onChange={props.handleChange}
            style={{ display: "flex", justifyContent: "center" }}
          />
        </Col>
      </Row>
    </>
  );
};

export default PaginationComp;
