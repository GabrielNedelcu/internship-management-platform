import { Row, Col, Input, Button, Select } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface ISortComboData {
  value: string;
  label: string;
}

interface IFilterSortDataProps {
  searchPrompt: string;
  handleSearch: (value: string) => void;
  handleClearSearch: () => void;
  sortOptions?: ISortComboData[];
  handleSortChange?: (value: string) => void;
}

const FilterSortData = ({ ...props }: IFilterSortDataProps) => {
  const { t } = useTranslation();

  const [filterValue, setFilterValue] = useState<string>("");

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span="12">
          <Input.Search
            placeholder={props.searchPrompt}
            onSearch={props.handleSearch}
            enterButton
            size="large"
            value={filterValue}
            onChange={(e) => {
              setFilterValue(e.target.value);
            }}
          />
        </Col>

        <Col span="12">
          <Button
            size="large"
            type="primary"
            onClick={() => {
              props.handleClearSearch();
              setFilterValue("");
            }}
          >
            {t("CLEAR_SEARCH")}
          </Button>
          {props.handleSortChange && props.sortOptions && (
            <Select
              defaultValue=""
              size="large"
              style={{ width: 220, float: "right" }}
              onChange={props.handleSortChange}
              options={props.sortOptions}
            />
          )}
        </Col>
      </Row>
    </>
  );
};

export default FilterSortData;
