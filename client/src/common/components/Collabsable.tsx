import { ReactElement } from "react";
import { Collapse } from "antd";
const { Panel } = Collapse;

type TCollapsableProps = {
  panelTitle: string;
  contentElement: ReactElement;
  extraButton?: ReactElement;
};

const Collabsable = ({
  panelTitle,
  contentElement,
  extraButton,
}: TCollapsableProps) => {
  return (
    <Collapse collapsible="icon" defaultActiveKey={["1"]}>
      <Panel header={panelTitle} key="1" extra={extraButton}>
        {contentElement}
      </Panel>
    </Collapse>
  );
};

export default Collabsable;
