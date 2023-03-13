import { Row, Col, Pagination } from "antd";
import { useTranslation } from "react-i18next";

interface IPaginationCompProps {
  total: number;
  handleChange: (page: number, pageSize: number) => void;
}

const PaginationComp = ({ ...props }: IPaginationCompProps) => {
  const { t } = useTranslation();

  return (
    <>
      <br />
      <Row>
        <Col span={12} offset={6}>
          <Pagination
            total={props.total}
            showTotal={(total, range) =>
              `${range[0]}-${range[1]} ${t("OF")} ${total} ${t("ITEMS")}`
            }
            defaultPageSize={21}
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
