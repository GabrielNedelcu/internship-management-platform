import { ReactElement } from "react";
import { Collapse } from "antd";
const { Panel } = Collapse;

type TCollapsableProps = {
  panelTitle: string;
  contentElement: ReactElement;
  key: string | number;
  extraButton?: ReactElement;
};

const Collabsable = ({
  panelTitle,
  contentElement,
  extraButton,
  key,
}: TCollapsableProps) => {
  return (
    <Collapse collapsible="icon" defaultActiveKey={["1"]}>
      <Panel header={panelTitle} key={key} extra={extraButton}>
        {contentElement}
      </Panel>
    </Collapse>
  );
};

export default Collabsable;
