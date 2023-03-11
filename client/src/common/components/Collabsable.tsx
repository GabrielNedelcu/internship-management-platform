import React from "react";
import { Collapse } from "antd";

interface ICollapsableProps {
  panelTitle: string;
  contentElement: React.ReactElement;
  key: string | number;
  extraButton?: React.ReactElement;
}

const Collabsable = ({ ...props }: ICollapsableProps) => {
  return (
    <Collapse collapsible="icon" defaultActiveKey={["1"]}>
      <Collapse.Panel
        header={props.panelTitle}
        key={props.key}
        extra={props.extraButton}
      >
        {props.contentElement}
      </Collapse.Panel>
    </Collapse>
  );
};

export default Collabsable;
